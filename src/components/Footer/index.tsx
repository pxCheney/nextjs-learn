import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { locales } from "@/config";
import type { Locale } from "@/config";
import { useTranslation } from "@/i18n";

export const Footer = async ({ lng }: { lng: Locale }) => {
  const { t } = await useTranslation(lng, "footer");
  return (
    <footer
      style={{
        margin: 20,
        position: "fixed",
        right: 30,
        top: 30,
        background: "lime",
        padding: 10,
        borderRadius: 8,
        opacity: 0.8,
      }}
    >
      <Trans i18nKey="languageSwitcher" t={t}>
        {/* 此时有了 i18nk 会自动获取 ns:footer 中的内容 */}
        {/* @ts-ignore */}
        Switch from <strong>{{ lng }}</strong> to:{" "}
      </Trans>
      {locales
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " | "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
