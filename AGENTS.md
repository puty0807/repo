# Release workflow

The owner wants every tweak release available through package-manager updates,
with https://puty0807.github.io/repo/ updated in the same release.

- Keep the package-manager registration URL https://puteihirose.com/profile/.
  GitHub Pages remains the distribution/update origin.
- When publishing a new .deb, update the web explorer's featured version and
  description, detail templates, Japanese/English translations, native Sileo
  depictions, and README together. Bump changed JS asset query versions.
- Preserve prior .deb files for rollback. Do not fabricate new screenshots;
  label existing images as earlier UI when they do not show the new release.
- Regenerate Packages (including multiple versions), compressed indexes and
  Release checksums. Run `python3 scripts/verify-release.py` before publishing.
- Check the deployed page in both languages, direct detail links, image viewer,
  registration/copy URLs, and the canonical PROFILE Release/Packages/new .deb
  downloads after deployment.
- Record automated builds/tests separately from iPhone testing. Claim an
  on-device installation or package-manager registration only if it was tested
  on an actual iPhone. The owner has authorized publishing the current releases
  and asked that future requested releases include the page update as well.
