import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description: "Page not found.",
  openGraph: {
    title: "Not found",
    description: "Page not found.",
    url: `https://notehub.com/not-found`,
    images: [
      {
        url: "https://webhostingmedia.net/wp-content/uploads/2018/01/http-error-404-not-found.png",
        width: 1200,
        height: 630,
        alt: "Not Found",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
