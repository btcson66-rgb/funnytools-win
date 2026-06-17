# Version Backups

Every published update should have a version number and a matching backup folder.

## Required steps for future updates

1. Bump the project version in `package.json` and `package-lock.json`.
2. Create a folder named `backup/vX.Y.Z/`.
3. Copy changed files into `backup/vX.Y.Z/files/`, preserving their project-relative paths.
4. Add a `backup/vX.Y.Z/README.md` that explains what changed and how to restore.
5. Run `npm.cmd run build`.
6. Commit and push the update.

## Restore pattern

To restore a version backup, copy the files from that version's `files` folder back to the project root:

```powershell
Copy-Item -Recurse -Force backup\vX.Y.Z\files\* .
```

Then run:

```powershell
npm.cmd run build
```
