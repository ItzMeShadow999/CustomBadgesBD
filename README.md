<div align="center">

<img src="https://files.catbox.moe/92qh1k.png" alt="BetterDiscord logo" width="200" />

# Custom Badges — BetterDiscord

[![BetterDiscord Plugin](https://img.shields.io/badge/BetterDiscord-Plugin-5865F2?style=for-the-badge&logo=betterdiscord&logoColor=fff&labelColor=2B2D42)](https://betterdiscord.app/)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-4E5D94?style=for-the-badge&labelColor=1E2233&logoColor=fff)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Cloudflare Workers](https://img.shields.io/badge/Backend-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=fff&labelColor=2B2D42)](https://workers.cloudflare.com/)
[![Discord Server](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=fff&labelColor=2B2D42)](https://discord.gg/PUYaka9Hy8)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=323330&labelColor=1E2233)
![Single File](https://img.shields.io/badge/Format-Single%20File%20Plugin-8891B3?style=flat&labelColor=1E2233&color=8891B3)
![Third-Party](https://img.shields.io/badge/Third--Party-Not%20affiliated%20with%20Discord-6C7293?style=flat&labelColor=1E2233&color=6C7293)
![Status](https://img.shields.io/badge/Status-Active-3BA55D?style=flat&labelColor=1E2233&logoColor=fff)
</div>

A BetterDiscord plugin that gives you a custom profile badge  image,
description, hover tooltip, and click popup  visible to anyone else running
the plugin. It comes with its own settings panel covering badge slots,
presets, importable/exportable badge packs, and a full **Style Studio** tab
for theming the badge itself (name color, icon size/shape, hover effects),
plus a dark, black-based settings UI styled to match BetterDiscord, with
its own accent color variables.

- Custom profile badge: image, description, and per-badge styling
- Up to 12 saved badge slots, one active at a time  switch between them from the settings panel
- Built-in presets, plus importable/exportable badge packs (raw GitHub JSON, or paste-a-code sharing)
- **Style Studio**: badge name color, icon size, icon shape (circle / rounded / square), and hover effect (none / scale / glow, with a configurable glow color)
- Dark, black-themed settings UI with CSS custom properties (`--ub-bg`, `--ub-accent`, `--ub-accent-2`, etc.) so the panel itself is easy to re-skin
- Badge data synced through a small Cloudflare Worker + KV backend
- Behavior toggles: tooltip on/off, append a `[BD]` tag, hide your own badge from yourself, restrict visibility to mutual servers

---

<details>
<summary><img src="https://files.catbox.moe/ocr2t1.png" width="30" height="30" align="absmiddle" /> $\Huge{\color{#5865F2}\textsf{Installation (click to expand)}}$</summary>

### 1. Locate your BetterDiscord plugins folder

- **Windows:** `%appdata%\BetterDiscord\plugins`
- **macOS:** `~/Library/Application Support/BetterDiscord/plugins`
- **Linux:** `~/.config/BetterDiscord/plugins`

You can also open it directly from Discord: **User Settings → BetterDiscord → Plugins → Open Plugins Folder**.

### 2. Copy in the plugin file

Drop `CustomBadges.plugin.js` into that folder.

### 3. Enable the plugin

Open Discord → **User Settings → Plugins**, find **CustomBadges**, and toggle it on.

### 4. Reload if needed

`Ctrl/Cmd + R`, or fully restart Discord if the plugin doesn't show up right away.

</details>

---

## Usage

- Open the plugin's **Settings** panel (User Settings → Plugins → CustomBadges → gear icon) to manage everything  badge image/name, slots, presets, packs, behavior, and the Style Studio.
- Your badge is stored server-side, keyed to your Discord user ID, so it follows you across devices as long as the plugin is installed and enabled.
- **My Badges** lets you keep multiple saved looks and switch which one is live without re-entering the image/description each time.
- **Badge Packs** let you import a themed set of badges from a raw GitHub URL, or copy your own badges out as JSON to share.

## Color Theme (Style Studio)

The Style Studio tab controls how *your badge* looks to other people:

| Setting | Controls |
|---|---|
| Badge Name Color | Hex color of your badge's name text |
| Badge Icon Size | Pixel size of the badge icon in the badge row |
| Badge Icon Shape | Circle, rounded square, or square |
| Badge Hover Effect | None, scale-up, or glow (with a separate hex glow color) |

Separately, the **settings panel itself** ships with a BetterDiscord-style
dark theme, built on a small set of CSS variables (`--ub-bg`,
`--ub-bg-card`, `--ub-accent`, `--ub-accent-2`, `--ub-accent-hover`,
`--ub-accent-soft`, `--ub-text`, `--ub-text-secondary`, `--ub-border`)
scoped under `#ub-dashboard-settings`. If you want to reskin the panel to
match a different Discord theme you're running, override those variables
from your theme's CSS rather than editing the plugin file directly  it
keeps your changes intact across plugin updates.

## Backend (Self-Hosting / Contributors)

Badge data is served from a Cloudflare Worker (default:
`custom-badges.shadow-164.workers.dev`). To run your own instance:

1. Deploy your own Worker + KV namespace for badge storage.
2. Open the plugin's settings panel and set **Api Base Url** to your Worker's URL.

### Account Verification

Setting, switching, or deleting a badge requires proving you own the
Discord account you're doing it as:

1. Click **Verify Discord Account** in settings  this opens `{apiBase}/auth/start` in your browser via Discord OAuth (identify scope only).
2. Confirm you're signed in as the right account and follow the prompt there.
3. Copy the code it gives you back and paste it into the **Session Token** field in settings.

That token authorizes every write from then on, sent as a `Bearer` header —
reading badges (yours or anyone else's) never required it and still
doesn't. The token doesn't expire on its own; if a publish/switch/delete
ever fails with a `NOT_VERIFIED` error, just re-verify and paste a fresh
code. The token field is masked (letter-by-letter, animated) once you
click away, so it's not left sitting in plain text in your settings.

If you ever lose track of your token, or think someone else got hold of
it, hit **Revoke Your Token**  this immediately kills that token
server-side, and you'll need to verify again to get a new one.

---

## License

This plugin is distributed under **GPL-3.0-or-later**. You're free to use,
study, modify, and share it, but if you distribute a modified version, you
must also make its source available under the same license. See the full
license text at https://www.gnu.org/licenses/gpl-3.0.html.

This is a third-party plugin and isn't affiliated with, endorsed by, or
supported by Discord Inc. Use of client modifications is against
Discord's Terms of Service  use at your own risk.

## Community & Support

- **Found someone using this plugin to display NSFW, hateful, or otherwise abusive badge content?** Please report it  don't just block and move on.
- **Something broken or not working as expected?**
  1. Check the FAQs channel first  your issue may already be answered there.
  2. If it's not covered, ask in the issues help chat.
  3. To report a bug, abuse, or a badge that violates the rules, use the Reports chat.
- Join the server here: https://discord.gg/PUYaka9Hy8
