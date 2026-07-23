# Deploying 11testcoach.co.uk (GitHub Pages + GoDaddy)

## 1. Create the GitHub repository (once)

On github.com: **New repository** → name it `11testcoach-website` → Public → Create
(don't tick any "initialize" boxes).

Then push this folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/11testcoach-website.git
git push -u origin main
```

## 2. Turn on GitHub Pages

Repo → **Settings → Pages** → Source: "Deploy from a branch" →
Branch: `main`, folder `/ (root)` → Save.

Then in the **Custom domain** box type `11testcoach.co.uk` → Save,
and once DNS has propagated tick **Enforce HTTPS**.

## 3. GoDaddy DNS records

GoDaddy → My Products → 11testcoach.co.uk → **DNS** → add:

| Type  | Name | Value               | TTL     |
|-------|------|---------------------|---------|
| A     | @    | 185.199.108.153     | default |
| A     | @    | 185.199.109.153     | default |
| A     | @    | 185.199.110.153     | default |
| A     | @    | 185.199.111.153     | default |
| CNAME | www  | YOUR_USERNAME.github.io | default |

Delete any existing GoDaddy "Parked"/"Forwarding" A record for `@` first.
Keep all MX/TXT records — they are your hello@ email; don't touch them.

DNS usually propagates in 15–60 minutes. The `CNAME` file in this repo keeps
the custom domain sticky across deploys.

## 4. After the app ships

- Replace the "Coming to the App Store" buttons with the real App Store badge + link.
- App Store Connect: Support URL `https://11testcoach.co.uk/support`,
  Privacy Policy URL `https://11testcoach.co.uk/privacy`.
