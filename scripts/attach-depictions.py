"""Attach native and web details to packages advertised in Packages."""
import re
from pathlib import Path

index = Path("Packages")
base = "https://puty0807.github.io/repo/"
slugs = {
    "jp.puteihirose.keyboard": "keyboard",
    "jp.puteihirose.pin": "pin",
    "jp.puteihirose.locknote": "notes",
    "jp.puteihirose.gesture": "gesture",
}
entries = []
for stanza in index.read_text(encoding="utf-8").strip().split("\n\n"):
    package = re.search(r"^Package: ([a-z0-9][a-z0-9+.-]*)$", stanza, re.M)
    if package:
        relative = f"depictions/{package.group(1)}.json"
        if Path(relative).is_file():
            stanza = re.sub(r"(?m)^SileoDepiction:[^\n]*\n?", "", stanza).rstrip("\n")
            stanza += f"\nSileoDepiction: {base}{relative}"
        slug = slugs.get(package.group(1))
        if slug:
            icon = f"icons/{slug}.png"
            if not Path(icon).is_file():
                raise FileNotFoundError(icon)
            stanza = re.sub(r"(?m)^Icon:[^\n]*\n?", "", stanza).rstrip("\n")
            stanza += f"\nIcon: {base}{icon}"
            stanza = re.sub(r"(?m)^Depiction:[^\n]*\n?", "", stanza).rstrip("\n")
            stanza += f"\nDepiction: {base}#{slug}"
    entries.append(stanza)
index.write_text("\n\n".join(entries) + "\n\n", encoding="utf-8")
