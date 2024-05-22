import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { locales } from "@/config";
import type { Locale } from "@/config";

export const Footer = async ({ lng }: { lng: Locale }) => {
  const t = await getTranslations("Footer");

  return (
    <footer
      style={{
        margin: 20,
        position: "fixed",
        right: 30,
        top: 30,
        // background: "#037dba",
        border: "1px solid #037dba",
        color: "#037dba",
        padding: 8,
        borderRadius: 12,
        opacity: 0.8,
      }}
    >
      {t("languageSwitcher", { lng })}
      {locales
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " | "}
              <Link
                style={{ paddingLeft: 4, color: "orange", fontWeight: 600 }}
                href={`/${l}`}
              >
                {l}
              </Link>
            </span>
          );
        })}
    </footer>
  );
};
