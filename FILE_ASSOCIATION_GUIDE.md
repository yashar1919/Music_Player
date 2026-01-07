# راهنمای استفاده از AYMusic Player به عنوان پخش کننده پیش‌فرض

## تغییرات اعمال شده

تغییرات زیر برای پشتیبانی از باز کردن فایل‌های موزیک از طریق فایل منیجر اعمال شده:

### 1. پشتیبانی از آرگومان‌های خط فرمان (main/index.js)

- دریافت فایل‌های ارسال شده از خط فرمان
- پشتیبانی از single instance (جلوگیری از باز شدن چندین نمونه)
- ارسال فایل‌ها به renderer process

### 2. آپدیت preload.js

- اضافه شدن API برای دریافت فایل‌های خط فرمان
- اضافه شدن listener برای کانال 'open-files'

### 3. آپدیت App.jsx

- اضافه شدن useEffect برای گوش دادن به فایل‌های جدید
- پخش خودکار وقتی فایلی از خارج برنامه باز می‌شود

### 4. فایل .desktop (build/aymusic-player.desktop)

- تعریف MIME types برای فرمت‌های صوتی
- تنظیمات لازم برای لینوکس

### 5. تنظیمات electron-builder (package.json)

- تنظیم mimeTypes و desktop entry

## نحوه نصب و تست

### 1. بیلد گرفتن از برنامه

```bash
npm run build
```

### 2. نصب بسته

برای DEB:

```bash
sudo dpkg -i dist/aymusic-player_1.0.0_amd64.deb
```

برای AppImage:

```bash
chmod +x dist/AYMusic-Player-1.0.0.AppImage
sudo cp dist/AYMusic-Player-1.0.0.AppImage /opt/aymusic-player
sudo cp build/aymusic-player.desktop /usr/share/applications/
```

### 3. آپدیت کردن MIME database

```bash
sudo update-desktop-database
```

### 4. تنظیم به عنوان پخش کننده پیش‌فرض

#### روش 1: از طریق GUI

- روی یک فایل موزیک راست کلیک کنید
- Properties > Open With را انتخاب کنید
- AYMusic Player را پیدا کنید و به عنوان پیش‌فرض انتخاب کنید

#### روش 2: از طریق Terminal

```bash
xdg-mime default aymusic-player.desktop audio/mpeg
xdg-mime default aymusic-player.desktop audio/mp3
xdg-mime default aymusic-player.desktop audio/flac
xdg-mime default aymusic-player.desktop audio/wav
xdg-mime default aymusic-player.desktop audio/ogg
```

## تست کردن

### تست 1: باز کردن از خط فرمان

```bash
aymusic-player /path/to/song.mp3
```

### تست 2: باز کردن از فایل منیجر

- روی یک فایل موزیک دابل کلیک کنید (اگر به عنوان پیش‌فرض تنظیم شده)
- یا راست کلیک > Open With > AYMusic Player

### تست 3: باز کردن چند فایل

```bash
aymusic-player /path/to/song1.mp3 /path/to/song2.mp3
```

## عیب‌یابی

### اگر برنامه در لیست "Open With" نمایش داده نمی‌شود:

```bash
# آپدیت کردن cache
sudo update-desktop-database
xdg-mime query default audio/mpeg
```

### اگر فایل باز نمی‌شود:

1. بررسی کنید که برنامه نصب شده: `which aymusic-player`
2. لاگ‌ها را بررسی کنید: اجرا کنید برنامه را از terminal
3. مجوزهای فایل را چک کنید

### برای تست در حالت development:

```bash
npm run dev
# در terminal دیگر:
electron . /path/to/song.mp3
```

## ویژگی‌های جدید

✅ باز کردن فایل‌های موزیک از فایل منیجر
✅ پخش خودکار فایل‌های باز شده
✅ Single instance (تمام فایل‌ها در یک پنجره باز می‌شوند)
✅ پشتیبانی از فرمت‌های: MP3, WAV, OGG, FLAC, M4A, AAC, WMA

## نکات مهم

- وقتی فایلی از خارج برنامه باز می‌شود، به صورت خودکار به playlist اضافه شده و پخش می‌شود
- اگر برنامه قبلاً باز باشد، فایل جدید به playlist موجود اضافه می‌شود
- Single instance lock باعث می‌شود همیشه فقط یک نمونه از برنامه اجرا شود
