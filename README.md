# Prishi

The public portfolio for **prishi.in**. A fast, responsive static site with no browser JavaScript, accounts, tracking, or runtime services. Festivals is the first approved product.

## Local development

Requires Node.js 22 or later. No dependencies or secrets are required.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Restart the command after source edits. `npm run build` creates the production site in `dist/`.

## Approving a product

Only add a product after the owner explicitly approves displaying it. Edit `src/products.json` with the product’s public copy, HTTPS URL, local image and `approved: true`. The build renders only entries with `approved` strictly equal to `true`; product counts update automatically. Do not commit confidential or unannounced product information to this public repository, even with approval set to false.

## Deploy on Vercel

Import this repository, select **Other** as the framework, and use Node.js 24. `vercel.json` sets the build command (`npm run build`) and output directory (`dist`). No environment variables are needed. Each push to the production branch can deploy automatically through the Git integration.

Add `prishi.in` in the Vercel project’s Domains settings, then use the exact DNS records Vercel provides. Add `www.prishi.in` as a redirect to the apex if desired. Preserve all mail records and existing product subdomains, including `festivals.prishi.in`. The Google Sites DNS entry for the root can be replaced only when the new deployment is verified and ready for cutover.

The generated `dist/` directory is also portable to any static host. This repository is maintained independently of the private parent venture workspace.

## Design and assets

Midnight blue, lime accents, editorial typography and an original festival image. Local Inter font files are distributed under their accompanying SIL Open Font License. The festival image is AI-generated illustrative photography; it does not depict an actual customer event.
