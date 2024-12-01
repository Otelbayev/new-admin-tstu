import fs from "fs";
import fetch from "node-fetch";
import { Builder } from "xml2js";

const buildXML = async () => {
  try {
    // Fetch data
    const response = await fetch(
      `${import.meta.env.VITE_BASE_}blogcontroller/sitegetallblog?queryNum=10&pageNum=1&favorite=true`
    );
    const data = await response.json();

    // Prepare XML data
    const items = data.map((item) => ({
      title: item.title,
      link: `https://tstu.uz/blog/${item.id}`,
      description: item.description,
      category: item.blog_category_.title,
      author: "TSTU.UZ",
      guid: item.id.toString(),
      pubDate: new Date(item.event_date).toISOString(), // Format date for RSS
    }));

    const rss = {
      rss: {
        $: { version: "2.0" },
        channel: {
          title: "TSTU.UZ",
          link: "https://tstu.uz/feed",
          description: "RSS from TSTU.UZ",
          language: "uz",
          pubDate: new Date().toISOString(),
          item: items,
        },
      },
    };

    // Convert JSON to XML
    const builder = new Builder();
    const xml = builder.buildObject(rss);

    // Write XML to file
    fs.writeFileSync("public/feed.xml", xml, "utf8");

  } catch (error) {
    console.error("Error generating RSS feed:", error);
  }
};

buildXML();
