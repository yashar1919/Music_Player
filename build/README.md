📦 Build resources for electron-builder

این پوشه مخصوص منابعی است که `electron-builder` هنگام تولید بسته‌ها استفاده می‌کند (مثل آیکون‌ها).

- برای لینوکس آیکون‌ها باید در قالب PNG و با اندازه‌های معمول (256x256 و 512x512) در این فولدر قرار بگیرند، برای مثال `build/icons/512x512.png`.
- نام آیکون را می‌توانید در کانفیگ `build` در `package.json` مشخص کنید، یا از فایل‌های پیش‌فرض استفاده شود.

دستورات مفید:

- توسعه (dev): `npm run dev` # این سرور Vite را اجرا می‌کند و سپس Electron را باز می‌کند
- ساخت renderer: `npm run build:renderer`
- بسته‌بندی (فقط deb): `npm run dist`
- بسته‌بندی (AppImage): `npm run dist:appimage`
- تولید محلی بدون ساختن installer: `npm run pack`

اگر خواستی من می‌تونم آیکون نمونه اضافه کنم یا فایل‌های `desktop`/`snap`/`deb` را تست کنم و خطاها رو رفع کنم.
