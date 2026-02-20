import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://springfieldspecialproducts.com";

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/collections`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/repairs`, lastModified: new Date() },
    { url: `${baseUrl}/guides/rv-measuring`, lastModified: new Date() },
    ...collectionUrls,
    ...productUrls,
  ];
}
