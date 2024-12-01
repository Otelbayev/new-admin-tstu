// generate-sitemap.cjs
const fs = require("fs");
const path = require("path");

const base = "http://sayt.tstu.uz/uz";

const urls = [
  `${base}/blog`,
  `${base}/blog/:id`,
  `${base}/announcements`,
  `${base}/education`,
  `${base}/department`,
  `${base}/department/:id`,
  `${base}/page/:id`,
  `${base}/employee/:id`,
  `${base}/faculties`,
  `${base}/faculties/:id`,
  `${base}/kafedra`,
  `${base}/kafedra/:id`,
  `${base}/honory`,
  `${base}/contact`,
  `${base}/faq`,
  `${base}/appeals`,
  `${base}/history`,
  `${base}/rectorat`,
  `${base}/interactive-services`,
  `${base}/centers`,
  `${base}/scientific-center`,
  `${base}/signin`,
  `${base}/`,
  `${base}/404`,
  `${base}/galereya`,
  `${base}/arm`,
  `${base}/student-life`,
  `${base}/structure`,
  `${base}/oav`,
  `${base}/events`,
  `${base}/brm`,
  `${base}/aboutus`,
  `${base}/bdirections`,
  `${base}/mdirections`,
  `${base}/college`,
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<sitemap><loc>${url}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapContent);

