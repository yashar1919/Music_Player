# 🎉 بیلدهای AYMusic Player آماده شد!

## ✅ بیلدهای لینوکس (آماده برای استفاده)

### 📦 فایل‌های موجود:

1. **Debian Package (.deb)**
   - 📁 فایل: `aymusic-player_1.0.0_amd64.deb`
   - 📊 حجم: 173 MB
   - 💻 سیستم: Ubuntu, Debian, Linux Mint و...
   
   ```bash
   sudo dpkg -i dist/aymusic-player_1.0.0_amd64.deb
   sudo apt-get install -f  # اگر dependency نداشت
   ```

2. **AppImage**
   - 📁 فایل: `AYMusic Player-1.0.0.AppImage`
   - 📊 حجم: 221 MB
   - 💻 سیستم: تمام دیستروهای لینوکس
   
   ```bash
   chmod +x "dist/AYMusic Player-1.0.0.AppImage"
   ./dist/AYMusic\ Player-1.0.0.AppImage
   ```

## 🪟 بیلد ویندوز

### وضعیت: نیاز به Wine یا بیلد روی ویندوز

برای بیلد ویندوز سه گزینه داری:

### گزینه 1: استفاده از GitHub Actions (توصیه می‌شه! ⭐)

1. تغییرات رو commit و push کن:
   ```bash
   git add .
   git commit -m "feat: add Windows build support and GitHub Actions workflow"
   git push origin main
   ```

2. یک tag بساز و push کن:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. برو به GitHub > Actions > Build and Release
   - GitHub خودکار برای لینوکس و ویندوز بیلد می‌گیره
   - فایل‌ها در Releases قرار می‌گیرن

4. یا به صورت دستی workflow رو اجرا کن:
   - GitHub > Actions > Build and Release > Run workflow

### گزینه 2: بیلد روی ماشین ویندوز

اگر دسترسی به ویندوز داری:

```cmd
git clone https://github.com/yashar1919/Music_Player.git
cd Music_Player
npm install
npm run build:windows
```

فایل‌های خروجی:
- `dist/AYMusic Player-1.0.0-Setup.exe` - نصب‌کننده (NSIS)
- `dist/AYMusic Player-1.0.0-Portable.exe` - نسخه portable

### گزینه 3: نصب Wine و بیلد روی لینوکس

```bash
# نصب Wine (زمان‌بر است - حدود 10-15 دقیقه)
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install -y wine64 wine32

# بعد از نصب Wine:
npm run build:windows
```

## 📋 تنظیمات اعمال شده

### برای لینوکس ✅
- ✅ آیکون‌های چند سایزه (16x16 تا 512x512)
- ✅ فایل .desktop برای desktop integration
- ✅ MIME types برای file associations
- ✅ بسته‌های .deb و AppImage

### برای ویندوز ✅
- ✅ آیکون .ico با سایزهای متعدد
- ✅ NSIS installer با تنظیمات کامل:
  - انتخاب مسیر نصب
  - Desktop و Start Menu shortcuts
  - Uninstaller
  - License agreement
- ✅ File associations برای فرمت‌های صوتی
- ✅ نسخه Portable (بدون نیاز به نصب)

## 🚀 نصب و استفاده

### لینوکس

#### روش 1: نصب از .deb (توصیه می‌شه)
```bash
cd dist
sudo dpkg -i aymusic-player_1.0.0_amd64.deb

# اجرا
aymusic-player
```

#### روش 2: استفاده از AppImage
```bash
cd dist
chmod +x "AYMusic Player-1.0.0.AppImage"
./"AYMusic Player-1.0.0.AppImage"
```

### ویندوز (وقتی بیلد گرفته شد)

#### روش 1: نصب‌کننده
- دابل کلیک روی `AYMusic Player-1.0.0-Setup.exe`
- مراحل نصب رو دنبال کن
- از Start Menu یا Desktop shortcut اجرا کن

#### روش 2: نسخه Portable
- `AYMusic Player-1.0.0-Portable.exe` رو اجرا کن
- هیچ نصبی لازم نیست

## 🎯 ویژگی‌های بیلد

### قابلیت‌های اضافه شده:
- ✅ File association (باز کردن موزیک با double click)
- ✅ Single instance (همه فایل‌ها در یک پنجره باز می‌شن)
- ✅ Command line support
- ✅ Auto-play وقتی فایلی از خارج باز می‌شه
- ✅ Desktop و system integration

### فرمت‌های صوتی پشتیبانی شده:
- MP3
- WAV
- OGG
- FLAC
- M4A
- AAC
- WMA

## 📊 خلاصه فایل‌ها

```
dist/
├── aymusic-player_1.0.0_amd64.deb       (173 MB) ✅ آماده
├── AYMusic Player-1.0.0.AppImage         (221 MB) ✅ آماده
├── AYMusic Player-1.0.0-Setup.exe        (قابل ساخت) ⏳
└── AYMusic Player-1.0.0-Portable.exe     (قابل ساخت) ⏳
```

## 💡 توصیه

**بهترین روش برای بیلد ویندوز:**
استفاده از GitHub Actions workflow که اضافه شده. فقط کافیه یک tag بزنی و push کنی:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub خودکار هم برای لینوکس و هم برای ویندوز بیلد می‌گیره و در بخش Releases قرار می‌ده! 🚀

## 📝 فایل‌های پروژه

تغییرات جدید:
- ✅ `package.json` - اضافه شدن تنظیمات Windows و scripts جدید
- ✅ `build/icons/icon.ico` - آیکون Windows
- ✅ `.github/workflows/build.yml` - GitHub Actions workflow
- ✅ `WINDOWS_BUILD_GUIDE.md` - راهنمای کامل بیلد Windows
- ✅ `build/generate-icons.sh` - آپدیت شده برای ساخت .ico

همه چیز آماده! 🎉
