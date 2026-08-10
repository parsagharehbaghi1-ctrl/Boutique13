---
Task ID: 1
Agent: Explore
Task: Thoroughly explore the Boutique13 static project to document all features for Next.js conversion

Work Log:
- Read all HTML files: index.html, login.html, BoutiqueAuthExperience_2.html, product.html, MenCollection.html, contact.html, userdashboard.html
- Read all CSS files: css/style.css, css/navbar.css, css/product.css, css/cart.css, css/search.css, contact.css (root), MenCollection.css (root)
- Read all JS files: js/main.js, js/navbar.js, js/product.js, js/cart.js, js/men.js, js/search.js, js/wishlist.js, js/contact.js
- Listed image assets in img/ and img/products/
- Explored the React-based BoutiqueAuthExperience_2.html (1404-line single-file React 18 + Babel app)
- Discovered missing/inconsistent assets and dead links (documented in section O below)

Stage Summary:

# Boutique13 — Complete Project Documentation for Next.js Conversion

## High-Level Overview

Boutique13 (بوتیک ۱۳) is a **Persian/Farsi (RTL) boutique fashion e-commerce prototype**. It is a static HTML/CSS/JS site with no real backend — all state (cart, wishlist, auth) lives in `localStorage`. The site uses **GSAP 3.12.7 + ScrollTrigger** for animations and **Font Awesome 6.6.0** for icons. The design language is **dark luxury with gold (#D4AF37) accents** in most pages, although the homepage (index.html) uses a different (inconsistent) light/white theme.

**IMPORTANT INCONSISTENCY:** `index.html` uses a LIGHT theme (white bg, Poppins font, blurred white header) — this is visually inconsistent with the rest of the site (MenCollection, contact, product, cart, search, navbar) which all use a DARK theme (black bg, Vazirmatn/Noto Serif Arabic fonts, gold accents). The Next.js version should reconcile this — the **dark + gold theme is the "real" brand identity**.

The site is RTL (`dir="rtl"`, `lang="fa"`).

---

## A. Pages & Routes

There are **7 HTML pages**. Note: 3 of the navbar links (women, shoes, accessories) point to files that **DO NOT EXIST** — they are dead links in the original.

| # | File | Route (Next.js) | Purpose | Status |
|---|------|-----------------|---------|--------|
| 1 | `index.html` | `/` | Homepage with video hero, categories, latest products | Exists (light theme) |
| 2 | `MenCollection.html` | `/men` (or `/men-collection`) | Men's collection with category filter + product grid | Exists (dark theme) |
| 3 | `product.html` | `/product/[id]` | Single product detail page (reads `?id=` query param) | Exists (dark theme) |
| 4 | `contact.html` | `/contact` | Contact form + map links + social links + call card | Exists (dark theme) |
| 5 | `login.html` | `/login` | Login/Register/OTP auth (static, tag-switch UI) | Exists (paper/ink theme) |
| 6 | `BoutiqueAuthExperience_2.html` | `/auth` (alt) | **React 18 single-file** premium auth experience (login/signup/OTP/success) | Exists (dark luxury theme) |
| 7 | `userdashboard.html` | `/dashboard` | User profile dashboard (orders, addresses, wishlist) | Exists (paper/ink theme) |

**Dead links referenced in code (pages NOT built):**
- `women.html` (navbar.js)
- `shoes.html` (navbar.js)
- `accessories.html` (navbar.js)
- `checkout.html` (cart.js — checkout button in cart drawer)
- `js/products-data.js` (referenced in MenCollection.html but the file does NOT exist)

### A.1 Page-by-Page Structure

#### index.html (Homepage — LIGHT theme, different from rest of site)
- **Loader overlay**: full-screen black `#loader` with white "BOUTIQUE 13" h1 (fades out via GSAP on window load)
- **Header** (inline, NOT the navbar.js version): fixed top, white blur bg, logo "Boutique13" text, nav links (خانه/مردانه/زنانه/اکسسوری/کفش/تماس), 3 icons (search/heart/bag — plain FA icons, non-functional)
- **Hero section**: full-screen `<video>` background (autoplay/muted/loop) with dark overlay, content "NEW COLLECTION 2026", h1 "BOUTIQUE13", Persian subtitle "استایل فقط لباس نیست؛ امضای شخصیت توئه.", CTA button "مشاهده کالکشن" linking to `#categories`, scroll-down indicator with bounce animation
- **Categories section** (`#categories`): h2 "دسته بندی", grid of 4 cards (مردانه/Men.jpg → MenCollection.html, زنانه/Woman.png, اکسسوری/accessories.jpg, کفش/images (3).jpg), each card 500px tall image with hover scale + h3 label overlay
- **Products section** (`.products`): h2 "جدیدترین محصولات", 3 hardcoded product cards (تیشرت مشکی 2,600,000 ت / شلوار جین 2,750,000 ت / کفش اسپرت 4,200,000 ت) — **note: these prices differ from product.html data**
- **Footer**: black bg, "BOUTIQUE13" h2, "تمامی حقوق محفوظ است © 2026"
- **Custom cursor**: two divs (`.cursor` 10px gold dot, `.cursor2` 45px gold ring) following mouse via GSAP
- Scripts: GSAP CDN, ScrollTrigger CDN, js/search.js, js/main.js

#### MenCollection.html (Dark theme — main brand style)
- **Header injected by navbar.js** (not inline)
- **Hero section** (`.hero` with `#top`): bg `images/menHero.jpg` (DOES NOT EXIST), dark gradient overlay, heroTag (rotated -6deg "No. ۱۳ دست‌ساز، بی‌زمان" tag with dashed gold border + string), heroContent (kicker "کالکشن پاییز / زمستان", h1 "استایل مردانه" in Noto Serif Arabic, p "سادگی، کیفیت و استایل را یکجا تجربه کن.", gold pill button "مشاهده محصولات" → `#products`)
- **Marquee bar**: infinite-scrolling brand values "کیفیت پارچه • الگوی اختصاصی • تولید محدود • بوتیک ۱۳ •" (every 4th span gold, 26s linear animation, respects prefers-reduced-motion)
- **Categories filter** (`#categories`): row of pill buttons — همه(all, active) / تیشرت(tshirt) / شلوار(pants) / شلوارک(shorts) / کفش(shoes)
- **Products grid** (`#products`): 5 product cards, each with front/back image swap on hover, h3 name, price, gold "مشاهده محصول" button (navigates to `product.html?id=N`)
- **Footer** (`.siteFooter`): logoIcon "B" + "Boutique 13", tagline "استایل فقط لباس نیست، شخصیت توست.", copyright
- Scripts: js/navbar.js, js/men.js, js/search.js, js/wishlist.js, js/cart.js, js/product.js, js/products-data.js (MISSING), inline script for viewProduct button navigation

#### product.html (Single product detail — Dark theme)
- **Cart drawer + overlay + search overlay** injected by cart.js (NOT navbar.js — navbar.js is explicitly excluded here per comment)
- **Inline search overlay** markup (`.searchOverlay` with `#searchInput`, `.closeSearch`, `.searchResults`) — duplicated from navbar.js
- **Product page** (`.productPage`): 2-column grid
  - **Left: gallery** (sticky): `.mainImage` (zoomable on mousemove, 650px tall), `.thumbs` row of 3 thumbnails (click to swap main image with fade)
  - **Right: details**: brand span "Boutique13" (gold), h1 product title, stars "★★★★★ (۲۴ نظر)", price (38px bold), description, size buttons (S/M/L/XL), color swatches (black/white/blue with `data-color` Persian attrs), actions row (gold "افزودن به سبد خرید" button + dark "❤" favorite button)
- **Hidden search index**: `<div class="productCard" data-id="1" data-name="تیشرت اورسایز" data-category="مردانه" data-price="1490000" data-color="مشکی" data-size="L XL" data-description="تیشرت اورسایز Premium" data-image="images/products/tshirt1.jpg" data-link="product.html?id=1">` — this is the search "database"
- **Inline script**: hardcoded `products` object with 5 products keyed by ID 1-5 (title/price/description/images array), reads `?id=` from URL, defaults to "1", dynamically updates title/mainImage/thumbs
- Scripts: js/cart.js, js/search.js, js/wishlist.js, js/product.js, inline product-data script

#### contact.html (Dark theme)
- **Contact hero** (`.contactHero`): 65vh bg image `img/InShot_20260729_173055181_1920x1152.jpg`, dark overlay, content "GET IN TOUCH" (gold, letter-spaced) + h1 "تماس با بوتیک ۱۳" + subtitle
- **Contact container** (2-col grid): leftSide = `img/logo.jpg` (hover scale), rightSide = glass form card "ارسال پیام" with 4 floating-label inputs (نام و نام خانوادگی text / ایمیل email / شماره تماس tel / پیام شما textarea) + gold submit button with arrow icon
- **Call card** (`.call-card` `#callCard`): collapsible green WhatsApp-style button "تماس با بوتیک ۱۳" that toggles to reveal: phone 09918698146, support hours (شنبه تا جمعه 10:30 تا 21:30), store hours (10:30 باز / 21:30 بسته)
- **Navigation card** (`.navigationCard`): "Find Boutique13" with map buttons — نشان (nshn.ir/sbLxYN2AqgS3, green hover) + گوگل مپ (maps.app.goo.gl/6o4KGBAhxxFJVhzB8, Google-colored hover)
- **Social section** (`.socialSection`): 4 floating social cards (120×120) — Instagram (gradient hover), Telegram (#229ED9), WhatsApp (#25D366), Rubika (uses Rubika.jpg image, #074a75 hover). Each has shine sweep effect + float animation
- **Footer**: "BOUTIQUE 13" + "SEE YOU SOON"
- Scripts: GSAP + ScrollTrigger CDN, js/contact.js
- **Note**: contact.html does NOT use navbar.js — it has its own layout

#### login.html (Paper/ink theme — different palette)
- **Stage grid** (2-col, max-width 920px): brandside (dark panel `#20201d` with diagonal stripe pattern) + formside (paper bg `#f4f1ea`)
- **Brandside**: brand-mark "■ فروشگاه پوشاک", brand-copy h1 "یک حساب کاربری، یک اندازه‌ی درست." + p "سایزها، سفارش‌ها و علاقه‌مندی‌های شما همیشه همراه‌تون می‌مونه...", brand-foot "— از ۲ دقیقه کمتر زمان می‌بره"
- **Tagswitch toggle** (signature element): bordered pill with sliding dark background, buttons "ورود" / "ثبت‌نام", small circle nub on the right edge
- **3 panes** (login / register / otp), only one `.active` at a time:
  - **Login pane**: eyebrow "خوش برگشتی", h2 "وارد حساب کاربری‌ات شو", form (شماره موبایل tel + رمز عبور password + row-between [checkbox مرا به خاطر بسپار / forgot link رمز عبور را فراموش کرده‌ام] + submit "ورود به حساب"), divider "یا", otp-alt button "ورود سریع با کد پیامکی", switch-note "حساب کاربری نداری؟ ثبت‌نام کن"
  - **Register pane**: eyebrow "عضویت جدید", h2 "حساب کاربری بساز", form (نام و نام‌خانوادگی text + شماره موبایل tel + رمز عبور password + terms text + submit "دریافت کد تایید"), switch-note "قبلاً ثبت‌نام کرده‌ای؟ وارد شو"
  - **OTP pane**: eyebrow "تایید هویت", h2 "کد تایید را وارد کن", desc "کد ۵ رقمی به شماره [phone] پیامک شد. ویرایش شماره", 5 digit inputs (auto-advance, backspace nav), submit "تایید و ورود", resend-row with countdown timer "ارسال مجدد کد تا MM:SS" + resend button (disabled until 119s countdown ends)
- **Inline script**: setMode() switches panes, register form submit → otp, otp-alt click → otp, edit-phone → register, OTP digit auto-advance, 119-second resend countdown timer
- **NO backend** — purely cosmetic, forms just `event.preventDefault()`

#### BoutiqueAuthExperience_2.html (React 18 dark luxury auth — alt login)
- **Single-file React 18 app** (loaded via CDN: react, react-dom, @babel/standalone) — 1404 lines, source stored in `<script type="text/plain" id="b13-source">` and rendered into `#root`
- **Bilingual copy** (English headlines + Persian body): "MEMBER ACCESS / Welcome back. / به فضای شخصی خودت در Boutique13 برگرد." for login; "NEW MEMBER / Create yours. / یک هویت شخصی برای تجربه‌ی Boutique13 بساز." for signup; "SECURE ACCESS / Verify." for OTP; "IDENTITY VERIFIED / You're in. / ورود با موفقیت انجام شد." for success
- **AuthCard orchestrator** state: `mode` (login|signup), `view` (form|otp|success), `rotation` (3D flip), `flipping`, `morphing`, `tilt` (mouse tilt), `phone`, `password`, `name`, `phoneError`, `phoneShake`
- **Stages**: form (login or signup) → otp → success. Google sign-in skips OTP, goes straight to success
- **VisualPanel** (left side): brand-mark "BOUTIQUE13 / MEMBERS", corner "13 / IDENTITY", animated headline lines (mark "01"/"13" for login, "13" for signup, "0"/"13" for OTP, "13" for success), bottom "PRIVATE ACCESS · 013" / "ONE-TIME CODE · 013" / "IDENTITY VERIFIED · 013"
- **LoginView**: phone field (شماره موبایل, error "لطفاً شماره موبایل خود را وارد کنید"), password field (رمز عبور with eye toggle), ghost-link "ورود با کد تأیید / SMS / ONE-TIME CODE →", Google button "ادامه با Google", switch link "عضو Boutique13 نیستی؟ ساخت حساب"
- **SignupView**: name field, phone field, password field, switch link "قبلاً عضو شدی؟ ورود"
- **OTPView**: 6-digit inputs (NOT 5 like login.html), status state machine (idle|sending|sent|verifying|verified|error|expired), shake animation on error, 119s countdown, "کد وارد شده صحیح نیست." error, "در حال بررسی کد…" / "تأیید شد." status, resend button
- **SuccessView**: animated SVG ring (track + draw circles) with Check icon, "IDENTITY VERIFIED / You're in. / ورود با موفقیت انجام شد.", MagneticButton "ENTER BOUTIQUE13"
- **Animations**: 3D card flip on mode switch (360° rotateY), card tilt on mousemove (perspective), morph transition between form/otp/success, ambient background with sweep light, Mark13 brand mark, prefers-reduced-motion + (hover:hover) detection
- **MagneticButton**: button that follows cursor slightly (magnetic effect)
- **Fonts**: Playfair Display (display headings, italic supported), DM Sans (body), Vazirmatn (Persian)
- **Colors**: `--bg #0B0B0A`, `--bg2 #151412`, `--text #F4F1EA`, `--muted #96928A`, `--accent #C3A276` (muted gold), `--border rgba(244,241,234,0.12)`, `--err #C97A6C` (dusty red). Background is `radial-gradient(120% 140% at 50% 0%, #141311 0%, var(--bg) 55%, #060605 100%)`
- **NO backend** — all fake/demo. Comments explicitly say "DEMO ONLY: In production, replace with real Sign in with Google flow"

#### userdashboard.html (Paper/ink theme — same palette as login.html)
- **Shell grid** (248px sidebar + 1fr main), responsive: sidebar becomes horizontal scroll nav on mobile (≤860px)
- **Sidebar** (dark `#20201d`): brand "■ فروشگاه پوشاک", who block (rust circle avatar "ع.ر" + name "علی رضایی" + phone "09123456789"), nav (نمای کلی active / سفارش‌ها / آدرس‌ها / علاقه‌مندی‌ها / اطلاعات حساب) each with dot indicator, side-foot "خروج از حساب"
- **Main**: page-head (eyebrow "نمای کلی", h1 "سلام، علی", sub "این خلاصه‌ی وضعیت حساب و سفارش‌های اخیرته")
- **Stat row** (3 stats): ۷ سفارش تا امروز / ۲ در مسیر ارسال / ۱۲ مورد علاقه‌مندی
- **Tickets section** (signature element — order tickets): 3 order tickets, each with:
  - ticket-top: order ID (#۱۰۴۲۸ / #۱۰۳۹۱ / #۱۰۴۵۰) + date (۱۴ مرداد ۱۴۰۴ / ۲ مرداد ۱۴۰۴ / امروز) + stamp badge (shipped ارسال شده / delivered تحویل شده / processing در حال آماده‌سازی) — stamps are rotated -2deg with colored borders
  - **stitch-track**: 4-step progress (ثبت سفارش / آماده‌سازی / ارسال / تحویل) with dashed line connector, done=ink, current=rust, future=line color
  - ticket-items: "۳ قلم — کاپشن جین، شلوار چینو، تیشرت بیسیک" etc.
  - ticket-side (with punched-circle cutouts top/bottom): total price + link (پیگیری مرسوله / ثبت نظر / جزئیات سفارش)
- **grid-2** (1.3fr 1fr):
  - **Addresses panel**: 2 saved addresses (پیش‌فرض / محل کار) with edit links
  - **Wishlist teaser**: 2×2 grid of wish-items (کاپشن بمبر / کفش چرم / پیراهن دو جیب / شلوار کتان) with dark overlay labels
- **All data is hardcoded** — purely a static mockup

---

## B. Visual Design

### B.1 Brand Identity
- **Name**: Boutique13 (English) / بوتیک ۱۳ (Persian)
- **Logo**: text-based, "Boutique13" or "Boutique" + small gold "13"
- **Logo icon**: 48px square with 2px gold border, rounded 14px, contains letter "B" in gold. On hover: rotates -8deg and fills gold with black "B"
- **Logo image**: `img/logo.jpg` (14.7KB) — used only on contact page left side
- **Slogan (Persian)**: "استایل فقط لباس نیست؛ امضای شخصیت توئه." (Style isn't just clothing; it's the signature of your personality)
- **Slogan variant**: "استایل فقط لباس نیست، شخصیت توست." (used in MenCollection footer)
- **Recurring "13" motif**: tagNum "۱۳", "No. 13", "13 / IDENTITY", "PRIVATE ACCESS · 013", heroTag

### B.2 Color Palettes (3 distinct palettes across the site)

#### Palette 1: Dark Luxury Gold (MAIN brand — MenCollection, product, contact, cart, search, navbar)
```css
--gold: #D4AF37;        /* primary accent — buttons, links, prices, icons */
--goldHover: #E8C862;   /* lighter gold for hover */
--black: #0f0f0f;       /* page background */
--black2: #181818;      /* cards, inputs, secondary bg */
--white: #ffffff;
--gray: #8d8d8d;        /* muted text */
--light: #f5f5f5;
--border: #2d2d2d;      /* subtle borders */
--shadow: 0 15px 40px rgba(0,0,0,.25);
--radius: 18px;
--transition: .35s ease;
```
Plus ad-hoc: `#111` (cart bg), `#222`/`#242424` (button bg), `#262626` (borders), `#999`/`#aaa`/`#bdbdbd` (muted text variants), `#ff3355`/`#ff3b5f`/`#ff5757` (red for delete/heart), `#22c55e`/`#16a34a` (green for success), `#1e6eff` (blue swatch).

Cursor color: `#d4af37` (gold).

#### Palette 2: Paper/Ink Boutique (login.html + userdashboard.html — different aesthetic)
```css
--ink: #1c1b19;         /* near-black text */
--paper: #f4f1ea;       /* warm cream background */
--card: #ffffff;        /* white cards (dashboard only) */
--olive: #5f6a4c;       /* olive green accent */
--olive-dark: #454e37;  /* darker olive for links */
--rust: #a15630;        /* rust/terracotta accent (eyebrows, avatars, stamps) */
--line: #d8d2c4;        /* subtle cream borders */
--muted: #8a8477;       /* muted text */
--panel: #20201d;       /* dark sidebar/brand panel */
--amber: #b8863f;       /* amber for "processing" stamp (dashboard only) */
```

#### Palette 3: BoutiqueAuthExperience_2 (React auth — darkest luxury)
```css
--bg: #0B0B0A;          /* near-black background */
--bg2: #151412;
--text: #F4F1EA;        /* warm cream text (same as paper) */
--muted: #96928A;
--accent: #C3A276;      /* muted/champagne gold (different from #D4AF37) */
--border: rgba(244,241,234,0.12);
--err: #C97A6C;         /* dusty red error */
```
Background: `radial-gradient(120% 140% at 50% 0%, #141311 0%, var(--bg) 55%, #060605 100%)`. Uses dark gradients `#1c1a17`/`#0c0b0a`/`#050504`.

#### Palette 4: index.html (LIGHT theme — inconsistent with rest)
- White bg `#fff`, dark text `#111`
- Header `rgba(255,255,255,.75)` with backdrop-blur(15px)
- Hero overlay `rgba(0,0,0,.45)`
- Footer black `#000` with white text
- Gold cursor `#d4af37`

#### Social brand colors (contact.css):
- Instagram gradient: `#FEDA75 → #FA7E1E → #D62976 → #962FBF → #4F5BD5`
- Telegram: `#229ED9`
- WhatsApp: `#25D366`
- Rubika: `#074a75`
- Neshan map: `#009944`
- Google map gradient: `#4285F4, #34A853, #FBBC05, #EA4335`

### B.3 Typography

| Font | Weights | Used In | Purpose |
|------|---------|---------|---------|
| **Poppins** | 300, 400, 500, 600, 700, 800 | index.html, contact.css | Original homepage + contact (Latin text) |
| **Vazirmatn** | 300, 400, 500, 600, 700, 800 | login.html, userdashboard.html, MenCollection.css, BoutiqueAuthExperience_2 | Persian UI text (primary Persian font) |
| **Noto Serif Arabic** | 500, 600, 700 | MenCollection.css | Persian display headings (hero h1, product h3) — "حس بوتیک/لوکس" |
| **Playfair Display** | 500, 600, italic 500 | BoutiqueAuthExperience_2 | English display headings (Welcome back / Create yours / Verify / You're in) |
| **DM Sans** | 400, 500, 600 | BoutiqueAuthExperience_2 | English body text |

**Note**: Poppins was the original font but has NO Persian glyphs — that's why later pages switched to Vazirmatn. The Next.js version should standardize on **Vazirmatn (Persian) + Playfair Display or Noto Serif Arabic (display)**.

### B.4 Iconography
- **Font Awesome 6.6.0** (CDN): used on index.html, product.html, contact.html
- **Inline SVG icons** (hand-drawn): used in navbar.js (search/heart/bag) and BoutiqueAuthExperience_2 (Eye, EyeOff, ArrowLeft, Check, Google logo) — no external icon dependency
- **Emoji**: 🗑 (delete in cart), ❤ (favorite button), ★★★★★ (stars), 😕 (no search results), ✔ (contact success)

### B.5 Design Language Signatures
1. **Gold pill buttons** (border-radius: 50px, gold bg, black text, hover lift)
2. **Glass-morphism cards** (`rgba(255,255,255,.05)` + `backdrop-filter: blur(20px)` + 1px subtle border)
3. **Clothing-tag motifs**: heroTag (rotated dashed-border tag with string), cornerTag (rotated -45deg price tag), ticket-side (punched-circle cutouts like a raffle ticket), stamp badges (rotated -2deg with colored borders)
4. **Stitch-track progress**: dashed line connectors with node circles (dashboard order tracking)
5. **Marquee bar**: infinite horizontal scroll of brand values
6. **Front/back image swap** on product hover (MenCollection)
7. **3D tilt cards** on mousemove (MenCollection products via men.js)
8. **Custom gold cursor** (dot + ring) on index.html and contact.html
9. **Floating-label inputs** (contact form — label animates up on focus/valid)
10. **OTP digit auto-advance** inputs (login + React auth)

---

## C. Navigation Structure

### C.1 Two Different Navbars

The site has **TWO different header implementations**:

#### Navbar 1: Inline (index.html only — LIGHT theme)
- Fixed top, 80px tall, white blur bg `rgba(255,255,255,.75)`, backdrop-filter blur(15px), padding 0 8%
- Left: `.logo` text "Boutique13" (28px bold)
- Center: `<nav>` with 6 links (خانه/مردانه/زنانه/اکسسوری/کفش/تماس), gap 40px, hover color #888
- Right: `.icons` 3 Font Awesome icons (fa-magnifying-glass, fa-regular fa-heart, fa-solid fa-bag-shopping) — **non-functional, just decorative**
- main.js adds scroll effect: >80px → bg `rgba(255,255,255,.95)` + box-shadow
- Responsive: nav hidden ≤992px (NO mobile menu — just hidden!)

#### Navbar 2: navbar.js-injected (Dark theme — used by MenCollection.html and product.html via cart.js)
- Fixed top:20px, centered (left:50% transform:translateX(-50%)), width 92% max 1400px, 80px tall, border-radius:25px
- Background `rgba(20,20,20,.55)` + backdrop-blur(18px) + 1px white/0.08 border + box-shadow
- **Scrolled state** (>40px scroll): top:12px, height:68px, bg `rgba(12,12,12,.82)`, stronger shadow
- Left: `.logo` (logoIcon 48px gold-bordered "B" + logoText "Boutique" + small gold "13") — logoIcon rotates -8deg + fills gold on hover
- Center: `.navbar` with 6 links (خانه/مردانه/زنانه/کفش/اکسسوری/تماس با ما), gap 38px, gold underline animation on hover/active
- Right: `.navIcons` — 4 round 46px buttons (search, wishlist with #wishCount badge, cart with #cartCount badge, menuToggle hamburger)
  - Each icon button: dark `#181818` bg, white icon, hover → gold bg + black icon + translateY(-5px)
  - Badges: 20px gold circle, black text, top:-6px right:-4px
- **Mobile menu** (`.mobileMenu`): fullscreen `rgba(10,10,10,.97)` overlay, centered column, 24px links, staggered fade-in (50ms delay per link), hamburger animates to X
- **Hamburger** (`.menuToggle`): 3 spans, hidden on desktop (display:flex only ≤900px), animates to X when `.open`
- **Search overlay** (`.searchOverlay`): fullscreen `rgba(0,0,0,.92)` blur, centered searchBox (700px max 90%), 72px tall input with gold 80px search button, close button 55px circle top-right (rotates 90deg on hover)

**Responsive breakpoints**: ≤900px — hide `.navbar`, show `.menuToggle`

### C.2 Active Link Detection
navbar.js `currentPage()` reads `location.pathname.split("/").pop()` (defaults to "index.html" for root) and adds `.active` class to matching link. Note: navbar.js has TWO versions of the `links` array (lines 20-27 use `MenCollection.html`, lines 20-27 in cart.js use `men.html`) — **inconsistency**.

### C.3 Menu Links (canonical list)
1. خانه (Home) → index.html
2. مردانه (Men) → MenCollection.html
3. زنانه (Women) → women.html **[MISSING]**
4. کفش (Shoes) → shoes.html **[MISSING]**
5. اکسسسوری (Accessories) → accessories.html **[MISSING]**
6. تماس با ما (Contact) → contact.html

### C.4 Pages WITHOUT navbar.js
- index.html (uses inline navbar 1)
- contact.html (no navbar at all — standalone layout)
- login.html (no navbar — standalone auth)
- BoutiqueAuthExperience_2.html (no navbar — standalone auth)
- userdashboard.html (no navbar — has its own sidebar)

So navbar.js is only used on MenCollection.html and product.html (via cart.js).

---

## D. Product Features

### D.1 Product Data Model

Each product has these fields (derived from data attributes in product.html + products object in inline script + MenCollection.html cards):

```javascript
{
  id: number | string,          // "1" through "5"
  name: string,                 // Persian name e.g. "تیشرت اورسایز مشکی Premium"
  title: string,                // alias for name (used in product.html inline script)
  price: number,                // in Toman (Iranian currency) e.g. 1490000
  priceFormatted: string,       // Persian-formatted e.g. "۱,۴۹۰,۰۰۰ تومان"
  category: string,             // "tshirt" | "pants" | "shorts" | "shoes" | "مردانه"
  description: string,          // Persian description
  images: string[],             // array of image paths (gallery)
  image: string,                // main image (single)
  color: string,                // selected color (Persian: "مشکی"/"سفید"/"آبی")
  size: string,                 // selected size ("S"/"M"/"L"/"XL")
  sizes: string[],              // available sizes ["S","M","L","XL"]
  colors: Array<{name, hex}>,   // available colors with hex
  link: string,                 // "product.html?id=1"
  brand: string,                // "Boutique13"
  rating: number,               // 5 stars (hardcoded)
  reviewCount: number,          // 24 reviews (hardcoded)
  qty: number                   // cart quantity (added when in cart)
}
```

### D.2 Product Card Design (MenCollection.html — `.product`)

```
┌─────────────────────────────────┐
│  [front image]                  │  ← .productImage (380px tall)
│  [back image — opacity 0]       │     front fades out, back fades in on hover
│                                 │     image scales 1.08 on hover
├─────────────────────────────────┤
│  [eyebrow — optional]           │  ← .productInfo (padding 22px, translateZ(25px) for 3D)
│  Product Name (Noto Serif)      │     h3 turns gold on hover
│  ۱,۴۹۰,۰۰۰ تومان (gold, 22px)   │     p turns white on hover
│  [مشاهده محصول button]           │     button slides up on hover (opacity 0 → 1)
└─────────────────────────────────┘
```
- Card bg: `rgba(255,255,255,.03)` + backdrop-blur(12px) + 1px white/0.08 border, border-radius 22px
- Entry animation: opacity 0 + translateY(80px) → fade up (`.8s forwards`)
- Hover: box-shadow `0 20px 40px rgba(0,0,0,.35)`, gold border via `::after`, shine sweep via `::before` (rotated 25deg gradient)
- **3D tilt on mousemove** (men.js): perspective(1200px) + rotateX/rotateY based on cursor position + translateY(-10px) + scale(1.02)
- Categories filter: pill buttons (همه/تیشرت/شلوار/شلوارک/کفش), active = gold bg, filters by `data-category` attr (show/hide only, no re-render)

### D.3 Product Detail Page Layout (product.html)

**2-column grid** (`.productPage`, 90% width, 70px gap, margin 140px auto 80px):

**Left column — Gallery** (`.gallery`, sticky top:120px):
- `.mainImage`: 650px tall, bg #181818, border-radius 22px, **zoom on mousemove** (transform-origin follows cursor, scale 1.4)
- `.thumbs`: row of 3 thumbnails (100×120px, border-radius 14px, transparent 2px border), hover → gold border + translateY(-6px), active → gold border, click → fades main image and swaps src

**Right column — Details** (`.details`):
- `.brand` span "Boutique13" (gold, letter-spaced 3px, 15px)
- `<h1>` product title (46px, line-height 1.3)
- `.stars`: "★★★★★" (gold, 20px) + span "(۲۴ نظر)" (gray, 15px)
- `.price`: 38px bold
- `.description`: gray #bdbdbd, line-height 2
- `<h3>انتخاب سایز` + `.sizes` row of 4 buttons (55×55px, border-radius 12px, dark bg, hover/active → gold bg + black text + scale 1.08)
- `<h3>رنگ` + `.colors` row of 3 swatches (34×34px circles, 3px white border, hover → scale 1.15, selected → scale 1.2 + gold ring). Each has `data-color` Persian attr: black="مشکی", white="سفید", blue="آبی"
- `.actions` row: `.addtocart` button (flex:1, 60px tall, gold gradient bg `linear-gradient(135deg,#D4AF37,#e9cc6e)`, black text, gold box-shadow, hover → white bg + translateY(-5px)) + `.favorite` button (60px square, dark bg, ❤ icon, liked state → red #ff3355 + heartBeat animation)

### D.4 Add-to-Cart Validation (product.js)
- User MUST select color AND size before adding — `alert("رنگ را انتخاب کنید.")` / `alert("سایز را انتخاب کنید.")` if missing
- On success: button gets `.added` class (black bg + green check), shows animated SVG checkmark + "افزوده شد" text for 1.6s, then reverts

### D.5 Product Image Zoom (product.js)
- On mousemove over `.mainImage`: calculates x/y % and sets `transformOrigin` + `transform: scale(1.4)`
- On mouseleave: resets to center + scale(1)

---

## E. Cart Functionality

### E.1 Architecture
- **Class `ShoppingCart`** defined in `js/cart.js` (lines 162-316), instantiated as `const shoppingCart = new ShoppingCart();` (global)
- **Storage**: `localStorage` key `"cart"`, value is `JSON.stringify(items)` array
- **Note**: cart.js ALSO contains the full navbar.js code (it's a combined file — the navbar injection + ShoppingCart class are both in cart.js). This is why product.html loads cart.js WITHOUT navbar.js.

### E.2 Cart Data Structure
```javascript
// localStorage "cart" = JSON array of:
[
  {
    id: 1,                    // product id (number)
    name: "تیشرت اورسایز Premium",
    price: 1490000,           // number, in Toman
    image: "img/products/tshirt (2).jpg",
    color: "مشکی",            // selected color (Persian)
    size: "L",                // selected size
    qty: 1                    // quantity (incremented if same id+color+size)
  },
  // ...
]
```

### E.3 Cart Item Identity
Items are considered the **same** (and qty incremented) if `id === product.id && color === product.color && size === product.size`. Otherwise a new line item is added.

### E.4 Cart UI (drawer — injected by cart.js/navbar.js)
```
┌──────────────────────────────────┐
│ سبد خرید                    ✕    │  ← .cartHead (22px padding, border-bottom #262626)
├──────────────────────────────────┤
│ [img]  Product Name              │  ← .cartItem (72×88px img, gap 14px, border-bottom #232323)
│        مشکی - L                  │     .cartInfo: h3 (15px white) + small (12px gray)
│        ۱,۴۹۰,۰۰۰ تومان           │     + p (gold, 14px) + .quantity controls
│        [-] 1 [+]            🗑   │     .deleteItem (30px circle, top:16px left:0, hover #ff5757)
│                                  │
│ [next item...]                   │
├──────────────────────────────────┤
│ جمع کل:        ۱,۴۹۰,۰۰۰ تومان   │  ← .cartFoot (20px 22px 26px padding, border-top)
│ [    تسویه حساب    ]             │     .checkoutBtn (gold pill, links to checkout.html [MISSING])
└──────────────────────────────────┘
```
- `.cart`: fixed right:-430px (off-screen), width 420px, height 100vh, bg #111, slides in with `right:0` transition (`.55s cubic-bezier(.19,1,.22,1)`)
- `.cart.active`: animation `cartOpen` (scale .96→1, opacity 0→1)
- `.cartOverlay`: fullscreen `rgba(0,0,0,.55)` + blur(6px), click closes cart
- Empty state: `.emptyCart` "سبد خرید شما خالی است." (60px padding, gray text)
- `.cartBody` scrollbar: 6px gold thumb
- Responsive ≤480px: `.cart` width 100%

### E.5 Cart Methods
```javascript
class ShoppingCart {
  constructor()          // loads from localStorage, grabs DOM refs, calls init()
  init()                 // renders, binds cartBtn/closeBtn/overlay/bodyEl click events
  open()                 // adds .active to .cart + .cartOverlay
  close()                // removes .active
  addProduct(product)    // finds existing by id+color+size, increments qty or pushes new, saves, renders, opens, bounceIcon()
  changeQty(index, delta) // adjusts qty, removes if qty<=0
  removeItem(index)      // splices item, saves, renders
  save()                 // localStorage.setItem("cart", JSON.stringify(items))
  getTotal()             // sum of price*qty
  bounceIcon()           // restarts cartBounce animation on cartBtn
  render()               // updates #cartCount badge, .totalPrice, and .cartBody innerHTML
}
```

### E.6 Quantity Controls
- `.quantity` row: `[-]` decrease button (26px circle) + `<span>` qty + `[+]` increase button
- Buttons have gold hover
- Decrease past 0 removes the item

### E.7 Cart Badge
- `#cartCount` span in navbar.js-injected cart button (20px gold circle, black text)
- Shows total qty (sum of all item.qty), hidden if 0 (`display:none`)
- `.cartBounce` animation: scale 1→1.25→.92→1 (.4s) — triggered on every addProduct

### E.8 Number Formatting
Prices use `.toLocaleString("fa-IR")` for Persian digits + thousand separators, appended with " تومان". E.g. `1490000` → `"۱,۴۹۰,۰۰۰ تومان"`.

---

## F. Wishlist

### F.1 Architecture
- **Class `Wishlist`** in `js/wishlist.js`, instantiated as `const wishlist = new Wishlist();` (global)
- **Storage**: `localStorage` key `"wishlist"`, JSON array of `{id, name, image, price}`

### F.2 Wishlist Data Structure
```javascript
[
  {
    id: 1,
    name: "تیشرت اورسایز Premium",
    image: "img/products/tshirt (2).jpg",   // grabbed from #mainImage.src
    price: 1490000
  }
]
```
**LIMITATION**: The wishlist is currently **hardcoded to product id=1** — the toggle() method always creates a product object with id:1 and the hardcoded name/price. It doesn't read from a product database. This needs to be fixed in Next.js.

### F.3 Toggle Logic
```javascript
toggle(button) {
  // Creates product object (HARDCODED id:1)
  // Finds index by id
  // If exists: remove from items, remove .liked class, toast "از علاقه‌مندی حذف شد."
  // If not exists: push to items, add .liked class, toast "به علاقه‌مندی اضافه شد."
  // save() + updateBadge()
}
```

### F.4 UI
- Triggered by `.favorite` buttons (the ❤ button on product.html)
- `.favorite.liked` state: red bg #ff3355, heartBeat animation (scale 1→1.35→.9→1.2→1)
- Badge: `#wishCount` in navbar.js-injected wishBtn (20px gold circle)
- **No dedicated wishlist page** — only the badge count + dashboard wishlist teaser (4 hardcoded items)

### F.5 Toast Notifications
- `.toast`: fixed bottom:35px, centered, dark bg #111, white text, 14px border-radius, blur backdrop
- Animation: opacity 0 + translateY(50px) → opacity 1 + translateY(0) (.4s)
- Auto-dismiss after 1.8s
- Created dynamically if it doesn't exist (`document.createElement("div")`)

---

## G. Search

### G.1 Architecture
- **`js/search.js`** — vanilla JS, reads from DOM elements with class `.productCard`
- **NO separate products database** — search indexes hidden `.productCard` divs with data attributes
- Search overlay is injected by navbar.js OR exists inline (product.html)

### G.2 Search Index (Hidden DOM Pattern)
Search reads from elements like:
```html
<div class="productCard"
     data-id="1"
     data-name="تیشرت اورسایز"
     data-category="مردانه"
     data-price="1490000"
     data-color="مشکی"
     data-size="L XL"
     data-description="تیشرت اورسایز Premium"
     data-image="images/products/tshirt1.jpg"
     data-link="product.html?id=1">
</div>
```
**BUG**: MenCollection.html products use class `.product` (NOT `.productCard`), so search.js doesn't index them. Only product.html has the hidden `.productCard` div. The Next.js version should use a proper product database/search API instead.

### G.3 Search Features
- **Open**: click `.searchBtn` → adds `.active` to `.searchOverlay`, focuses input after 250ms, calls `renderPopular()`
- **Close**: click `.closeSearch` / click overlay backdrop / press Escape
- **Live search**: debounced 200ms on input
- **Persian normalization**: converts `ي→ی`, `ك→ک`, lowercases, trims whitespace
- **Searchable fields**: name + category + color + size + description (concatenated, normalized, checked with `.includes()`)
- **Highlight matches**: wraps matched substring in `<mark>` (gold-tinted background `rgba(212,175,55,.18)`, gold text, 4px border-radius)

### G.4 Search Result Item
```
┌──────────────────────────────────────────┐
│ [img 80×95px]  Product Name (highlighted) │  ← .searchItem (18px padding, gap 18px, hover bg #222)
│                category (gray)            │     animation: fadeResult (.25s, translateY 8→0)
│                ۱,۴۹۰,۰۰۰ تومان (gold)     │
└──────────────────────────────────────────┘
```
Each result is an `<a>` linking to `product.html?id=N`. Result is clickable.

### G.5 Popular Searches (empty state)
When input is empty, shows "محبوب‌ترین جستجوها" with 4 pill tags: تیشرت / شلوار / کفش / اکسسسوری. Clicking a tag fills the input and triggers search.

### G.6 No Results State
```
       😕 (48px emoji)
   محصولی پیدا نشد (white h3)
   دوباره امتحان کنید (gray p)
```

### G.7 Search UI Styling
- `.searchOverlay`: fullscreen `rgba(0,0,0,.45)` + blur(12px), padding-top 90px, fade in .35s
- `.searchBox`: max-width 750px, bg #181818, 1px white/0.08 border, border-radius 22px, box-shadow, slides down + scales in (translateY(-40px) scale(.96) → 0/1)
- `.searchHeader`: 20px padding, border-bottom #2b2b2b, input 18px white, close button 45px circle
- `.searchResults`: max-height 500px, scrollable, 7px gold scrollbar
- `.popularTag`: pill (999px radius), #222 bg, 1px #333 border, hover → gold bg + black text + translateY(-3px)

---

## H. Authentication

### H.1 Two Auth Implementations

There are **TWO different auth pages**:

#### Auth 1: `login.html` (static, Paper/Ink theme — simpler)
- **3 panes** toggled by `setMode(mode, phone)`: login / register / otp
- **Tagswitch toggle**: bordered pill with sliding dark background, "ورود" / "ثبت‌نام" buttons
- **Login form**: شماره موبایل (tel, placeholder "09xxxxxxxxx") + رمز عبور (password) + row-between [checkbox "مرا به خاطر بسپار" / "رمز عبور را فراموش کرده‌ام" link] + submit "ورود به حساب"
- **Register form**: نام و نام‌خانوادگی (text, placeholder "مثلاً علی رضایی") + شماره موبایل (tel) + رمز عبور (password, placeholder "حداقل ۸ کاراکتر") + terms text + submit "دریافت کد تایید"
- **OTP pane**: 5 digit inputs (44×52px, 18px font, LTR direction), "کد ۵ رقمی به شماره [phone] پیامک شد. ویرایش شماره", submit "تایید و ورود", 119-second countdown "ارسال مجدد کد تا MM:SS" + disabled resend button (enabled when timer hits 0)
- **OTP digit behavior**: auto-advance on input (digits only), backspace navigates to previous
- **NO backend** — all `event.preventDefault()`, purely cosmetic
- **Brand side** (left, dark): "فروشگاه پوشاک", h1 "یک حساب کاربری، یک اندازه‌ی درست.", p "سایزها، سفارش‌ها و علاقه‌مندی‌های شما همیشه همراه‌تون می‌مونه. کافیه یک‌بار وارد بشید.", "— از ۲ دقیقه کمتر زمان می‌بره"

#### Auth 2: `BoutiqueAuthExperience_2.html` (React 18, dark luxury — premium)
- **Single-file React app** (1404 lines) loaded via CDN (react@18, react-dom@18, @babel/standalone)
- **Bilingual** (English headlines + Persian body)
- **4 views**: form (login|signup) → otp → success
- **3D card flip** on mode switch (360° rotateY, swap content at 50% of rotation)
- **Card tilt** on mousemove (perspective + rotateX/rotateY based on cursor)
- **Morph transition** between form/otp/success (380ms)
- **LoginView**: phone field (شماره موبایل, with error shake if empty) + password field (رمز عبور with eye toggle) + ghost-link "ورود با کد تأیید / SMS / ONE-TIME CODE →" + Google button "ادامه با Google" (multicolor G logo) + switch "عضو Boutique13 نیستی؟ ساخت حساب"
- **SignupView**: name field + phone field + password field + switch "قبلاً عضو شدی؟ ورود"
- **OTPView**: **6 digit inputs** (not 5 like login.html), status state machine (idle/sending/sent/verifying/verified/error/expired), shake on error, 119s countdown, "کد وارد شده صحیح نیست." error
- **SuccessView**: animated SVG ring (track + draw circles, stroke-dashoffset animation) with Check icon, "IDENTITY VERIFIED / You're in. / ورود با موفقیت انجام شد.", MagneticButton "ENTER BOUTIQUE13"
- **AmbientBackground**: SVG noise filter (`<feTurbulence>`) + radial vignette + sweep light (animates during flip)
- **Mark13**: large brand mark showing "01"/"13" or "13" or "0"/"13" depending on stage
- **VisualPanel** (left): brand-mark "BOUTIQUE13 / MEMBERS", corner "13 / IDENTITY", animated headline lines, "PRIVATE ACCESS · 013" / "ONE-TIME CODE · 013" / "IDENTITY VERIFIED · 013"
- **MagneticButton**: button that magnetically follows cursor
- **Accessibility**: respects `prefers-reduced-motion` and `(hover: hover) and (pointer: fine)` media queries
- **DEMO ONLY** — comments explicitly say replace Google flow with real OAuth in production
- **Field components**: `Field` (text input with icon, focus state, error message) and `PasswordField` (extends Field with eye toggle)

### H.2 Auth Fields Summary

| Field | login.html | BoutiqueAuthExperience_2 |
|-------|------------|--------------------------|
| Login phone | ✓ (tel, 09xxxxxxxxx) | ✓ (tel, with error shake) |
| Login password | ✓ (password) | ✓ (password + eye toggle) |
| Login OTP | 5 digits | 6 digits |
| Signup name | ✓ (text, "مثلاً علی رضایی") | ✓ (text) |
| Signup phone | ✓ (tel) | ✓ (tel) |
| Signup password | ✓ (password, "حداقل ۸ کاراکتر") | ✓ (password + eye toggle) |
| Google login | ✗ | ✓ (multicolor button) |
| Forgot password | ✓ (link, non-functional) | ✗ |
| Remember me | ✓ (checkbox) | ✗ |
| Resend timer | 119s | 119s |

### H.3 No Real Auth
Both pages are **purely cosmetic** — no actual authentication, no token, no session. Forms just `event.preventDefault()`. The Next.js version should implement real auth (NextAuth.js or similar) with phone+OTP via SMS provider.

---

## I. User Dashboard

### I.1 Layout (userdashboard.html — Paper/Ink theme)
- **Shell**: 248px sidebar + 1fr main grid, full viewport height
- **Sidebar** (dark `#20201d`, 28px 22px padding):
  - Brand "■ فروشگاه پوشاک" (13px, letter-spaced)
  - Who block: 42px rust circle avatar "ع.ر" + name "علی رضایی" + phone "09123456789" (LTR)
  - Nav (column, gap 2px): 5 links (نمای کلی active / سفارش‌ها / آدرس‌ها / علاقه‌مندی‌ها / اطلاعات حساب), each with 5px dot indicator, active = paper bg + ink text + rust dot
  - Side-foot: "خروج از حساب" link
- **Main** (36px 40px 60px padding):
  - Page-head: eyebrow "نمای کلی" (rust) + h1 "سلام، علی" (26px) + sub "این خلاصه‌ی وضعیت حساب و سفارش‌های اخیرته"
  - **Stat row** (3 cols, 14px gap): ۷ سفارش تا امروز / ۲ در مسیر ارسال / ۱۲ مورد علاقه‌مندی (24px bold number + 12.5px muted label)
  - **Recent orders** (`.tickets`): section-title "سفارش‌های اخیر" (with ::after line filler), 3 order tickets
  - **grid-2** (1.3fr 1fr): Addresses panel + Wishlist teaser

### I.2 Order Ticket (Signature Element)
```
┌─────────────────────────────────────┬──────────────┐
│ سفارش #۱۰۴۲۸       [ارسال شده]      │              │  ← stamp rotated -2deg
│ ۱۴ مرداد ۱۴۰۴                       │  ۴,۲۸۰,۰۰۰   │
│                                     │  تومان       │
│ ●─────●─────●─────○                 │              │  ← stitch-track (dashed)
│ ثبت   آماده‌سازی  ارسال  تحویل        │ پیگیری مرسوله │
│                                     │              │
│ ۳ قلم — کاپشن جین، شلوار چینو، ...   │              │
└─────────────────────────────────────┴──────────────┘
         ↑ punched circles at top/bottom of divider
```
- **Stamps** (3 states): `.stamp.shipped` (olive-dark #454e37), `.stamp.delivered` (olive #5f6a4c), `.stamp.processing` (amber #b8863f) — all rotated -2deg, 1.5px border, 20px border-radius
- **Stitch-track**: 4 steps (ثبت سفارش / آماده‌سازی / ارسال / تحویل), each with 11px node circle. States: done (ink #1c1b19), current (rust #a15630), future (line #d8d2c4). Dashed line connectors between steps.
- **ticket-side**: dashed left border, 20px 22px padding, punched-circle cutouts (`::before`/`::after` 14px paper circles at top/bottom right)
- **3 sample orders**: #۱۰۴۲۸ shipped (۳ قلم, ۴,۲۸۰,۰۰۰) / #۱۰۳۹۱ delivered (۱ قلم, ۱,۱۵۰,۰۰۰) / #۱۰۴۵۰ processing today (۲ قلم, ۳,۹۰۰,۰۰۰)

### I.3 Addresses Panel
- 2 saved addresses:
  - پیش‌فرض (rust tag): "تهران، خیابان ولیعصر، بالاتر از پارک وی، پلاک ۱۲، واحد ۳"
  - محل کار (muted tag): "تهران، سعادت‌آباد، خیابان علامه، برج نگین، طبقه ۵"
- Each row has "ویرایش" edit link

### I.4 Wishlist Teaser
- 2×2 grid of `.wish-item` (3:4 aspect ratio, beige #e8e3d6 bg)
- 4 hardcoded items: کاپشن بمبر / کفش چرم / پیراهن دو جیب / شلوار کتان
- Each has dark overlay label at bottom (`rgba(28,27,25,0.72)` bg, paper text)

### I.5 All Data Hardcoded
Everything in the dashboard is static — no real user data, no real orders. Next.js version should fetch from database.

---

## J. Contact Page

### J.1 Sections (top to bottom)

1. **Contact Hero** (`.contactHero`, 65vh): bg image `img/InShot_20260729_173055181_1920x1152.jpg`, dark overlay `rgba(0,0,0,.55)`, centered content — "GET IN TOUCH" (gold, letter-spaced 5px) + h1 "تماس با بوتیک ۱۳" (70px) + p "ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم."

2. **Contact Container** (2-col grid, 90% width, 80px gap, 120px margin):
   - **Left**: `img/logo.jpg` (border-radius 25px, hover scale 1.04)
   - **Right** (glass card): h2 "ارسال پیام" (35px) + form with 4 floating-label inputs + gold submit button with arrow icon
   - Form fields: نام و نام خانوادگی (text, required) / ایمیل (email, required) / شماره تماس (tel, required) / پیام شما (textarea, required, 140px tall)
   - Floating labels: position absolute, animate up + turn gold on focus/valid

3. **Call Card** (`.call-card` `#callCard`): collapsible, max-width 650px, centered, 60px margin
   - Button "📞 تماس با بوتیک ۱۳" (green #25D366, 18px padding)
   - Toggle via `toggleCallCard()` (defined in contact.js) — adds `.active` class
   - Expanded content (max-height 0 → 500px transition):
     - 📞 شماره تماس: 09918698146
     - 🎧 ساعات پاسخگویی: شنبه تا جمعه / 10:30 تا 21:30
     - 🏪 ساعات کاری فروشگاه: باز: 10:30 / بسته: 21:30

4. **Navigation Card** (`.navigationCard`): glass card, centered
   - 90px circle icon (gold location pin, floating animation)
   - h3 "Find Boutique13"
   - p "انتخاب کنید با کدام برنامه می‌خواهید مسیر را مشاهده کنید."
   - 2 map buttons: نشان (green hover, links to nshn.ir/sbLxYN2AqgS3) + گوگل مپ (Google gradient hover, links to maps.app.goo.gl/6o4KGBAhxxFJVhzB8)

5. **Social Section** (`.socialSection`): 4 social cards (120×120, flex-wrap, 35px gap)
   - Instagram (gradient hover #FEDA75→#4F5BD5)
   - Telegram (#229ED9 hover)
   - WhatsApp (#25D366 hover)
   - Rubika (uses Rubika.jpg image, #074a75 hover)
   - Each: glass bg, 42px gold icon (or Rubika image), floating animation, shine sweep `::before` effect
   - All links are `href="#"` (non-functional placeholders)

6. **Footer**: black bg, "BOUTIQUE 13" h2 (40px) + "SEE YOU SOON" (gray)

### J.2 Form Behavior (contact.js)
- GSAP animations: hero timeline (span/h1/p fade up), leftSide slides from -120, rightSide slides from +120, cards stagger, footer h2 fade
- Floating inputs: focus → border-bottom turns gold (#d4af37), blur → reverts to #555 if empty
- Button hover: scale 1.05 (GSAP)
- Submit: `e.preventDefault()`, button becomes "✔ پیام ارسال شد" with green bg #16a34a (FAKE success — no backend)

### J.3 Custom Cursor
Same gold dot + ring cursor as index.html (`.cursor` + `.cursor2`), though the HTML has them commented out (`<!-- <div class="cursor"></div>... -->`). The JS still references them but they won't exist.

---

## K. Men Collection Page

### K.1 Page Structure (MenCollection.html)
1. **Hero** (`.hero` `#top`): bg `images/menHero.jpg` (MISSING), gradient overlay, heroTag, heroContent
2. **Marquee** (`.marquee`): infinite scroll brand values
3. **Categories** (`#categories`): 5 filter pills
4. **Products** (`#products`): 5 product cards
5. **Footer** (`.siteFooter`)

### K.2 Hero Tag (Signature Element)
```
       │ (string - 34px gold line)
   ┌────────────┐  ← rotated -6deg, dashed gold border, dark bg
   │   No.      │     backdrop-blur(6px)
   │    ۱۳      │     (Noto Serif Arabic 34px gold)
   │ دست‌ساز،   │
   │ بی‌زمان    │
   └────────────┘
```
Hidden on mobile (≤900px).

### K.3 Marquee
- Border top/bottom `#2d2d2d`, bg #181818, 16px padding
- Track: flex, `width: max-content`, `scrollMarquee 26s linear infinite` (translateX 0 → -50%)
- Content: "کیفیت پارچه • الگوی اختصاصی • تولید محدود • بوتیک ۱۳ •" repeated twice (for seamless loop)
- Every 4th span is gold
- Respects `prefers-reduced-motion` (animation: none)

### K.4 Category Filters
- 5 pills: همه (all, active by default) / تیشرت (tshirt) / شلوار (pants) / شلوارک (shorts) / کفش (shoes)
- Active: gold bg + gold border + black text + font-weight 600
- Inactive: transparent bg + #2d2d2d border + gray text
- Hover: gold border + white text
- Filter logic (men.js): reads `data-category` attr on each `.product` card, shows/hides via `style.display` (NO re-render, NO animation)

### K.5 Product Grid
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 35px`
- 5 hardcoded products (see section M for full data)
- Each card has 3D tilt effect on hover (men.js mousemove handler)
- Front/back image swap on hover

### K.6 View Product Navigation
- Each product card has a gold "مشاهده محصول" button with `data-product-id="N"`
- Inline script: click → `window.location.href = 'product.html?id=' + this.dataset.productId`

### K.7 Sorting / Advanced Filters
**NONE** — only the 5 category pills. No size filter, no color filter, no price filter, no sorting. (Task description mentioned these but they don't exist in the actual code.)

---

## L. Assets

### L.1 Image Inventory

#### `/img/` directory (7 files):
| File | Size | Purpose |
|------|------|---------|
| `Men.jpg` | 2.1 MB | Men's category card on homepage (index.html) |
| `Woman.png` | 2.0 MB | Women's category card on homepage |
| `accesories.jpg` | 43 KB | Accessories category card on homepage |
| `logo.jpg` | 14.7 KB | Logo image on contact page left side |
| `loginimg.png` | 2.2 MB | **UNUSED** — not referenced in any HTML/JS |
| `signupimg.png` | 2.8 MB | **UNUSED** — not referenced in any HTML/JS |
| `InShot_20260729_173055181_1920x1152.jpg` | 90 KB | Contact page hero background |

#### `/img/products/` directory (6 files):
| File | Size | Purpose |
|------|------|---------|
| `tshirt (1).jpg` | 3.2 MB | T-shirt product image (thumbnail 2 on product.html, back image on MenCollection) |
| `tshirt (2).jpg` | 2.8 MB | T-shirt product image (main image on product.html, back image on MenCollection product 1) |
| `tshirt (3).jpg` | 2.6 MB | T-shirt product image (front image on MenCollection product 1, shoes category card on homepage) |
| `tshirt1.jpg` | 24 KB | **Referenced in product.html data-image but small/low-res** — appears to be a placeholder |
| `images (2).jpg` | 26 KB | Used on homepage product card "شلوار جین" + MenCollection (referenced) |
| `images (3).jpg` | 19 KB | Used on homepage product card "کفش اسپرت" + shoes category card on homepage |

#### Root-level assets:
| File | Size | Purpose |
|------|------|---------|
| `Rubika.jpg` | (in root) | Rubika social icon on contact page |
| `خیلی مخلصیم🫡🤍ست دیور💎سایزبندی کامل M-L-XL-2XL 🤚🏻جهت استعلام 💵 پیام بزارید 🤍🙌🏻.mp4` | (in root) | Homepage hero video background |

### L.2 Missing Images (Referenced but DON'T EXIST)
These images are referenced in HTML/JS but are NOT in the img/products/ directory:
- `img/products/tshirt2.jpg` — referenced in MenCollection product 2 + product.html product 2 images
- `img/products/pants1.jpg` — referenced in MenCollection product 3 + product.html product 3 images
- `img/products/shorts1.jpg` — referenced in MenCollection product 4 + product.html product 4 images
- `img/products/shoes1.jpg` — referenced in MenCollection product 5 + product.html product 5 images
- `images/menHero.jpg` — referenced in MenCollection.css `.hero` background
- `../images/hero.jpg` — referenced in style.css `.hero` background (but index.html uses video instead)

### L.3 External CDN Dependencies
- **Font Awesome 6.6.0**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`
- **GSAP 3.12.7**: `https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js`
- **GSAP ScrollTrigger 3.12.7**: `https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js`
- **Google Fonts**: Poppins, Vazirmatn, Noto Serif Arabic, Playfair Display, DM Sans
- **React 18** (BoutiqueAuthExperience_2 only): `https://unpkg.com/react@18/umd/react.production.min.js`, `react-dom@18`, `@babel/standalone`

---

## M. Sample Product Data (for Database Seeding)

### M.1 Product Catalog (from product.html inline script + MenCollection.html)

This is the canonical product data extracted from the code:

```javascript
const products = {
  "1": {
    id: "1",
    title: "تیشرت اورسایز مشکی Premium",
    name: "تیشرت اورسایز مشکی",                    // MenCollection variant
    price: 1490000,                                // ۱,۴۹۰,۰۰۰ تومان
    priceFormatted: "۱,۴۹۰,۰۰۰ تومان",
    category: "tshirt",
    categoryFa: "مردانه",
    description: "تیشرت اورسایز تهیه شده از پنبه ۱۰۰٪ با دوخت Premium مناسب استفاده روزمره.",
    descriptionShort: "تیشرت اورسایز Premium",
    images: [
      "img/products/tshirt (2).jpg",
      "img/products/tshirt (1).jpg",
      "img/products/tshirt (3).jpg"
    ],
    frontImage: "img/products/tshirt (3).jpg",     // MenCollection
    backImage: "img/products/tshirt (2).jpg",      // MenCollection
    mainImage: "img/products/tshirt (2).jpg",      // product.html
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "مشکی", hex: "#000000", cssClass: "black" },
      { name: "سفید", hex: "#ffffff", cssClass: "white" },
      { name: "آبی", hex: "#1e6eff", cssClass: "blue" }
    ],
    color: "مشکی",
    size: "L XL",
    brand: "Boutique13",
    rating: 5,
    reviewCount: 24,
    link: "product.html?id=1"
  },
  "2": {
    id: "2",
    title: "تیشرت سفید مینیمال",
    name: "تیشرت سفید مینیمال",
    price: 1290000,                                 // ۱,۲۹۰,۰۰۰ تومان
    priceFormatted: "۱,۲۹۰,۰۰۰ تومان",
    category: "tshirt",
    description: "تیشرت سفید مینیمال با طراحی ساده و مناسب استفاده روزمره.",
    images: ["img/products/tshirt2.jpg", "img/products/tshirt2.jpg", "img/products/tshirt2.jpg"],  // MISSING image
    frontImage: "img/products/tshirt2.jpg",         // MISSING
    backImage: "img/products/tshirt2.jpg",          // MISSING
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "سفید", hex: "#ffffff" }],
    link: "product.html?id=2"
  },
  "3": {
    id: "3",
    title: "شلوار بگ مردانه",
    name: "شلوار بگ مردانه",
    price: 2190000,                                 // ۲,۱۹۰,۰۰۰ تومان
    priceFormatted: "۲,۱۹۰,۰۰۰ تومان",
    category: "pants",
    description: "شلوار بگ مردانه با فرم آزاد و مناسب استایل روزمره.",
    images: ["img/products/pants1.jpg", "img/products/pants1.jpg", "img/products/pants1.jpg"],  // MISSING image
    frontImage: "img/products/pants1.jpg",          // MISSING
    backImage: "img/products/pants1.jpg",           // MISSING
    sizes: ["S", "M", "L", "XL"],
    link: "product.html?id=3"
  },
  "4": {
    id: "4",
    title: "شلوارک اسپرت",
    name: "شلوارک اسپرت",
    price: 990000,                                  // ۹۹۰,۰۰۰ تومان
    priceFormatted: "۹۹۰,۰۰۰ تومان",
    category: "shorts",
    description: "شلوارک اسپرت مناسب استایل راحت و استفاده روزمره.",
    images: ["img/products/shorts1.jpg", "img/products/shorts1.jpg", "img/products/shorts1.jpg"],  // MISSING image
    frontImage: "img/products/shorts1.jpg",         // MISSING
    backImage: "img/products/shorts1.jpg",          // MISSING
    sizes: ["S", "M", "L", "XL"],
    link: "product.html?id=4"
  },
  "5": {
    id: "5",
    title: "کتانی سفید",
    name: "کتانی سفید",
    price: 3490000,                                 // ۳,۴۹۰,۰۰۰ تومان
    priceFormatted: "۳,۴۹۰,۰۰۰ تومان",
    category: "shoes",
    description: "کتانی سفید با طراحی مینیمال و مناسب استایل روزمره.",
    images: ["img/products/shoes1.jpg", "img/products/shoes1.jpg", "img/products/shoes1.jpg"],  // MISSING image
    frontImage: "img/products/shoes1.jpg",          // MISSING
    backImage: "img/products/shoes1.jpg",           // MISSING
    sizes: ["40", "41", "42", "43"],                // shoes probably use numeric sizes
    link: "product.html?id=5"
  }
};
```

### M.2 Homepage Products (index.html — DIFFERENT prices/names!)
These 3 products appear ONLY on the homepage with different names/prices than the catalog above:
```javascript
// index.html "جدیدترین محصولات" section
[
  { name: "تیشرت مشکی", price: "2,600,000 تومان", image: "img/products/tshirt1.jpg" },
  { name: "شلوار جین", price: "2,750,000 تومان", image: "img/products/images (2).jpg" },
  { name: "کفش اسپرت", price: "4,200,000 تومان", image: "img/products/images (3).jpg" }
]
```
**INCONSISTENCY**: These don't match the catalog. Next.js should consolidate to ONE product source.

### M.3 Categories
```javascript
const categories = [
  { id: "all", label: "همه" },
  { id: "tshirt", label: "تیشرت" },
  { id: "pants", label: "شلوار" },
  { id: "shorts", label: "شلوارک" },
  { id: "shoes", label: "کفش" }
];
```

### M.4 Homepage Category Cards (index.html)
```javascript
const homeCategories = [
  { name: "مردانه", image: "img/Men.jpg", link: "MenCollection.html" },
  { name: "زنانه", image: "img/Woman.png", link: "#" },
  { name: "اکسسوری", image: "img/accesories.jpg", link: "#" },
  { name: "کفش", image: "img/products/images (3).jpg", link: "#" }
];
```

### M.5 Dashboard Sample Orders (userdashboard.html)
```javascript
const sampleOrders = [
  {
    id: "10428",
    date: "۱۴ مرداد ۱۴۰۴",
    status: "shipped",          // ارسال شده
    statusLabel: "ارسال شده",
    progress: ["done", "done", "current", "pending"],  // ثبت/آماده‌سازی/ارسال/تحویل
    itemCount: 3,
    items: "کاپشن جین، شلوار چینو، تیشرت بیسیک",
    total: "4,280,000",
    action: "پیگیری مرسوله"
  },
  {
    id: "10391",
    date: "۲ مرداد ۱۴۰۴",
    status: "delivered",        // تحویل شده
    statusLabel: "تحویل شده",
    progress: ["done", "done", "done", "done"],
    itemCount: 1,
    items: "پیراهن کتان طوسی",
    total: "1,150,000",
    action: "ثبت نظر"
  },
  {
    id: "10450",
    date: "امروز",
    status: "processing",       // در حال آماده‌سازی
    statusLabel: "در حال آماده‌سازی",
    progress: ["done", "current", "pending", "pending"],
    itemCount: 2,
    items: "کت اسپرت مشکی، شلوار پارچه‌ای",
    total: "3,900,000",
    action: "جزئیات سفارش"
  }
];
```

### M.6 Dashboard User (hardcoded)
```javascript
const sampleUser = {
  initials: "ع.ر",
  name: "علی رضایی",
  phone: "09123456789",
  stats: { orders: 7, inTransit: 2, wishlist: 12 },
  addresses: [
    { tag: "پیش‌فرض", text: "تهران، خیابان ولیعصر، بالاتر از پارک وی، پلاک ۱۲، واحد ۳" },
    { tag: "محل کار", text: "تهران، سعادت‌آباد، خیابان علامه، برج نگین، طبقه ۵" }
  ],
  wishlistTeaser: ["کاپشن بمبر", "کفش چرم", "پیراهن دو جیب", "شلوار کتان"]
};
```

### M.7 Contact Info (contact.html)
```javascript
const contactInfo = {
  phone: "09918698146",
  supportDays: "شنبه تا جمعه",
  supportHours: "10:30 تا 21:30",
  storeOpen: "10:30",
  storeClose: "21:30",
  neshanMapUrl: "https://nshn.ir/sbLxYN2AqgS3",
  googleMapUrl: "https://maps.app.goo.gl/6o4KGBAhxxFJVhzB8",
  socials: [
    { name: "Instagram", url: "#", icon: "fab fa-instagram" },
    { name: "Telegram", url: "#", icon: "fab fa-telegram" },
    { name: "WhatsApp", url: "#", icon: "fab fa-whatsapp" },
    { name: "Rubika", url: "#", image: "Rubika.jpg" }
  ]
};
```

---

## N. Special Interactions

### N.1 Animations (GSAP)

#### index.html (main.js):
- **Loader fade**: `#loader` opacity 0 over 1.2s, 1s delay, then `display:none`
- **Hero entrance**: `.hero-content span/h1/p/button` fade up with staggered delays (2s, 2.2s, 2.5s, 2.8s)
- **Hero scroll parallax**: `.hero` scales to 0.92 + border-radius 40px on scroll (scrub)
- **Hero content parallax**: `.hero-content` translateY -180 + opacity 0 on scroll (scrub)
- **Categories entrance**: `.card` fade up (y:150, stagger 0.3, trigger at 70%)
- **Products entrance**: `.product` fade up (y:100, stagger 0.25, trigger at 70%)
- **Header scroll**: >80px → stronger bg + box-shadow
- **Custom cursor**: `.cursor` (10px gold dot) + `.cursor2` (45px gold ring) follow mouse via GSAP (durations .05 and .25). Ring scales 1.8 on hover over interactive elements.

#### contact.html (contact.js):
- **Hero timeline**: span (y:40) → h1 (y:80) → p (y:40), each 1s/.8s with overlap
- **Left image entrance**: slides from x:-120, opacity 0 (trigger at 75%)
- **Right form entrance**: slides from x:120, opacity 0 (trigger at 75%)
- **Cards stagger**: y:80, opacity 0, stagger 0.25 (trigger at 80%)
- **Footer h2**: y:60, opacity 0 (trigger at 85%)
- **Floating inputs**: focus → border-bottom color animates to gold; blur → reverts if empty
- **Button hover**: scale 1.05 (GSAP, .3s)
- **Form submit**: button becomes "✔ پیام ارسال شد" + green bg #16a34a (FAKE success)
- **Custom cursor**: same as index.html

#### BoutiqueAuthExperience_2.html (React + inline CSS animations):
- **3D card flip**: 360° rotateY on mode switch (login↔signup), content swaps at 50% of rotation
- **Card tilt**: mousemove → perspective + rotateX/rotateY (max ~2deg)
- **Morph transition**: 380ms between form/otp/success views
- **Ambient sweep light**: animates during flip
- **Mark13**: brand mark pulses/changes during transitions
- **MagneticButton**: button follows cursor slightly
- **OTP shake**: error → `b13-otp-row--shake` class
- **Phone shake**: error → phone field shakes for 420ms
- **Success ring**: SVG circle stroke-dashoffset animation (draws circle)
- **Check pop**: SVG check scales in
- **Respects `prefers-reduced-motion`**: all animations disabled, instant transitions

### N.2 CSS Animations

| Animation | Duration | Used For |
|-----------|----------|----------|
| `updown` | 1.5s infinite | Scroll-down indicator bounce (index.html) |
| `cartOpen` | .5s | Cart drawer scale-in |
| `cartBounce` | .4s | Cart icon bounce on add |
| `heartBeat` | .45s | Favorite button liked state |
| `checkPop` | .45s | Add-to-cart checkmark |
| `scrollMarquee` | 26s linear infinite | MenCollection marquee |
| `show` | .8s forwards | Product card entrance (MenCollection) |
| `fadeResult` | .25s | Search result item entrance |
| `float` | 3s ease-in-out infinite | Social icons + nav icon (contact) |

### N.3 Modals / Overlays

| Element | Trigger | Close |
|---------|---------|-------|
| `.cartOverlay` + `.cart` drawer | `.cartBtn` click | `.closeCart` / overlay click |
| `.searchOverlay` | `.searchBtn` click | `.closeSearch` / overlay backdrop / Escape |
| `.mobileMenu` | `.menuToggle` (hamburger) click | link click / Escape |
| `.call-card` expand | `.call-btn` click (`toggleCallCard()`) | same button (toggle) |

### N.4 Toast Notifications
- Created dynamically by wishlist.js
- `.toast`: fixed bottom 35px, centered, dark bg, white text, blur backdrop
- Animation: opacity 0 + translateY(50px) → visible (.4s)
- Auto-dismiss 1.8s
- Used for: "به علاقه‌مندی اضافه شد." / "از علاقه‌مندی حذف شد."

### N.5 Image Interactions
- **Front/back swap** (MenCollection products): front image fades out, back image fades in + scales 1.1→1 on hover
- **Main image zoom** (product.html): transform-origin follows cursor, scale 1.4 on mousemove
- **Thumbnail swap** (product.html): click thumbnail → main image fades out (200ms) → src swaps → fades back in
- **Category card zoom** (index.html): image scales 1.08 on hover
- **Logo image zoom** (contact.html): scales 1.04 on hover

### N.6 Form Interactions
- **Floating labels** (contact.html): labels animate up + turn gold on focus/valid
- **OTP auto-advance** (login.html + React auth): digits auto-focus next input, backspace navigates back
- **Password eye toggle** (React auth only): show/hide password
- **Phone validation** (React auth): empty phone → shake animation + error message

### N.7 3D Tilt Effect (men.js)
```javascript
// On .product mousemove:
card.style.transform = `
  perspective(1200px)
  rotateX(${rotateX}deg)    // based on Y position, max ~4deg
  rotateY(${rotateY}deg)    // based on X position, max ~4deg
  translateY(-10px)
  scale(1.02)
`;
// On mouseleave: resets to 0/0/0/1
```

---

## O. Critical Issues & Inconsistencies to Fix in Next.js

### O.1 Design Inconsistencies
1. **index.html uses LIGHT theme** while rest of site uses DARK theme — must reconcile to dark + gold
2. **Two different navbar implementations** (inline index.html vs navbar.js) — must unify
3. **Two different auth pages** (login.html vs BoutiqueAuthExperience_2.html) — pick one (recommend the React one as it's more polished)
4. **Three different color palettes** — must standardize (recommend Dark Luxury Gold as primary, with Paper/Ink for auth/dashboard as a secondary "member" theme)

### O.2 Missing Assets
- 4 product images (tshirt2.jpg, pants1.jpg, shorts1.jpg, shoes1.jpg) — need real product photos
- menHero.jpg (MenCollection hero bg)
- hero.jpg (style.css reference, unused since index uses video)
- loginimg.png and signupimg.png exist but are UNUSED

### O.3 Missing Pages (Dead Links)
- women.html, shoes.html, accessories.html (navbar links)
- checkout.html (cart checkout button)
- js/products-data.js (referenced in MenCollection.html but doesn't exist)

### O.4 Code Issues
- **Wishlist hardcoded to product id=1** — toggle() always creates same product object
- **Search only indexes `.productCard` elements** (product.html), not `.product` elements (MenCollection.html) — search doesn't work on MenCollection
- **Product prices inconsistent** between index.html (2,600,000 تومان) and product.html (1,490,000 تومان) for what should be the same product
- **cart.js duplicates navbar.js code** — both files contain the full navbar injection + ShoppingCart class
- **navbar.js links array is duplicated** with different hrefs (MenCollection.html vs men.html) between the two copies
- **Custom cursor divs commented out** in contact.html but JS still tries to query them
- **No real auth, no real cart persistence beyond localStorage, no backend at all**

### O.5 Recommended Next.js Architecture
- **Framework**: Next.js 16 with App Router, TypeScript, Tailwind CSS 4
- **State**: Zustand or React Context for cart/wishlist (persisted to localStorage)
- **Database**: Prisma ORM (already in /home/z/my-project/prisma/) with PostgreSQL/SQLite
- **Auth**: NextAuth.js with phone+OTP credentials provider (replace fake OTP)
- **Fonts**: Vazirmatn (Persian) + Playfair Display (English display) via next/font
- **Animations**: Framer Motion (replace GSAP for React-friendly animations)
- **Icons**: lucide-react (replace Font Awesome + inline SVGs)
- **UI Components**: shadcn/ui (already configured per /home/z/my-project/components.json)
- **Routes**:
  - `/` (homepage — unify to dark theme)
  - `/men` (men's collection)
  - `/women` (build new)
  - `/shoes` (build new)
  - `/accessories` (build new)
  - `/product/[id]` (product detail)
  - `/cart` (or keep as drawer)
  - `/checkout` (build new)
  - `/contact`
  - `/login` (consolidate to one auth flow)
  - `/dashboard` (user profile)
  - `/wishlist` (build new dedicated page)
- **API Routes**:
  - `GET /api/products` (list with filters)
  - `GET /api/products/[id]` (detail)
  - `POST /api/auth/otp/send` (send OTP)
  - `POST /api/auth/otp/verify` (verify OTP)
  - `POST /api/cart` (sync cart)
  - `POST /api/contact` (contact form submission)
  - `POST /api/orders` (create order)

---
Task ID: 2-15
Agent: Main (Z.ai Code)
Task: Convert Boutique13 static HTML/CSS/JS project into a full Next.js 16 e-commerce app with all frontend features working

Work Log:
- Read complete exploration notes (Task ID 1) to understand all 7 pages, design system, product data, cart/wishlist/search/auth/dashboard features
- Copied existing images from Boutique13/img to public/images (men, woman, accesories, logo, hero-bg, rubika, tshirt variants)
- Generated missing product images via z-ai image CLI: white-tshirt, baggy-pants, sport-shorts, white-sneakers, men-hero banner
- Designed Prisma schema with Product, ContactMessage, Order models (SQLite)
- Pushed schema and seeded 8 products with Persian names, Toman prices, categories (tshirt/pants/shorts/shoes), sizes, colors, descriptions
- Built dark luxury gold theme in globals.css (#0a0a0a bg, #D4AF37 gold, glass morphism, custom animations: marquee, cart-bounce, heart-beat, float, fade-up, shine)
- Configured Vazirmatn (Persian) + Playfair Display (display) fonts with RTL direction in layout.tsx
- Built Zustand stores: cart-store (localStorage persisted, add/remove/qty, drawer open state) and wishlist-store (localStorage persisted, toggle)
- Built API routes: /api/products (GET with category/featured filters), /api/products/[id] (GET by id or slug), /api/search (GET with Persian normalization), /api/contact (POST)
- Built reusable components: Navbar (glass, scroll effect, cart/wishlist/search badges, mobile menu), Footer (sticky bottom, brand/social/quick links), CartDrawer (slide-in from left RTL, qty controls), SearchOverlay (fullscreen, debounced live search, highlight, popular tags), ProductCard (hover image swap, quick add, wishlist toggle), StoreHydration
- Built 8 pages:
  * / (Homepage): hero with men-hero bg, marquee bar, features grid, category cards, featured products, brand story CTA
  * /shop (Men Collection): hero, category filter pills, sort dropdown, product grid with loading skeletons
  * /product/[slug]: gallery with zoom-on-hover, thumbnails, size/color selectors with validation, add to cart, wishlist, trust badges, related products
  * /cart: item list with qty controls, order summary, checkout button
  * /wishlist: grid of saved products, add to cart / remove
  * /login: dual-pane auth (brand panel + form), login/register tabs toggle, phone+password, OTP 5-digit auto-advance flow, resend timer, success state
  * /dashboard: sidebar nav (overview/orders/addresses/wishlist/account), stats, order tickets with stitch-track progress, addresses, wishlist teaser
  * /contact: hero, contact form (name/email/phone/message), info cards (phone/hours/address), map buttons (Neshan/Google), social cards (Instagram/Telegram/WhatsApp/Rubika)
- Verified with Agent Browser: all pages render (200 status), no console/runtime errors, add-to-cart works (drawer opens with item), product detail validation works (size required), OTP flow works end-to-end (login -> OTP -> success), search works (live results with highlight), sticky footer verified (footer at viewport bottom on short pages), mobile responsive verified

Stage Summary:
- Successfully converted static Boutique13 into a production-ready Next.js 16 e-commerce app
- Tech stack: Next.js 16 App Router + TypeScript + Tailwind CSS 4 + shadcn/ui + Prisma (SQLite) + Zustand + Lucide icons
- Design: dark luxury gold theme (#D4AF37 on #0a0a0a), Persian RTL, Vazirmatn + Playfair Display fonts, glass morphism, custom animations
- All frontend features working: product browsing, filtering, search, cart (drawer + page), wishlist, auth (OTP flow), dashboard, contact form
- 8 products seeded in database with real images
- Lint passes clean, dev server runs on port 3000 with no errors
- All API routes functional (products, search, contact)
