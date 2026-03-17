import type { MetadataRoute } from "next";
import {
  blogPosts,
  industries,
  localIntentPages,
  productCategories,
  services,
  siteUrl,
} from "@/lib/site-data";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/products",
    "/industries",
    "/blog",
    "/moi-approval",
    "/projects",
    "/quote",
  ];

  const localeRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const productRoutes = locales.flatMap((locale) =>
    productCategories.map((category) => ({
      url: `${siteUrl}/${locale}/products/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const industryRoutes = locales.flatMap((locale) =>
    industries.map((industry) => ({
      url: `${siteUrl}/${locale}/industries/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  );

  const blogRoutes = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  const localIntentRoutes = locales.flatMap((locale) =>
    localIntentPages.map((slug) => ({
      url: `${siteUrl}/${locale}/solutions/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72,
    })),
  );

  return [
    ...localeRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...industryRoutes,
    ...blogRoutes,
    ...localIntentRoutes,
  ];
}
