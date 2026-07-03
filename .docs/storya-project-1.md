# Project 1 — "STYORA" (Dự án 1 — "STYORA")
## Static Sportswear E-commerce Landing + Product Page (Trang landing & trang sản phẩm đồ thể thao tĩnh)

> Goal: Prove semantic HTML5, SEO, Sass + BEM, vanilla ES6+, responsive & cross-browser skill — plus a **modern, 3D-animated** aesthetic — no framework. Lighthouse SEO/a11y ≥ 95.
> (Mục tiêu: Chứng minh kỹ năng HTML5 ngữ nghĩa, SEO, Sass + BEM, JS ES6+ thuần, responsive & đa trình duyệt — kèm phong cách **hiện đại, chuyển động 3D** — không dùng framework. Điểm Lighthouse SEO/a11y ≥ 95.)

---

## 1. Project Overview (Tổng quan dự án)

**Concept (Ý tưởng):** "STYORA" — a fictional performance **sportswear** brand (running, training & lifestyle apparel). (Thương hiệu giả định bán **đồ thể thao** hiệu năng cao — trang phục chạy bộ, tập luyện & thường ngày.)
Tight product line (tops, bottoms, outerwear, shoes, accessories) = easier to design, easier to demo, and it justifies a bold athletic art direction. (Dòng sản phẩm gọn = dễ thiết kế, dễ demo, và hợp với art direction thể thao mạnh mẽ.)

> Design is no longer speculative — Stitch generation is done. Six screens (desktop +
> mobile for home/collection/product) live in `.figma/screens/`, 15 studio product
> shots in `.figma/products/`, and 2 cinematic hero banners in `.figma/banners/`. See
> §1.1 for the real catalog and §5.1 for how these assets map into the build.

### 1.1 Product catalog (từ ảnh đã tạo trong `.figma/products/`)

15 studio product shots exist, one per SKU, five per category (folder names shortened
below; full path is `.figma/products/professional_studio_product_shot_of_styora_<slug>/screen.png`):

| Product (from folder slug) | Category |
|---|---|
| Aero Knit | Tops |
| Kinetic Compression | Tops |
| Volt Singlet | Tops |
| Aero Tights | Bottoms |
| Strata Pant | Bottoms |
| Velocity Shorts | Bottoms |
| Strata Wind | Outerwear |
| Thermo Shield | Outerwear |
| Vortex Shell | Outerwear |
| Apex Trail | Shoes |
| Kinetic Carbon R1 | Shoes |
| V-Strike Pro | Shoes |
| Apex Backpack | Accessories |
| Hydro Cap | Accessories |
| Kinetic Bottle | Accessories |

