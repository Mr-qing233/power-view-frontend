import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(en-US|zh-CN)/:path*'],

  // Skip all paths that should not be internationalized.
  // This skips the folders "api", "_next" and all files
  // with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

// export const middleware = (request: NextRequest) => {
//   return translateMiddleware(request);
// };
