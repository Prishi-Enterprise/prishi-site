# Prishi

The public portfolio for **prishi.in**. A fast, responsive static site with no browser JavaScript, accounts, tracking, or runtime services. Festivals is the first approved product.

Public repository: [Prishi-Enterprise/prishi-site](https://github.com/Prishi-Enterprise/prishi-site). This repository is independently maintained under the Prishi organization.

## Local development

Requires Node.js 22 or later. No dependencies or secrets are required.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Restart the command after source edits. `npm run build` creates the production site in `dist/`.

## Approving a product

Only add a product after the owner explicitly approves displaying it. Edit `src/products.json` with the product’s public copy, HTTPS URL, local image and `approved: true`. The build renders only entries with `approved` strictly equal to `true`; product counts update automatically. Do not commit confidential or unannounced product information to this public repository, even with approval set to false.

## Deploy on Vercel

Live: [prishi.in](https://prishi.in), which redirects to [www.prishi.in](https://www.prishi.in). Vercel project: [prishi-site](https://vercel.com/prishi-ai/prishi-site), connected to this repository. Pushes to `main` deploy automatically. The deployment was verified on 22 September 2026.

GoDaddy `www` CNAME points to `788750508dad2be5.vercel-dns-017.com`. The existing apex 301 forwarding to `https://www.prishi.in` remains in place, so `www` is the canonical host in metadata and the sitemap. Mail and Festivals DNS records are unchanged. `prishi.in` is also assigned to the Vercel project for a possible future direct-apex migration; Vercel can show that unused direct mapping as unconfigured while the GoDaddy redirect is active. Do not redirect `www` back to the apex while the existing apex forwarding remains, as that would create a loop.

Import this repository, select **Other** as the framework, and use Node.js 24. `vercel.json` sets the build command (`npm run build`) and output directory (`dist`). No environment variables are needed. Each push to the production branch can deploy automatically through the Git integration.

For a future direct-apex migration, first prepare and verify Vercel’s recommended A record, replace GoDaddy forwarding, and then update canonical metadata and sitemap URLs. Preserve all mail records and existing product subdomains, including `festivals.prishi.in`.

The generated `dist/` directory is also portable to any static host. This repository is maintained independently of the private parent venture workspace.

## Design and assets

Midnight blue, lime accents, editorial typography and an original festival image. Local Inter font files are distributed under their accompanying SIL Open Font License. The festival image is AI-generated illustrative photography; it does not depict an actual customer event.
