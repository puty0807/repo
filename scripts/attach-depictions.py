"""Attach Sileo's native depiction URL to each package advertised in Packages."""
import re
from pathlib import Path

index = Path("Packages")
base = "https://puty0807.github.io/repo/"
entries = []
for stanza in index.read_text(encoding="utf-8").strip().split("\n\n"):
    package = re.search(r"^Package: ([a-z0-9][a-z0-9+.-]*)$", stanza, re.M)
    if package:
        relative = f"depictions/{package.group(1)}.json"
        if Path(relative).is_file():
            stanza = re.sub(r"(?m)^SileoDepiction:[^\n]*\n?", "", stanza).rstrip("\n")
            stanza += f"\nSileoDepiction: {base}{relative}"
    entries.append(stanza)
index.write_text("\n\n".join(entries) + "\n\n", encoding="utf-8")
