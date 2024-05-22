// middleware.js
import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { i18n } from "@/config";

const publicFile = /\.(.*)$/;
const excludeFile = ["logo.svg"];

function getLocale(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  // 这里不能直接传入 request，有更简单的写法欢迎评论留言
  const languages = new Negotiator({ headers }).languages();

  return match(languages, i18n.locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // 如果是 public 文件，不重定向，特别处理：《图片白名单 excludeFile》例如：logo.svg 不同颜色区分
  // if (publicFile.test(pathname)) return;
  if (
    publicFile.test(pathname) &&
    excludeFile.indexOf(pathname.substr(1)) == -1
  )
    return;

  // 获取匹配的 locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // 默认语言不重定向
  if (locale == i18n.defaultLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }

  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
