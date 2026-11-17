#!/usr/bin/env python3
"""Check a release before publication. Requires Python 3 and Debian's dpkg tools.

Run from any directory: python3 scripts/verify-release.py [repository-directory]
This is a local preflight; browser behavior and iPhone registration need separate checks.
"""

import bz2
import gzip
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlparse


PAGES = "https://puty0807.github.io/repo/"
SOURCE = "https://puteihirose.com/profile/"
MANAGERS = {
    "sileo": "sileo://source/" + SOURCE,
    "zbra": "zbra://sources/add/" + SOURCE,
    "cydia": "cydia://url/https://cydia.saurik.com/api/share#?source=" + SOURCE,
}
WEB_SLUGS = {
    "jp.puteihirose.keyboard": "keyboard",
    "jp.puteihirose.pin": "pin",
    "jp.puteihirose.locknote": "notes",
    "jp.puteihirose.gesture": "gesture",
}


# New previews may have no genuine device images yet. Require an explicit
# matching notice instead of inventing screenshots or relaxing other packages.
SCREENSHOTS_PENDING = {"jp.puteihirose.gesture": "実機スクリーンショットは準備中。掲載画像はありません。"}

def require(condition, message):
    if not condition:
        raise ValueError(message)


def command(*args):
    result = subprocess.run(args, check=True, capture_output=True, text=True)
    return result.stdout


def stanzas(text):
    """Read RFC822-style Debian control paragraphs, preserving continuations."""
    result = []
    for paragraph in re.split(r"\n\s*\n", text.strip()):
        fields = {}
        current = None
        for line in paragraph.splitlines():
            if line.startswith((" ", "\t")):
                require(current is not None, "Control continuation has no field")
                fields[current] += "\n" + line.strip()
            else:
                current, separator, value = line.partition(":")
                require(separator and current not in fields, "Malformed or duplicate control field: " + line)
                fields[current] = value.strip()
        result.append(fields)
    return result


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids = {}
        self.manager_links = []
        self.template = None
        self.template_images = {}
        self.text_target = None
        self.copy_text = ""
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            require(attrs["id"] not in self.ids, "Duplicate HTML id: " + attrs["id"])
            self.ids[attrs["id"]] = (tag, attrs)
        if tag == "a" and "manager-link" in attrs.get("class", "").split():
            self.manager_links.append(attrs.get("href", ""))
        if tag == "template":
            self.template = attrs.get("id")
            self.template_images[self.template] = []
        if tag == "img" and self.template:
            self.template_images[self.template].append(attrs.get("src", ""))
        if attrs.get("id") == "repository-url":
            self.text_target = tag

    def handle_endtag(self, tag):
        if tag == "template":
            self.template = None
        if tag == self.text_target:
            self.text_target = None

    def handle_data(self, data):
        if self.text_target:
            self.copy_text += data


def featured_entries(source):
    # The featured array is intentionally static data. Fail visibly if its format
    # changes, rather than accidentally validating only part of the release page.
    match = re.search(r"\bconst\s+featured\s*=\s*\[(.*?)\]\s*\.map\(", source, re.S)
    require(match, "Cannot find the static featured array in explorer.js")
    entries = []
    for obj in re.findall(r"\{([^{}]*)\}", match[1], re.S):
        values = {}
        for field in ("slug", "id", "version"):
            value = re.search(r"\b" + field + r"\s*:\s*(['\"])([^'\"]+)\1", obj)
            require(value, "Featured package must have literal " + field)
            values[field] = value[2]
        entries.append(values)
    require(entries, "No featured packages found")
    require(len({entry["id"] for entry in entries}) == len(entries), "Duplicate featured package id")
    require(len({entry["slug"] for entry in entries}) == len(entries), "Duplicate featured direct-link slug")
    return entries