**⚠️ Prices/names in the generated screens are placeholders and are inconsistent
across screens** (e.g. "Vortex Shell" shows as $145 on the home grid, $310 on
collection desktop, and $245 on collection mobile; the PDP even shows a product
titled "Aero Shell Jacket" that doesn't match any of the 15 shot folders exactly).
Treat the screens as layout/mood reference only — author the real, single source of
truth for names/prices/categories once in `products.json` when building the collection
and PDP pages, using this table as the canonical product list.

**Design direction (Định hướng thiết kế):** Modern, dark, high-energy. Big kinetic typography, electric "volt" accent, and **real depth** — 3D product rotation, card tilt-on-hover, scroll-driven parallax, and motion that responds to the user. Not a flat/old-school store. (Hiện đại, nền tối, năng lượng cao. Chữ động cỡ lớn, màu nhấn "volt", và **chiều sâu thật** — xoay sản phẩm 3D, thẻ nghiêng khi hover, parallax theo cuộn, chuyển động phản hồi người dùng. Không phải cửa hàng phẳng/kiểu cũ.)

**Pages (Các trang):**
1. `index.html` — Landing / Home with 3D hero (Trang chủ có hero 3D)
2. `collection.html` — Product grid with filter UI + tilt cards (Trang danh mục có bộ lọc + thẻ nghiêng 3D)
3. `product.html` — Product detail page / PDP with 360° viewer (Trang chi tiết sản phẩm có trình xem 360°)

**What this project proves to an employer (Dự án chứng minh điều gì với nhà tuyển dụng):**
- You can build pixel-clean, **motion-rich** UI without React. (Bạn dựng được UI sạch đẹp, **giàu chuyển động** mà không cần React.)
- You understand SEO & accessibility at a technical level — even with heavy animation (`prefers-reduced-motion`). (Bạn hiểu SEO & accessibility ở mức kỹ thuật — kể cả khi animation nặng.)
- Your CSS is organized and maintainable (BEM + Sass architecture). (CSS có tổ chức và dễ bảo trì.)
- You can implement **3D & advanced motion** with the platform (CSS 3D transforms, IntersectionObserver, scroll-driven animations). (Bạn triển khai được **3D & chuyển động nâng cao** bằng nền tảng web.)
- ✅ This is also your official "CSS conventions code sample" for the portfolio requirement. (Đây cũng chính là "mẫu code quy ước CSS" cho yêu cầu portfolio.)

---

## 2. Tech Stack & Justification (Công nghệ & lý do chọn)

| Tech (Công nghệ) | Why (Lý do) |
|---|---|
| HTML5 semantic | Job requirement #1; base for SEO/a11y. (Yêu cầu số 1; nền tảng cho SEO/a11y.) |
| Sass (SCSS syntax) | Shows preprocessor knowledge: variables, mixins, partials. (Thể hiện kiến thức preprocessor.) |
| BEM naming | Explicit job requirement for code sample. (Yêu cầu rõ trong tin tuyển dụng.) |
| Vanilla ES6+ modules | "No jQuery" requirement; modular JS sample. (Đáp ứng yêu cầu "không jQuery"; mẫu JS module hóa.) |
| **CSS 3D transforms** (`perspective`, `transform-style: preserve-3d`, `rotate3d`) | Core of the 3D look with **zero libraries** — keeps the portfolio "pure vanilla" claim intact. (Cốt lõi của giao diện 3D mà **không cần thư viện** — giữ nguyên tuyên bố "thuần vanilla".) |
| **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`) + IntersectionObserver fallback | Modern parallax/reveal without JS scroll listeners; progressive enhancement. (Parallax/reveal hiện đại không cần lắng nghe scroll bằng JS.) |
| Vite | Bonus point in job post; fast dev server, Sass built-in, multi-page build. (Điểm cộng; dev nhanh, hỗ trợ Sass, build đa trang.) |
| Netlify | Free hosting, custom domain, deploy previews. (Hosting miễn phí, domain tùy chỉnh, preview khi deploy.) |
| Stitch (`stitch.withgoogle.com`) + Figma | Generate the modern sportswear UI with AI, refine in Figma, then build from it — proves AI-assisted design → code handoff. (Tạo UI đồ thể thao hiện đại bằng AI, tinh chỉnh ở Figma, rồi dựng theo — chứng minh kỹ năng handoff thiết kế→code có AI hỗ trợ.) |
| **Three.js / Spline** *(stretch only)* | Optional real-WebGL 3D hero product. Kept out of the core so the "zero external JS libraries" rule stays true for the main build. (Tùy chọn hero 3D WebGL thật. Để ngoài phần lõi để giữ luật "không thư viện JS ngoài".) |

---

## 3. Prerequisites — Study Before Building (Kiến thức cần học trước khi làm)

Estimated: 6–8 days, 2–3h/day. (Ước tính: 6–8 ngày, 2–3 giờ/ngày.)

| Topic (Chủ đề) | Resource (Tài nguyên) | Time (Thời gian) |
|---|---|---|
| Semantic HTML & document structure (HTML ngữ nghĩa) | web.dev/learn/html | 1 day (1 ngày) |
| Flexbox + Grid review (Ôn Flexbox + Grid) | web.dev/learn/css, Flexbox Froggy, Grid Garden | 1–2 days |
| **CSS 3D transforms & perspective** (Biến đổi 3D & phối cảnh CSS) | web.dev (3D transforms), MDN `transform-style`/`perspective` | 1 day |
| **CSS scroll-driven animations + `@keyframes`** (Animation theo cuộn) | scroll-driven-animations.style, MDN `animation-timeline` | 1 day |
| Sass basics: variables, nesting, partials, mixins (Sass cơ bản) | sass-lang.com/guide | 1 day |
| BEM methodology (Phương pháp BEM) | getbem.com/naming | 0.5 day |
| ES6 modules + DOM without jQuery (Module ES6 + DOM thuần) | javascript.info (Modules, Document chapters) | 1–2 days |
| SEO on-page + JSON-LD (SEO on-page + dữ liệu có cấu trúc) | web.dev/learn (SEO), schema.org/Product | 0.5 day |
| Vite basics (Vite cơ bản) | vitejs.dev/guide | 0.5 day |

---

## 4. Design System — "STYORA Kinetic" (Hệ thống thiết kế — "STYORA Kinetic")

A modern, dark, athletic system. Store all tokens as CSS custom properties in `abstracts/_variables.scss`. (Hệ thống tối, thể thao, hiện đại. Lưu token dưới dạng CSS custom property.)

### 4.1 Color (Màu sắc)

| Token | Value | Use (Công dụng) |
|---|---|---|
| `--color-bg` | `#0A0A0B` | Near-black base — the "arena". (Nền đen chủ đạo.) |
| `--color-surface` | `#141417` | Cards, sheets (raised). (Thẻ, panel nổi.) |
| `--color-surface-2` | `#1E1E23` | Hover / elevated surface. (Bề mặt nâng cao.) |
| `--color-text` | `#F5F5F7` | Primary text. (Chữ chính.) |
| `--color-muted` | `#9A9AA5` | Secondary text. (Chữ phụ.) |
| `--color-volt` | `#CCFF00` | **Signature accent** — CTAs, prices, highlights. (Màu nhấn đặc trưng.) |
| `--color-volt-ink` | `#0A0A0B` | Text on volt buttons. (Chữ trên nút volt.) |
| `--color-electric` | `#2E6BFF` | Secondary accent — links, focus glow. (Màu nhấn phụ.) |
| `--color-danger` | `#FF3B3B` | Sale badge / sold-out. (Nhãn giảm giá / hết hàng.) |
| `--color-border` | `rgba(245,245,247,.08)` | Hairline borders. (Viền mảnh.) |
| Optional light mode | via `prefers-color-scheme` | Invert base to `#F5F5F7`, keep volt. (Đảo nền, giữ volt.) |

### 4.2 Typography (Kiểu chữ)

- **Display / headings:** **Anton** — confirmed as the typeface actually used across all 6 generated screens and locked in `.figma/screens/kinetic_performance_system/DESIGN.md` tokens (display-xl 96px, display-lg 64px, headline-lg 40px/32px mobile). Uppercase, tight tracking (-0.02 to -0.04em), huge sizes. *Archivo Expanded*/*Clash Display* were considered in early planning but are **not** what was generated — don't substitute them. (Chữ tiêu đề: Anton, đã chốt qua thiết kế đã tạo.)
- **Body / UI:** **Inter** — confirmed, 16–18px, clean and legible. *Satoshi* was an early alternative, not used in the final generated design. (Chữ nội dung: Inter.)
- **Data / labels / SKUs:** **JetBrains Mono**, all-caps, +0.1em tracking, 12px — used for category tags, chips, stats and technical/EXIF-style captions (see the PDP viewer's camera-data caption in `styora_product_updated_desktop`). New addition vs. the original plan; add it as a third font stack. (Font mono cho nhãn/label kỹ thuật — bổ sung mới.)
- Fluid scale with `clamp()`: hero up to `clamp(3rem, 12vw, 10rem)`. (Cỡ chữ co giãn.)
- `font-display: swap`, self-host + preload all three families (Anton, Inter, JetBrains Mono) for Lighthouse. (Tự host + preload để đạt Lighthouse.)

### 4.3 Space, radius, elevation (Khoảng cách, bo góc, độ nổi)

- Spacing scale (8px base): `4, 8, 12, 16, 24, 32, 48, 64, 96` → `--space-1…9`.
- Radius: `--radius-sm: 8px`, `--radius: 16px`, `--radius-lg: 28px`, pill `999px`.
- Shadows are **soft + colored**: `--shadow-lift: 0 20px 60px -20px rgba(0,0,0,.6)`, plus a volt glow `--glow-volt: 0 0 40px rgba(204,255,0,.35)` for hovers.

### 4.4 Motion & 3D principles (Nguyên tắc chuyển động & 3D)

- **Perspective root:** wrap 3D scenes in a container with `perspective: 1000px`. (Bọc cảnh 3D trong container có perspective.)
- **Tilt cards:** product cards rotate on `rotateX/rotateY` toward the cursor (max ±8°), with a specular highlight. (Thẻ nghiêng theo con trỏ.)
- **360° viewer:** PDP main image is an image-sequence spun by drag/keyboard (fallback: hover to auto-spin). (Trình xem 360° kéo/bàn phím.)
- **Scroll choreography:** headings rise + fade, hero product parallaxes, section dividers wipe — prefer CSS `animation-timeline` with an IntersectionObserver fallback. (Dàn dựng theo cuộn, ưu tiên CSS, có fallback JS.)
- **Micro-interactions:** magnetic buttons, volt underline sweep, count-up on stats. (Vi tương tác: nút nam châm, gạch chân quét, đếm số.)
- **Easing:** custom cubic-bezier `--ease-out-expo: cubic-bezier(.16,1,.3,1)`; durations 200–600ms.
- **Accessibility:** **everything** wrapped in `@media (prefers-reduced-motion: reduce)` to disable transforms/parallax. (Tôn trọng người dùng tắt chuyển động — bắt buộc.)

---

## 5. Folder Structure (Cấu trúc thư mục)

```
styora/
├── index.html
├── collection.html
├── product.html
├── vite.config.js          # multi-page config (cấu hình đa trang)
├── package.json
├── public/
│   ├── favicon.svg
│   ├── fonts/               # self-hosted display + body fonts (font tự host)
│   └── images/
│       ├── hero/             # hero/banner exports, optimized from .figma/banners/ (ảnh hero tối ưu)
│       ├── products/         # product shots, optimized from .figma/products/ (ảnh sản phẩm tối ưu)
│       └── 360/              # image sequences for the PDP viewer — NOT YET SOURCED, see §5.1 (chuỗi ảnh xoay 360° — chưa có nguồn)
└── src/
    ├── styles/
    │   ├── main.scss        # single entry, imports everything (điểm vào duy nhất)
    │   ├── abstracts/
    │   │   ├── _variables.scss   # colors, spacing, fonts, motion tokens (token màu/chữ/chuyển động)
    │   │   ├── _mixins.scss      # breakpoints, focus-ring, reduced-motion (mixin breakpoint, focus, reduced-motion)
    │   │   └── _functions.scss
    │   ├── base/
    │   │   ├── _reset.scss
    │   │   ├── _typography.scss
    │   │   └── _global.scss
    │   ├── layout/
    │   │   ├── _header.scss      # .header block
    │   │   ├── _footer.scss
    │   │   └── _container.scss
    │   ├── components/           # one file per BEM block (mỗi block BEM một file)
    │   │   ├── _button.scss          # magnetic / volt CTA (nút nam châm / volt)
    │   │   ├── _product-card.scss     # 3D tilt card (thẻ nghiêng 3D)
    │   │   ├── _hero.scss             # 3D parallax hero (hero parallax 3D)
    │   │   ├── _viewer-360.scss       # PDP spin viewer (trình xem xoay)
    │   │   ├── _marquee.scss          # kinetic scrolling text (chữ chạy động)
    │   │   ├── _accordion.scss
    │   │   └── _badge.scss
    │   └── pages/
    │       ├── _home.scss
    │       ├── _collection.scss
    │       └── _product.scss
    └── js/
        ├── main.js               # entry: imports & inits modules (điểm vào)
        ├── modules/
        │   ├── nav.js            # mobile menu (menu di động)
        │   ├── tilt.js           # 3D cursor tilt on cards/hero (nghiêng 3D theo con trỏ)
        │   ├── viewer360.js      # drag/keyboard 360° product spin (xoay 360°)
        │   ├── magnetic.js       # magnetic buttons (nút nam châm)
        │   ├── gallery.js        # PDP thumbnail gallery (thư viện ảnh PDP)
        │   ├── accordion.js      # product info accordion (accordion thông tin)
        │   ├── scrollReveal.js   # IntersectionObserver reveal fallback (reveal dự phòng)
        │   ├── stickyHeader.js
        │   └── filter.js         # collection page filter (bộ lọc danh mục)
        └── utils/
            ├── dom.js            # qs(), qsa() helpers
            ├── rafThrottle.js    # requestAnimationFrame throttle for pointer moves (điều tiết theo rAF)
            └── debounce.js
```

### 5.1 Generated design assets — where they live (Tài sản thiết kế đã tạo — vị trí)

Stitch generation for this project is already done. These are the source-of-truth
visual references (not production code) and where they map:

| Source | Contents | Maps to |
|---|---|---|
| `.figma/screens/styora_home_updated_{desktop,mobile}/` | `code.html` (raw Stitch markup, reference only — see the `figma-handoff` skill) + `screen.png` | `index.html` layout/mood reference |
| `.figma/screens/styora_collection_updated_{desktop,mobile}/` | same | `collection.html` layout/mood reference |
| `.figma/screens/styora_product_updated_{desktop,mobile}/` | same | `product.html` layout/mood reference |
| `.figma/products/professional_studio_product_shot_of_styora_<slug>/screen.png` | 15 studio product shots, one per SKU (§1.1) | optimize → `public/images/products/<slug>.{webp,avif}` |
| `.figma/banners/a_cinematic_..._hero_banner_.../screen.png` (landscape) | cinematic athlete-in-rain-lit-city hero photo | optimize → `public/images/hero/home-desktop.{webp,avif}` |
| `.figma/banners/a_cinematic_..._vertical_hero_banner_.../screen.png` | vertical crop of the same shoot | optimize → `public/images/hero/home-mobile.{webp,avif}` |

**Gap to resolve before Week 2, Day 13–14 (360° viewer):** only one static studio shot
exists per product — there is no image sequence. The PDP mockups show a "360° VIEW" /
"DRAG TO ROTATE" affordance but no actual frame set backs it. Before building
`viewer360.js`, either (a) generate/photograph a real frame sequence per hero product
and drop it in `public/images/360/<slug>/frame-001.webp…`, or (b) scope `viewer360.js`
down to a single-image tilt/parallax effect for the MVP and document the true
frame-by-frame spin as a stretch goal. Don't silently fake a "360°" label on a static
image — pick one of these two explicitly.

**Known inconsistencies across the generated screens** (expected — each screen was a
separate Stitch generation) to reconcile into one decision during build, not copied
as-is:
- **Logo color** — volt-green wordmark on `styora_home_updated_*` and
  `styora_product_updated_desktop`, plain white on `styora_collection_updated_*` and
  the `styora_product_updated_desktop` footer. Ship one consistent treatment (volt,
  per the brand voice in `DESIGN.md`).
- **Primary nav labels** — home shows `Men / Women / Shoes / Sale`, collection shows
  `Collections / Performance / Innovation / Journal`, product shows
  `Shop / Training / Lab / About`. Pick a single global nav (the spec's original
  `Men, Women, Shoes, Sale` from §12.2 is the simplest fit for the 3-page site) instead
  of per-page navigation.
- **Product names/prices** — see the ⚠️ note in §1.1; never trust exact strings shown
  in a given screen export.

---

## 6. BEM Convention Guide (Hướng dẫn quy ước BEM)

Rules you will follow and document in the README. (Các quy tắc bạn sẽ tuân theo và ghi vào README.)

```scss
// Block (Khối)
.product-card { }

// Element — double underscore (Phần tử — hai gạch dưới)
.product-card__media { }
.product-card__title { }
.product-card__price { }

// Modifier — double hyphen (Biến thể — hai gạch ngang)
.product-card--featured { }
.product-card__price--sale { }
```

- One block = one Sass partial file. (Một block = một file partial Sass.)
- No nesting deeper than the block using `&__` / `&--`. (Không lồng sâu quá mức block.)
- No IDs for styling; no element selectors inside components. (Không dùng ID để style; không dùng selector thẻ trong component.)
- Utility exceptions live in `_global.scss` (e.g. `.visually-hidden`). (Ngoại lệ dạng utility đặt trong `_global.scss`.)

```scss
// _product-card.scss — 3D tilt example (ví dụ thẻ nghiêng 3D)
.product-card {
  --tilt-x: 0deg;   // set by tilt.js via CSS var (JS ghi qua biến CSS)
  --tilt-y: 0deg;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transform-style: preserve-3d;
  transform: perspective(800px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transition: box-shadow .3s var(--ease-out-expo);

  &:hover { box-shadow: var(--shadow-lift), var(--glow-volt); }

  &__media { aspect-ratio: 4 / 5; object-fit: cover; transform: translateZ(40px); }
  &__title { font-size: 1rem; transform: translateZ(20px); }
  &__price {
    font-weight: 700;
    color: var(--color-volt);
    &--sale { color: var(--color-danger); }
  }
  &--featured { grid-column: span 2; }
}

@media (prefers-reduced-motion: reduce) {
  .product-card { transform: none; transition: none; }
}
```

---

## 7. Feature List (Danh sách tính năng)

### Landing page (Trang chủ)
1. Sticky header with scroll shadow + blur (Header dính có bóng & mờ nền khi cuộn) — `stickyHeader.js`
2. Mobile hamburger menu, keyboard accessible (Menu hamburger di động, dùng bàn phím) — `nav.js`
3. **3D parallax hero**: layered product + kinetic headline reacting to pointer/scroll (Hero parallax 3D nhiều lớp phản hồi con trỏ/cuộn) — `tilt.js`
4. **Kinetic marquee** brand strip (running text) (Dải chữ chạy động) — CSS only
5. Featured products grid with **3D tilt cards** (Lưới sản phẩm nổi bật với thẻ nghiêng 3D) — CSS Grid + `tilt.js`
6. Scroll-driven reveals & parallax (headings rise, images shift) (Reveal & parallax theo cuộn) — CSS `animation-timeline` + `scrollReveal.js` fallback
7. **Magnetic CTA buttons** + count-up stats (Nút CTA nam châm + đếm số liệu) — `magnetic.js`
8. Brand story / athlete testimonials section (Phần câu chuyện thương hiệu / vận động viên)
9. Newsletter form with JS validation (Form đăng ký với kiểm tra bằng JS)

### Collection page (Trang danh mục)
10. Responsive product grid: 2 → 3 → 4 columns, tilt cards (Lưới responsive 2→3→4 cột, thẻ nghiêng)
11. Client-side filter by category (tops / bottoms / outerwear / shoes / accessories — 5 categories, 3 SKUs each, see §1.1) + sort by price (Lọc theo danh mục + sắp xếp theo giá) — `filter.js`, data from local `products.json`. Note: the generated collection screens' sidebar only shows 4 categories (no Accessories filter chip) — add the 5th when building the real filter UI.
12. Animated filter transitions (FLIP-style layout shift) (Chuyển động khi lọc theo kiểu FLIP)

### Product page (Trang sản phẩm)
13. **360° product viewer**: drag / arrow-key spin, auto-spin on hover, reduced-motion fallback to static image (Trình xem 360° kéo/phím, tự xoay khi hover) — `viewer360.js`
14. Thumbnail gallery, keyboard navigable (Thư viện thumbnail điều hướng bằng bàn phím) — `gallery.js`
15. Variant picker UI — color swatches + size chips (visual only) (Chọn biến thể — mẫu màu + chip size)
16. Accordion for description / sizing / shipping / care (Accordion mô tả / size / vận chuyển / bảo quản) — `accordion.js`
17. Sticky "Add to cart" bar on mobile with volt CTA (Thanh "Thêm vào giỏ" dính trên di động)
18. JSON-LD `Product` schema in `<head>` (Schema Product dạng JSON-LD)

### SEO / a11y (toàn site)
19. Unique title + meta description per page; Open Graph tags (Title + meta riêng từng trang; thẻ Open Graph)
20. Responsive images: `srcset` + `sizes`, WebP/AVIF with fallback (Ảnh responsive, WebP/AVIF kèm fallback)
21. Skip-to-content link, visible focus states, ARIA where needed (Link bỏ qua điều hướng, focus rõ, ARIA khi cần)
22. **`prefers-reduced-motion`** disables all 3D/parallax/marquee (Tắt toàn bộ 3D/parallax khi người dùng yêu cầu) — required

---

## 8. Step-by-Step Build Plan — 3 Weeks (Kế hoạch từng bước — 3 tuần)

### Week 1 — Setup, Design System & Structure (Tuần 1 — Cài đặt, hệ thiết kế & cấu trúc)

**Day 1 (Ngày 1):** ✅ COMPLETED
- ✅ Create GitHub repo `styora`, README stub, `.gitignore`. (Tạo repo, README nháp, .gitignore.)
- ✅ `npm create vite@latest` (vanilla), install `sass`, configure multi-page build. (Khởi tạo Vite vanilla, cài sass, cấu hình đa trang.)
- ✅ First commit: `chore: scaffold vite project`. (Commit đầu theo conventional commits.)
- ✅ BONUS: Implemented full Sass architecture (abstracts/base/layout structure)
- ✅ BONUS: Created design tokens (_variables.scss) - STYORA Kinetic system
- ✅ BONUS: Set up JS module structure with utilities
- ✅ BONUS: Created HTML skeletons for all 3 pages
- ✅ BONUS: Verified dev server and production build

**Day 2 (Ngày 2):** ⚠️ PARTIALLY COMPLETED
- ✅ Generate the UI with **Stitch** using the prompt in §12, iterate, export to Figma. (Already done - see .figma/screens/)
- ✅ Lock the design system: implement `_variables.scss` tokens (color, type, space, motion). (Completed in Day 1)

**Day 3–4 (Ngày 3–4):**
- Write semantic HTML skeleton for all 3 pages — no styling yet. (Viết khung HTML ngữ nghĩa cho 3 trang.)
- Add meta tags, Open Graph, JSON-LD, skip link. (Thêm meta, Open Graph, JSON-LD, skip link.)
- Validate with W3C validator. (Kiểm tra W3C.)

**Day 5–7 (Ngày 5–7):**
- Build layout blocks: header (blur+shadow), footer, container, mobile nav. (Dựng header, footer, container, nav di động.)
- `nav.js` + `stickyHeader.js` as ES6 modules; set up `_mixins.scss` reduced-motion mixin. (Viết 2 module JS đầu; dựng mixin reduced-motion.)
- Test on Chrome, Safari, Firefox. (Kiểm thử 3 trình duyệt.)

**Milestone:** all pages navigable, design tokens live, header/footer done, mobile menu works. (Tất cả trang điều hướng được, token thiết kế xong, header/footer & menu di động chạy.)

### Week 2 — Pages, Features & Motion (Tuần 2 — Các trang, tính năng & chuyển động)

**Day 8–10 (Ngày 8–10):** Landing — 3D parallax hero, kinetic marquee, featured tilt-card grid, magnetic CTAs, count-up stats, testimonials, newsletter + validation. Write `tilt.js`, `magnetic.js`, `scrollReveal.js`. (Trang chủ + các module chuyển động.)

**Day 11–12 (Ngày 11–12):** Collection — product grid from `products.json`, filter + sort with `filter.js`, animated (FLIP) filter transitions, tilt cards. (Trang danh mục + lọc có chuyển động.)

**Day 13–14 (Ngày 13–14):** Product — **360° viewer** (`viewer360.js`), thumbnail gallery, variant picker, accordion, sticky add-to-cart bar. (Trang sản phẩm + trình xem 360°.)

**Milestone:** all features + motion functional on desktop & mobile, reduced-motion respected. (Toàn bộ tính năng & chuyển động chạy; tôn trọng reduced-motion.)

### Week 3 — Polish, QA & Deploy (Tuần 3 — Hoàn thiện, kiểm thử & triển khai)

**Day 15–16 (Ngày 15–16):**
- Responsive pass at 320 / 375 / 768 / 1024 / 1440 px. (Rà soát responsive.)
- Fluid type with `clamp()`; convert images to WebP/AVIF, add `srcset`; optimize 360° sequence (lazy-load, small frames). (Chữ co giãn; tối ưu ảnh & chuỗi 360°.)

**Day 17 (Ngày 17):**
- Cross-browser fixes — Safari (`transform-style` bugs, `100dvh`, backdrop-filter), reduced-motion path. (Sửa lỗi đa trình duyệt.)
- Keyboard-only walkthrough incl. 360° viewer arrow keys; fix focus traps. (Đi hết trang bằng bàn phím.)

**Day 18 (Ngày 18):**
- Lighthouse audits; iterate until Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95. (Chạy Lighthouse tới khi đạt mục tiêu.)
- Watch animation cost: prefer `transform`/`opacity`, `will-change` sparingly, avoid layout thrash. (Chú ý chi phí animation: dùng transform/opacity.)

**Day 19 (Ngày 19):**
- Deploy to Netlify (connect repo, `npm run build`, publish `dist/`). (Triển khai Netlify.)
- Deploy previews; custom subdomain e.g. `styora.netlify.app`. (Deploy preview; subdomain.)

**Day 20–21 (Ngày 20–21):**
- Write full README + record a short demo GIF/video showing the 3D motion. (Viết README + quay demo thể hiện chuyển động 3D.)
- Final self code review: naming, dead code, comments. (Tự review code lần cuối.)

---

## 9. QA / Definition of Done Checklist (Checklist hoàn thành)

### Infrastructure & Setup ✅
- [x] Repository initialized with proper .gitignore
- [x] README with comprehensive project overview
- [x] Vite build system configured for multi-page
- [x] Sass architecture set up (abstracts/base/layout/components/pages)
- [x] Design tokens implemented in _variables.scss
- [x] BEM methodology established
- [x] Conventional commits workflow
- [x] Dev server and production build verified

### HTML & Semantics 🚧
- [ ] W3C HTML validation passes on all pages (HTML hợp lệ theo W3C)
- [ ] Semantic HTML5 structure for all pages
- [ ] Meta tags and Open Graph on all pages
- [ ] JSON-LD schema on product page

### Performance & Quality 🚧
- [ ] Lighthouse: SEO ≥ 95, Accessibility ≥ 95, Performance ≥ 90 (Điểm Lighthouse đạt mục tiêu)
- [ ] Works on Chrome, Safari, Firefox — desktop & mobile (Chạy tốt trên 3 trình duyệt)
- [ ] No horizontal scroll at 320px width (Không tràn ngang ở 320px)
- [ ] Animations stay on `transform`/`opacity`; no jank at 60fps (Animation mượt 60fps)

### Accessibility 🚧
- [ ] All interactions usable by keyboard only (incl. 360° viewer) (Mọi tương tác dùng được bằng bàn phím)
- [ ] **`prefers-reduced-motion` disables all 3D/parallax/marquee** (Tắt hết chuyển động khi được yêu cầu)
- [ ] All images have `alt`; decorative images `alt=""` (Mọi ảnh có alt)
- [ ] Focus states visible and accessible
- [ ] Skip-to-content link functional

### Code Quality 🚧
- [ ] Every class name follows BEM; documented in README (Mọi class theo BEM)
- [ ] Zero jQuery / zero external JS libraries in the core build (Không jQuery / không thư viện JS ngoài ở phần lõi)
- [ ] Conventional commits throughout history (Commit theo chuẩn)

### Final Steps 🚧
- [ ] JSON-LD validates in Google Rich Results Test (JSON-LD hợp lệ)
- [ ] Live URL + repo link added to CV/portfolio (Đã thêm link live + repo)

---

## 10. README Outline — write in English (Dàn ý README — viết bằng tiếng Anh)

```
# STYORA — Performance Sportswear Store (Front-End Demo)
- Live demo | Screenshot/GIF of the 3D motion
- ✨ Features (semantic HTML5, SEO, responsive, a11y, 3D motion, vanilla JS)
- 🎨 Design system (STYORA Kinetic: dark + volt accent, kinetic type, motion tokens)
- 🛠 Tech stack (HTML5, Sass, BEM, ES6+ modules, CSS 3D, Vite, Netlify)
- 🧱 CSS architecture — BEM examples + Sass folder structure
- 📦 JS architecture — module list + responsibilities (tilt, viewer360, magnetic…)
- ♿ Motion & accessibility — prefers-reduced-motion strategy
- 🚀 Getting started (npm install / dev / build)
- 📈 Lighthouse scores (screenshot)
- 🌐 Browser support & testing notes
- 📝 What I learned
```

---

## 11. Git Workflow for This Project (Quy trình Git cho dự án)

- Branches: `main` (production) + `feat/*`, `fix/*` per task. (Nhánh main + nhánh theo tác vụ.)
- Even solo, open PRs and merge them — shows workflow habit on GitHub. (Dù làm một mình vẫn mở PR và merge.)
- Conventional commits: `feat: add 3d tilt card module`, `feat: 360 product viewer`, `fix: safari transform-style flatten`, `style: refactor hero to BEM`, `docs: add readme lighthouse scores`.

---

## 12. Stitch Prompt — Generate the Design (Prompt cho Stitch — tạo thiết kế)

> ✅ **Already done for this project.** The prompts below already produced the 6
> screens in `.figma/screens/`, the 15 product shots in `.figma/products/`, and the 2
> hero banners in `.figma/banners/` — see §5.1 for the asset map and the
> inconsistencies to reconcile. Kept here for provenance and in case a screen needs
> regenerating.

Paste the prompt below into **https://stitch.withgoogle.com** to generate the UI, then refine and export to Figma/CSS. Generate each screen separately for best results. (Dán prompt bên dưới vào **stitch.withgoogle.com** để tạo UI, rồi tinh chỉnh và xuất sang Figma/CSS. Nên tạo từng màn hình riêng.)

### 12.1 Master style prompt (Prompt phong cách gốc — dùng chung mọi màn hình)

```
Design a modern, high-energy e-commerce website for "STYORA", a premium performance
SPORTSWEAR brand (running, training and lifestyle apparel — tees, tights, jackets,
running shoes).

ART DIRECTION:
- Dark, athletic, futuristic. Near-black background (#0A0A0B) with raised charcoal
  surfaces (#141417). Bold "volt" lime-green accent (#CCFF00) for CTAs, prices and
  highlights; electric blue (#2E6BFF) as a secondary accent.
- Huge kinetic typography: condensed uppercase display headings (Anton / Archivo
  Expanded style) with tight letter spacing; clean Inter/Satoshi for body text.
- A sense of real depth and 3D: layered product shots with soft colored shadows and
  a subtle volt glow, product cards that look tiltable/floating, generous negative
  space, hairline borders, rounded 16px corners.
- Feel: premium, fast, sporty, Nike/On-Running meets a modern tech product page.
  NOT flat, NOT old-fashioned, NOT a generic template.

REQUIREMENTS:
- Fully responsive (design mobile and desktop).
- High contrast, accessible color choices, clear focus states.
- Use realistic sportswear product imagery and athlete lifestyle photography.
```

### 12.2 Screen-specific add-ons (Prompt riêng cho từng màn hình)

**Home / Landing (Trang chủ):**
```
Home page for STYORA. Sticky translucent blurred header with logo, nav (Men, Women,
Shoes, Sale) and a cart icon. Full-bleed 3D hero: a floating running shoe / athlete
with a giant kinetic headline like "MOVE FASTER" and a volt CTA button. Below: a
scrolling marquee brand strip, a "Featured" product grid of 3-4 floating tilt cards
(product image, name, price in volt), a bold brand-story / athlete testimonial band
with big numbers/stats, and a newsletter signup. Dark, cinematic, lots of motion cues.
```

**Collection / Category (Trang danh mục):**
```
Collection page for STYORA. Left or top filter bar (category: Tops, Bottoms, Outerwear,
Shoes; sort by price) with volt active states. Responsive product grid, 2-4 columns of
3D floating tilt cards on dark surfaces: product image, name, category tag, price in
volt, and a small sale badge in red where relevant. Clean, spacious, modern.
```

**Product detail / PDP (Trang chi tiết sản phẩm):**
```
Product detail page for a STYORA running jacket. Large product viewer on the left that
looks like a rotatable 360° 3D view with thumbnails below; on the right: product title,
volt price, star rating, color swatches, size chips, a big volt "Add to cart" button,
and an accordion for Description / Sizing / Shipping / Care. Sticky add-to-cart bar on
mobile. Dark, premium, depth with soft shadows and volt glow.
```

### 12.3 Tips (Mẹo)
- Generate one screen per prompt (master style + one add-on), then use Stitch's chat to refine ("more depth", "bigger headline", "add volt glow to CTA"). (Tạo từng màn hình rồi tinh chỉnh qua chat.)
- Ask Stitch to **export to Figma** or copy the generated HTML/CSS as a reference; rebuild with your own BEM + Sass so the code stays yours for the portfolio. (Xuất Figma hoặc lấy HTML/CSS làm tham chiếu; dựng lại bằng BEM + Sass của bạn.)
- Keep the volt accent and dark base consistent across all three screens. (Giữ màu volt & nền tối nhất quán.)

---

## 13. Stretch Goals — optional (Mục tiêu nâng cao — tùy chọn)

- **Real WebGL 3D hero** with Three.js or a Spline scene (rotatable shoe) — note the added dependency in the README. (Hero 3D WebGL thật bằng Three.js/Spline.)
- Light mode via `prefers-color-scheme` + CSS custom properties (keep volt accent). (Chế độ sáng.)
- View Transitions API for page navigation (progressive enhancement). (API View Transitions.)
- Simple cart drawer + badge with quantity stored in a memory module. (Ngăn kéo giỏ hàng + badge.)
- i18n: EN/VI language toggle — nice touch for a Vietnamese dev applying to international teams. (Nút chuyển ngôn ngữ EN/VI.)
