// app/page.tsx
import type { Locale } from "@/config";
import { useTranslation } from "@/i18n";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = await useTranslation(lng);

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
