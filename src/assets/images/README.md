# Image Assets

## Current Status

✅ **All images copied from Figma exports** (`.figma/products/` and `.figma/banners/`)  
✅ **Renamed to match HTML references** (kebab-case naming)  
✅ **360° viewer frames created** (36 frames for Vortex Shell product)  
⚠️ **Images not yet optimized for web**

---

## Image Inventory

### Product Images (24 total)
- 15 primary products from Figma exports
- 9 placeholder variants (duplicates for missing SKUs)
- Located in: `src/assets/images/products/*.jpg`

### 360° Viewer (40 frames)
- 36 rotation frames (`frame-01.jpg` through `frame-36.jpg`)
- 4 thumbnail images (`thumb-01/09/17/25.jpg`)
- Located in: `src/assets/images/products/vortex-shell/`
- **Note:** Currently all frames are duplicates (placeholder). Replace with real 360° photo sequence.

### Banners (2 images)
- `hero-banner.png` — Horizontal hero banner (1920x1080)
- `hero-banner-vertical.png` — Vertical hero banner (1080x1920)
- Located in: `src/assets/images/banners/`

### Avatar (1 image)
- `avatar-sarah.jpg` — Testimonial avatar placeholder
- Located in: `src/assets/images/`

---

## ⚠️ Optimization Needed

Current images are **1-1.5 MB each** (PNG format from Figma). Total bundle is **~50 MB**.

### Recommended Optimizations

1. **Convert format**
   ```bash
   # Convert PNG to JPG (80-90% quality)
   # Or use WebP for modern browsers
   ```

2. **Resize dimensions**
   - Product images: max 800px width
   - Thumbnails: max 400px width
   - Hero banners: max 1920px width
   - Avatar: max 200px width

3. **Target sizes**
   - Product images: < 150 KB each
   - 360° frames: < 100 KB each
   - Banners: < 300 KB each
   - Avatar: < 50 KB
   - **Total target: < 5 MB** (10× reduction)

4. **Tools to use**
   ```bash
   # ImageMagick
   magick convert input.png -quality 85 -resize 800x output.jpg
   
   # Sharp (Node.js)
   npm install sharp --save-dev
   
   # Vite plugin
   npm install vite-plugin-imagemin --save-dev
   ```

---

## Image Mapping (Figma → HTML)

| Figma Export Name | HTML Reference | Status |
|------------------|----------------|--------|
| `styora_aero_knit_lightweight_performance` | `aero-knit.jpg` | ✅ Copied |
| `styora_aero_tights_premium_compression` | `aero-tights.jpg` | ✅ Copied |
| `styora_apex_backpack_technical_training` | `apex-backpack.jpg` | ✅ Copied |
| `styora_apex_trail_rugged_trail_running` | `apex-trail.jpg` | ✅ Copied |
| `styora_hydro_cap_performance_running_hat` | `hydro-cap.jpg` | ✅ Copied |
| `styora_kinetic_bottle_ergonomic_performance` | `kinetic-bottle.jpg` | ✅ Copied |
| `styora_kinetic_carbon_r1_elite_marathon` | `kinetic-carbon-r1.jpg` | ✅ Copied |
| `styora_kinetic_compression_long_sleeve_base` | `kinetic-compression.jpg` | ✅ Copied |
| `styora_strata_pant_tapered_performance` | `strata-pant.jpg` | ✅ Copied |
| `styora_strata_wind_ultralight_running` | `strata-wind.jpg` | ✅ Copied |
| `styora_thermo_shield_thermal_half_zip` | `thermo-shield.jpg` | ✅ Copied |
| `styora_v_strike_pro_training_sneaker` | `v-strike-pro.jpg` | ✅ Copied |
| `styora_velocity_shorts_lightweight_training` | `velocity-shorts.jpg` | ✅ Copied |
| `styora_volt_singlet_ultra_breathable_race` | `volt-singlet.jpg` | ✅ Copied |
| `styora_vortex_shell_premium_performance` | `vortex-shell.jpg` | ✅ Copied |
| *(missing)* | `pulse-tech.jpg` | 🔄 Placeholder |
| *(missing)* | `kinetic-shorts.jpg` | 🔄 Placeholder |
| *(missing)* | `performance-joggers.jpg` | 🔄 Placeholder |
| *(missing)* | `storm-vest.jpg` | 🔄 Placeholder |
| *(missing)* | `windbreak-hoodie.jpg` | 🔄 Placeholder |
| *(missing)* | `trail-max.jpg` | 🔄 Placeholder |
| *(missing)* | `velocity-trainer.jpg` | 🔄 Placeholder |
| *(missing)* | `kinetic-cap.jpg` | 🔄 Placeholder |
| *(missing)* | `performance-socks.jpg` | 🔄 Placeholder |

---

## Next Steps

1. **Optimize current images** — Reduce file sizes with ImageMagick/Sharp
2. **Replace 360° placeholders** — Get real 36-frame photo sequence
3. **Create missing products** — Design/photograph 9 missing SKUs
4. **Add WebP versions** — Modern format with better compression
5. **Implement lazy loading** — Already in HTML (`loading="lazy"`), verify it works

---

*Last updated: 2026-07-04*
