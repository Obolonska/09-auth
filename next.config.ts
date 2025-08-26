import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.klev.club",
        port: "",
        pathname: "/**", // або "/**" якщо всі шляхи
      },
      {
        protocol: "https",
        hostname: "cdn.another-site.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/notes/filter/:slug", // маршрут сторінки
        locale: false,
        headers: [
          {
            key: "Cache-Control", // Заголовок
            value: "public, max-age=300, must-revalidate", // кешуємо на 5 хв
          },
        ],
      },
    ];
  },
};

export default nextConfig;