def walk_json(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


def local_asset(root, url):
    parsed = urlparse(url)
    if parsed.scheme or parsed.netloc:
        require(url.startswith(PAGES), "Asset must use the GitHub Pages update source: " + url)
        relative = unquote(parsed.path.removeprefix(urlparse(PAGES).path))
    else:
        relative = unquote(parsed.path)
    path = (root / relative).resolve()
    require(path.is_relative_to(root), "Asset escapes repository: " + url)
    require(path.is_file(), "Missing release asset: " + url)
    return path


def validate(root):
    packages_bytes = (root / "Packages").read_bytes()
    packages = stanzas(packages_bytes.decode("utf-8"))
    require(packages and all(p.get("Package") for p in packages), "Packages is empty or malformed")
    require(gzip.decompress((root / "Packages.gz").read_bytes()) == packages_bytes,
            "Packages.gz does not expand to Packages")
    require(bz2.decompress((root / "Packages.bz2").read_bytes()) == packages_bytes,
            "Packages.bz2 does not expand to Packages")
    release = stanzas((root / "Release").read_text(encoding="utf-8"))
    require(len(release) == 1, "Release must contain one paragraph")
    for algorithm in ("SHA256", "SHA512"):
        require(algorithm in release[0], "Release is missing " + algorithm)
        files = set()
        for line in release[0][algorithm].splitlines():
            if not line.strip():
                continue
            digest, size, filename = line.split()
            require(filename in {"Packages", "Packages.gz", "Packages.bz2"}, "Unexpected Release file: " + filename)
            require(filename not in files, "Duplicate Release digest: " + filename)
            files.add(filename)
            data = (root / filename).read_bytes()
            require(len(data) == int(size), "Release size is stale: " + filename)
            require(hashlib.new(algorithm.lower(), data).hexdigest() == digest,
                    "Release " + algorithm + " is stale: " + filename)
        require(files == {"Packages", "Packages.gz", "Packages.bz2"}, "Release digest list is incomplete")

    indexed = set()
    identities = set()
    latest = {}
    for package in packages:
        identity = tuple(package.get(key, "") for key in ("Package", "Version", "Architecture"))
        require(all(identity) and identity not in identities, "Missing or duplicate package identity: " + str(identity))
        identities.add(identity)
        name, version, arch = identity
        command("dpkg", "--validate-version", version)
        expected = "debs/" + "_".join(identity) + ".deb"
        require(package.get("Filename", "").removeprefix("./") == expected,
                "Package filename does not match control identity: " + str(identity))
        archive = local_asset(root, expected)
        indexed.add(archive)
        data = archive.read_bytes()
        require(int(package.get("Size", "-1")) == len(data), "Package size is stale: " + expected)
        for field, algorithm in (("MD5sum", "md5"), ("SHA1", "sha1"), ("SHA256", "sha256")):
            require(package.get(field) == hashlib.new(algorithm, data).hexdigest(),
                    "Package " + field + " is stale: " + expected)
        control = stanzas(command("dpkg-deb", "--field", str(archive)))[0]
        for field in ("Package", "Version", "Architecture", "Depends"):
            require(control.get(field, "") == package.get(field, ""),
                    "Package index disagrees with .deb control " + field + ": " + expected)
        if name not in latest or subprocess.run(
            ["dpkg", "--compare-versions", version, "gt", latest[name]], check=False
        ).returncode == 0:
            latest[name] = version
    require(indexed == {p.resolve() for p in (root / "debs").glob("*.deb")},
            "Every .deb, including retained rollback versions, must appear in Packages")
    require(set(WEB_SLUGS) <= set(latest), "A published P.H.S package is missing from Packages")

    page = Page((root / "index.html").read_text(encoding="utf-8"))
    require(sorted(page.manager_links) == sorted(MANAGERS.values()),
            "The three package-manager buttons must all use the canonical PROFILE URL")
    require(page.copy_text.strip() == SOURCE, "Manual/copy URL differs from the canonical PROFILE URL")
    require(page.ids.get("copy-repository-url", (None,))[0] == "button", "Missing copy-URL button")
    featured = featured_entries((root / "explorer.js").read_text(encoding="utf-8"))
    require({entry["id"] for entry in featured} == set(latest), "Featured package list differs from Packages")
    for entry in featured:
        name, slug, version = (entry[key] for key in ("id", "slug", "version"))
        require(version == latest[name], name + ": featured version " + version + " is stale; latest is " + latest[name])
        require(name not in WEB_SLUGS or slug == WEB_SLUGS[name], name + ": published direct-link slug changed")
        require(page.ids.get(slug + "-detail", (None,))[0] == "template",
                "Direct link #" + slug + " has no matching detail template")
        images = page.template_images.get(slug + "-detail", [])
        require(images or name in SCREENSHOTS_PENDING, "No screenshots for direct link #" + slug)
        for image in images:
            local_asset(root, image)
        depiction_url = PAGES + "depictions/" + name + ".json"
        depiction = json.loads(local_asset(root, depiction_url).read_text(encoding="utf-8"))
        nodes = list(walk_json(depiction))
        versions = [node.get("text", "") for node in nodes
                    if node.get("class") == "DepictionTableTextView" and node.get("title") in {"バージョン", "Version"}]
        require(len(versions) == 1 and re.match(re.escape(version) + r"(?:\s|$)", versions[0]),
                name + ": native depiction version is stale: " + repr(versions))
        screenshot_urls = [image["url"] for node in nodes for image in node.get("screenshots", [])]
        require(screenshot_urls or name in SCREENSHOTS_PENDING, name + ": native depiction has no screenshots")
        if not images or not screenshot_urls:
            notice = SCREENSHOTS_PENDING.get(name)
            require(notice and notice in (root / "index.html").read_text(encoding="utf-8"),
                    name + ": missing web screenshot-pending notice")
            require(any(notice in node.get("markdown", "") for node in nodes),
                    name + ": missing native screenshot-pending notice")
        for image in screenshot_urls:
            local_asset(root, image)
        require({local_asset(root, image) for image in images}
                == {local_asset(root, image) for image in screenshot_urls},
                name + ": native and web depictions show different screenshot sets")
        for package in (p for p in packages if p["Package"] == name):
            require(package.get("SileoDepiction") == depiction_url, name + ": incorrect SileoDepiction URL")
            if name in WEB_SLUGS or "Depiction" in package:
                require(package.get("Depiction") == PAGES + "#" + slug, name + ": incorrect web depiction direct link")
    print("Release preflight passed: " + str(len(packages)) + " archives; "
          + ", ".join(entry["id"] + " " + entry["version"] for entry in featured))


if __name__ == "__main__":
    root = Path(sys.argv[1]).resolve() if len(sys.argv) == 2 else Path(__file__).resolve().parent.parent
    try:
        require(len(sys.argv) <= 2, "Usage: verify-release.py [repository-directory]")
        validate(root)
    except (ValueError, OSError, subprocess.CalledProcessError, EOFError) as error:
        print("Release preflight FAILED: " + str(error), file=sys.stderr)
        sys.exit(1)
