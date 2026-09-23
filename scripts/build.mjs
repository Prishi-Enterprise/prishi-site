import { readFile, mkdir, rm, cp, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const products = JSON.parse(
  await readFile(path.join(root, "src/products.json"), "utf8"),
).filter((p) => p.approved === true);
if (!products.length)
  throw new Error("At least one owner-approved product is required.");
for (const product of products) {
  const url = new URL(product.url);
  if (url.protocol !== "https:")
    throw new Error("Product URLs must use HTTPS.");
  if (url.hostname !== product.domain)
    throw new Error("Product domain must match its URL.");
}
const cards = products
  .map(
    (
      p,
      index,
    ) => `<article class="product-card" data-product="${escape(p.id)}" aria-labelledby="${escape(p.id)}-title">
  <div class="product-image"><img src="${escape(p.image)}" alt="${escape(p.imageAlt)}" width="1200" height="800" loading="${index === 0 ? "eager" : "lazy"}" /><div class="image-shade"></div><span class="image-label"><span class="live-dot" aria-hidden="true"></span> ${escape(p.status ?? "LIVE PRODUCT")}</span><span class="image-caption">${escape(p.caption ?? p.name)}</span></div>
  <div class="product-content"><p class="product-category">${escape(p.category)}</p><h3 id="${escape(p.id)}-title">${escape(p.name)}</h3><p class="product-headline">${escape(p.headline)}</p><p class="product-description">${escape(p.description)}</p><ul class="tags" aria-label="Product features">${p.tags.map((tag) => `<li>${escape(tag)}</li>`).join("")}</ul><div class="product-action"><small>${escape(p.domain)}</small><a class="product-link" href="${escape(p.url)}">Explore ${escape(p.name)} <span aria-hidden="true">↗</span></a></div></div>
</article>`,
  )
  .join("\n");
const styles = await readFile(path.join(root, "src/styles.css"), "utf8");
const stylesheet = `styles.${createHash("sha256").update(styles).digest("hex").slice(0, 12)}.css`;
const template = await readFile(path.join(root, "src/index.html"), "utf8");
const html = template
  .replace("{{STYLESHEET}}", stylesheet)
  .replace("{{PRODUCTS}}", cards)
  .replace(
    "{{PRODUCT_COUNT}}",
    `${String(products.length).padStart(2, "0")} ${products.length === 1 ? "product" : "products"} live`,
  )
  .replace("{{YEAR}}", String(new Date().getFullYear()));
await rm(path.join(root, "dist"), { recursive: true, force: true });
await mkdir(path.join(root, "dist"), { recursive: true });
await cp(path.join(root, "public"), path.join(root, "dist"), {
  recursive: true,
});
await writeFile(path.join(root, "dist", stylesheet), styles);
await writeFile(path.join(root, "dist/index.html"), html);
console.log(
  `Built Prishi portfolio with ${products.length} approved product(s).`,
);
