import { createInstance, FlatNamespace, KeyPrefix } from "i18next";
import type { i18n } from "i18next";
import { FallbackNs } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { locales, defaultLocale } from "@/config";
import type { Locale } from "@/config";

const initI18next = async (
  lng: Locale = defaultLocale,
  ns: string | string[] = "basic",
) => {
  const i18nInstance: i18n = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      // debug: true,
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: "basic",
      defaultNS: "basic",
      ns,
    });
  return i18nInstance;
};

export async function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: Locale, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string),
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
