# v5.104.8 pre-release backup

Created by `npm run release` before publishing v5.104.8.

- Pre-release commit: `24a6ca1`
- Backup tag: `backup/pre-v5.104.8`
- Release tag: `v5.104.8`
- Release message: 授權腳本補上帳號讀回與 scope 檢查，避免授權到錯帳號或漏 scope 而不自知
- package-lock version updated: yes

No source archive is stored in git; the backup tag is the rollback snapshot.
To restore the exact pre-release commit, use `git checkout backup/pre-v5.104.8`.
