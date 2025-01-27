// 弃用，采用 next-intl 的方式

import { NextRequest, NextResponse } from 'next/server';

export const locales: string[] = ['en-US', 'zh-CN', 'zh-TW', 'ja-JP', 'ko-KR'];

// 获取首选区域设置，类似于上面的方法或使用库
export const getLocale = (request: NextRequest) => {
  // 获取请求投语言编号
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    // 获取浏览器第一个语言编号
    return acceptLanguage.split(',')[0];
  }
  return locales[0];
};

export const translateMiddleware = (request: NextRequest) => {
  // 检查路径是否是静态资源
  if (request.nextUrl.pathname.includes('/_next/') || request.nextUrl.pathname.includes('/static/')) {
    return;
  }

  // 检查路径名中是否有任何支持的区域设置
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // 如果没有区域设置则重定向
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 例如，传入的请求是 /products
  // 新的 URL 现在是 /en-US/products
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next|.*\\..*).*)',
  ],
};
