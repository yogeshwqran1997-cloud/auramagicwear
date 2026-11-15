/* =========================================================
   AURA MAGIC - site script
   Edit the CONFIG and PRODUCTS blocks to update the shop.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. SHOP SETTINGS (edit here) ---------- */
  const CONFIG = {
    brand: 'Aura Magic',
    whatsapp: '919384889111',            // country code + number, no + or spaces
    whatsappDisplay: '+91 93848 89111',
    email: 'auramagic26@gmail.com',
    instagramUser: 'auramagic_26',       // Instagram handle without @
    shareBase: '',   // website address used in the Share button's links. Empty = the address the site is on (right for any host). Or write your own domain, e.g. 'https://auramagic.in/'
    greeting: 'Hi Aura Magic! I would like to know more about your collection.'
  };

  /* ---------- 2. PRODUCTS (edit here) ----------
     set:    the product type shown under the name
     price:  e.g. '₹1,449'  (leave '' to show "Message us for price")
     sizes:  e.g. 'M to XXL'
     tags:   used by the filter buttons (Silk / Printed / Embroidered)
     img:    photo path, e.g. 'images/your-photo.webp'. Leave '' to show a coloured panel.
             When you add a photo also set w and h to its pixel size.
     aura:   [r, g, b] glow colour for this outfit
     To add an outfit: copy one block below and change its values.                  */
  const COMMON = { set: 'Cotton Maxi Frock', price: '₹1,449', sizes: 'M to XXL' };
  const SILK = { set: 'Raw Silk Kurti 3 Piece with Lining', price: '₹1,349', sizes: 'M to XXL' };
  const RAYON = { set: 'Rayon Maxi Frock', price: '₹1,249', sizes: 'S to XXL' };
  const RAYON_649 = { set: 'Rayon Maxi Frock', price: '₹649', sizes: 'M to XXL' };
  const RAYON_SHORT = { set: 'Rayon Short Maxi Frock', price: '₹1,099', sizes: 'S to 3XL' };
  const CHANDERI = { set: 'Mul Chanderi 3-Piece Set with Lining', price: '₹1,749', sizes: 'S to XXL' };
  const CHANDERI_2 = { set: 'Mul Chanderi 2-Piece Set with Lining', price: '₹1,699', sizes: 'M to XXL' };
  const NIGHTSUIT = (price, sizes) => ({ set: 'Korean Night Suit', price, sizes });
  const DABUCOORD = (price, sizes) => ({ set: 'Dabu Cotton 2-Piece Co-ord Set', price, sizes });
  const DABU = (price, sizes) => ({ set: 'Dabu Cotton 3 Piece Set', price, sizes });
  const COTTON6060 = (price, sizes) => ({ set: '60-60 Cotton 3-Piece Set with Lining', price, sizes });
  const VERTICAN = (price, sizes) => ({ set: 'Vertican 3 Piece Set', price, sizes });
  const ROMAN = (set, price, sizes) => ({ set, price, sizes });
  const CHINON = (sizes) => ({ set: 'Chinon 3-Piece Set', price: '₹1,299', sizes });
  const MULCOTTON = (price, sizes) => ({ set: 'Mul Cotton 3-Piece Set', price, sizes });
  const SHORTCOORD = (price, sizes) => ({ set: 'Cotton Short Co-ord Set', price, sizes });
  const COTTON3 = (price, sizes) => ({ set: 'Cotton 3-Piece Set', price, sizes });
  const RAYON_SET = (price, sizes) => ({ set: 'Rayon Kurta 2 Piece Set', price, sizes });
  const MAXI_699 = { set: 'Cotton Maxi Frock', price: '₹699', sizes: '3XL' };
  const BERLIN_MUSTARD = { set: 'Berlin Kurta 2 Piece Set', price: '₹699', sizes: 'M to XXL' };
  const BERLIN_LAVENDER = { set: 'Berlin Kurta 2 Piece Set', price: '₹699', sizes: 'XL, XXL' };
  const KTOP = { set: 'Cotton Kalamkari Top', price: '₹799', sizes: 'L, XL' };
  const RAYON_COORD = { set: 'Rayon Co-ord Set', price: '₹849', sizes: 'S to XXL' };
  const TOP_LINED = { set: 'Cotton Top with Lining', price: '₹849', sizes: 'S to XXL' };
  const CHANDERI_2B = { set: 'Mul Chanderi 2-Piece Set with Lining', price: '₹1,449', sizes: 'M to XXL' };
  const TOP = { set: 'Cotton Jean Top', price: '₹599', sizes: 'M, L' };
  const TOP_399 = { set: 'Cotton Jean Top', price: '₹399', sizes: 'M to XXL' };
  const COORD = { set: 'Cotton Kalamkari Co-ord Set', price: '₹799', sizes: 'M to XXL' };
  const PRODUCTS = [
    { ...COMMON, id: 'cream-bird', name: 'Garden Bird Maxi', colour: 'Cream multicolour', conic: true, tags: ['Printed'],
      hex: '#e8cfa6', aura: [226, 92, 92], img: 'images/cream-bird.webp', w: 900, h: 1350,
      alt: 'Model wearing a cream cotton maxi frock with a colourful bird and flower print along the hem',
      desc: 'A cream flared maxi with a vibrant folk print of birds, flowers and animals around the hem, an embroidered buttoned yoke and printed sleeves.' },
    { ...COMMON, id: 'rust-angrakha', name: 'Rust Angrakha Maxi', colour: 'Rust orange', tags: ['Embroidered'],
      hex: '#b8431f', aura: [214, 88, 40], img: 'images/rust-angrakha.webp', w: 900, h: 1200,
      alt: 'Model wearing a rust orange angrakha style cotton maxi frock with white embroidered hem',
      desc: 'A rust-orange angrakha-style maxi with a wrap-over neckline, delicate white embroidery along the edge and hem, and a flowing flared skirt.' },
    { ...COMMON, id: 'pink-rose', name: 'Rose Garden Maxi', colour: 'Baby pink', tags: ['Embroidered'],
      hex: '#f4a9c8', aura: [244, 130, 180], img: 'images/pink-rose.webp', w: 900, h: 1200,
      alt: 'Model wearing a baby pink cotton maxi frock with red rose motifs',
      desc: 'A soft pink maxi with a V-neck, rose motifs scattered across the bodice and skirt, and a flared tiered hem.' },
    { ...COMMON, id: 'golden-bloom', name: 'Golden Bloom Maxi', colour: 'Golden yellow', tags: ['Printed'],
      hex: '#d9b83a', aura: [225, 190, 55], img: 'images/golden-bloom.webp', w: 900, h: 1350,
      alt: 'Model wearing a golden yellow floral print cotton maxi frock',
      desc: 'A golden-yellow flared maxi in an all-over floral print with magenta blooms, a V-neck and a gathered waist.' },
    { ...COMMON, id: 'cocoa', name: 'Cocoa Embroidery Maxi', colour: 'Chocolate brown', tags: ['Embroidered'],
      hex: '#5a2f22', aura: [190, 110, 70], img: 'images/cocoa.webp', w: 900, h: 1350,
      alt: 'Model wearing a chocolate brown cotton maxi frock with floral embroidery and mirror work',
      desc: 'A rich chocolate-brown maxi with a V-neck, floral embroidery and mirror-work motifs on the yoke and skirt, and a full flare.' },
    { ...COMMON, id: 'green', name: 'Forest Green Maxi', colour: 'Bottle green', tags: ['Embroidered'],
      hex: '#3b5e2b', aura: [90, 160, 70], img: 'images/green.webp', w: 900, h: 1350,
      alt: 'Model wearing a bottle green cotton maxi frock with floral embroidery and mirror work',
      desc: 'A deep green flared maxi with embroidered flowers and mirror-work motifs, a V-neck yoke and small tassel accents.' },
    { ...COMMON, id: 'magenta', name: 'Magenta Mirror Maxi', colour: 'Magenta', tags: ['Embroidered'],
      hex: '#b01a73', aura: [220, 50, 150], img: 'images/magenta.webp', w: 900, h: 1350,
      alt: 'Model wearing a magenta cotton maxi frock with floral embroidery and mirror work',
      desc: 'A magenta flared maxi with embroidered flowers and mirror-work motifs, a V-neck yoke and playful tassel accents.' },
    { ...COMMON, id: 'red', name: 'Scarlet Embroidery Maxi', colour: 'Red', tags: ['Embroidered'],
      hex: '#d62e1c', aura: [240, 70, 45], img: 'images/red.webp', w: 900, h: 1350,
      alt: 'Model wearing a red cotton maxi frock with floral embroidery and mirror work',
      desc: 'A vivid red flared maxi with embroidered flowers and mirror-work motifs on the yoke and skirt.' },
    { ...COMMON, id: 'coral', name: 'Coral Patch Maxi', colour: 'Coral pink', tags: ['Embroidered'],
      hex: '#ee6f8d', aura: [250, 110, 140], img: 'images/coral.webp', w: 900, h: 1350,
      alt: 'Model wearing a coral pink cotton maxi frock with embroidered patch motifs',
      desc: 'A coral-pink maxi with embroidered patch motifs on the front and skirt, an embroidered yoke panel and a gathered flare.' },
    { ...SILK, id: 'raw-silk-green', name: 'Bottle Green Raw Silk Kurti', colour: 'Bottle green', tags: ['Silk'],
      hex: '#1f6b47', aura: [40, 150, 100], img: 'images/raw-silk-green.webp', w: 1000, h: 1776,
      alt: 'Model wearing a bottle green raw silk kurti with scallop neck, matching pants and a silver-border dupatta',
      desc: 'A bottle-green raw silk 3-piece set: a kurti with a stylish scallop neckline and elegant three-quarter sleeves, woven with tiny multicolour motifs, with matching pants and a dupatta with a silver border and tassels. Comes with lining.' },
    { ...SILK, id: 'raw-silk-blue', name: 'Royal Blue Raw Silk Kurti', colour: 'Royal blue', tags: ['Silk'],
      hex: '#2a47b0', aura: [60, 100, 235], img: 'images/raw-silk-blue.webp', w: 1000, h: 1773,
      alt: 'Model wearing a royal blue raw silk kurti with scallop neck, matching pants and a silver-border dupatta',
      desc: 'A royal-blue raw silk 3-piece set: a kurti with a stylish scallop neckline and elegant three-quarter sleeves, woven with tiny multicolour motifs, with matching pants and a dupatta with a silver border and tassels. Comes with lining.' },
    { ...RAYON, id: 'rayon-brown', name: 'Brown Paisley Rayon Maxi', colour: 'Brown and black print', tags: ['Printed'],
      hex: '#6b3a22', aura: [200, 120, 60], img: 'images/rayon-brown.webp', w: 1000, h: 1778,
      alt: 'Model wearing a brown and black paisley print rayon maxi frock with puff sleeves and a tiered frill',
      desc: 'A brown and black rayon maxi in a rich paisley print with a scallop neckline, elegant puff sleeves, a gathered waist and a flowy tiered bottom frill.' },
    { ...RAYON, id: 'rayon-maroon', name: 'Maroon Circle Print Rayon Maxi', colour: 'Maroon', tags: ['Printed'],
      hex: '#7a1f2b', aura: [200, 45, 70], img: 'images/rayon-maroon.webp', w: 1000, h: 1776,
      alt: 'Model wearing a maroon rayon maxi frock with block-print circle motifs, puff sleeves and a frill hem',
      desc: 'A deep maroon rayon maxi with bold block-print circle motifs, a scallop notch neckline, elegant puff sleeves and a flowy gathered skirt with a frill at the hem.' },
    { ...RAYON, id: 'rayon-wine', name: 'Wine Floral Rayon Maxi', colour: 'Wine purple', tags: ['Printed'],
      hex: '#4a1b4f', aura: [150, 65, 165], img: 'images/rayon-wine.webp', w: 1000, h: 1776,
      alt: 'Model wearing a wine purple rayon maxi frock with white and golden floral print, puff sleeves and a frill hem',
      desc: 'A wine-purple rayon maxi with white and golden floral prints, a scallop notch neckline, elegant puff sleeves and a flowy skirt with a bottom frill.' },
    { ...RAYON_SHORT, id: 'rayon-short-maroon', name: 'Maroon Floral Rayon Short Maxi', colour: 'Maroon', tags: ['Printed'],
      hex: '#8e1b33', aura: [205, 70, 90], img: 'images/rayon-short-maroon.webp', w: 1000, h: 1778,
      alt: 'Model wearing a maroon floral print rayon short maxi frock with puff sleeves and a tiered frill skirt',
      desc: 'A maroon rayon short maxi in a gold, white and teal floral print with a scallop V-neckline, elegant puff sleeves, a fitted waist and a flowy tiered bottom frill.' },
    { ...CHANDERI, id: 'chanderi-mauve', name: 'Mauve Floral Mul Chanderi', colour: 'Mauve purple', tags: ['Printed'],
      hex: '#a068a8', aura: [175, 110, 190], img: 'images/mul-chanderi-mauve.webp', w: 1000, h: 1773,
      alt: 'Model wearing a mauve purple floral print mul chanderi kurta set with matching pants and a flowy dupatta',
      desc: 'A three-piece mul chanderi set in mauve with a large floral print: a straight kurta with a scalloped sweetheart neckline and three-quarter sleeves, matching pants and a flowy printed dupatta with a striped border. Comes with lining.' },
    { ...TOP, id: 'top-white-blue', name: 'White Blue Blossom Cotton Top', colour: 'White with blue print', tags: ['Printed'],
      hex: '#2b7ba3', aura: [40, 130, 175], img: 'images/top-white-blue.webp', w: 1000, h: 1500,
      alt: 'Model wearing a white cotton top with blue floral and leaf motifs, a notched neckline and three-quarter sleeves',
      desc: 'A white cotton top with large blue floral and leaf motifs, a notched neckline and relaxed three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP, id: 'top-red-kalamkari', name: 'Red Kalamkari Cotton Top', colour: 'Red with yellow print', tags: ['Printed'],
      hex: '#9c1f26', aura: [205, 50, 60], img: 'images/top-red-kalamkari.webp', w: 1000, h: 1778,
      alt: 'Model wearing a red cotton top with a yellow and grey kalamkari-style elephant and flower print, with blue jeans',
      desc: 'A red cotton top in a kalamkari-style print of elephants, dancers and sunflowers in yellow and grey, with a notched neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP, id: 'top-cats', name: 'Cute Cats Print Cotton Top', colour: 'Off-white with multicolour print', tags: ['Printed'],
      hex: '#d9a63a', aura: [215, 165, 60], img: 'images/top-cats.webp', w: 1000, h: 1778,
      alt: 'Model wearing an off-white cotton top with a playful multicolour cat print, with blue jeans',
      desc: 'An off-white cotton top covered in playful cats in mustard, teal and brown, with a notched neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP, id: 'top-maroon-yoke', name: 'Maroon Peacock Yoke Cotton Top', colour: 'Maroon', tags: ['Printed'],
      hex: '#7a1a2a', aura: [190, 45, 75], img: 'images/top-maroon-yoke.webp', w: 1000, h: 1778,
      alt: 'Model wearing a maroon cotton top with a blue and red peacock and elephant print yoke, with blue jeans',
      desc: 'A maroon cotton top with a gathered flare and a printed yoke of peacocks and elephants in blue and red, with a notched neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP, id: 'top-mustard-ikat', name: 'Mustard Ikat Cotton Top', colour: 'Mustard yellow', tags: ['Printed'],
      hex: '#c8960f', aura: [225, 172, 35], img: 'images/top-mustard-ikat.webp', w: 1000, h: 1778,
      alt: 'Model wearing a mustard yellow cotton top with large ikat-style motifs in cream, teal and black, with beige pants',
      desc: 'A mustard-yellow cotton top with bold ikat-style motifs in cream, teal and black, with a notched neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-navy-floral', name: 'Navy Red Floral Cotton Top', colour: 'Navy blue with red print', tags: ['Printed'],
      hex: '#22356b', aura: [70, 100, 210], img: 'images/top2-navy-floral.webp', w: 1000, h: 1776,
      alt: 'Model wearing a navy blue cotton top with a red and white floral print and beige pants',
      desc: 'A navy-blue cotton top in a dense red and white floral print, with a notched V-neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-olive-faces', name: 'Olive Green Block-Print Cotton Top', colour: 'Olive green', tags: ['Printed'],
      hex: '#a3ab2a', aura: [165, 178, 50], img: 'images/top2-olive-faces.webp', w: 1000, h: 1778,
      alt: 'Model wearing an olive green cotton top with a cream block-print figure motif and blue jeans',
      desc: 'An olive-green cotton top with a bold cream block print of crowned figure motifs, a scalloped sweetheart neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-folk-white', name: 'Folk Art Print Cotton Top', colour: 'White with multicolour print', tags: ['Printed'],
      hex: '#3c8f9a', aura: [60, 155, 165], img: 'images/top2-folk-white.webp', w: 1000, h: 1778,
      alt: 'Model wearing a white cotton top with a colourful folk-art print in teal, purple and orange with blue pants',
      desc: 'A white cotton top with a playful folk-art print in teal, purple and orange, a notched neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-purple-motif', name: 'Purple Ornate Motif Cotton Top', colour: 'Purple', tags: ['Printed'],
      hex: '#5b2160', aura: [155, 75, 175], img: 'images/top2-purple-motif.webp', w: 1000, h: 1778,
      alt: 'Model wearing a purple cotton top with cream and gold ornate motifs and beige pants',
      desc: 'A deep purple cotton top with ornate cream and gold chandelier motifs, a sweetheart neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-wine-buddha', name: 'Wine Buddha Print Cotton Top', colour: 'Wine', tags: ['Printed'],
      hex: '#7b1f4d', aura: [180, 55, 115], img: 'images/top2-wine-buddha.webp', w: 1000, h: 1778,
      alt: 'Model wearing a wine coloured cotton top with a cream Buddha face print and beige pants',
      desc: 'A wine-coloured cotton top with cream Buddha face motifs, a sweetheart neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...TOP_399, id: 'top2-maroon-ajrakh', name: 'Maroon Ajrakh Print Cotton Top', colour: 'Maroon with grey print', tags: ['Printed'],
      hex: '#6b2a35', aura: [160, 75, 90], img: 'images/top2-maroon-ajrakh.webp', w: 1000, h: 1778,
      alt: 'Model wearing a maroon cotton top with a grey and cream geometric ajrakh-style print and blue jeans',
      desc: 'A maroon cotton top in a geometric ajrakh-style print of grey and cream motifs, a sweetheart V-neckline and three-quarter sleeves. Sold as a top; the jeans or pants shown are for styling.' },
    { ...COORD, id: 'coord-red-kalamkari', name: 'Red Kalamkari Co-ord', colour: 'Red', tags: ['Printed'],
      hex: '#b01e2c', aura: [215, 45, 60], img: 'images/coord-red-kalamkari.webp', w: 1000, h: 1776,
      alt: 'Model wearing a red printed cotton two-piece co-ord set with a paisley border kurta and matching palazzo pants',
      desc: 'A red cotton two-piece co-ord set: a below-knee kurta with a scalloped neckline, elegant sleeves and a paisley (mango) border, paired with matching printed palazzo pants.' },
    { ...RAYON_649, id: 'rayon-red-diamond', name: 'Red Diamond Print Rayon Maxi', colour: 'Red', tags: ['Printed'],
      hex: '#a8231f', aura: [218, 52, 45], img: 'images/rayon-red-diamond.webp', w: 1000, h: 1776,
      alt: 'Model wearing a red rayon maxi frock with a small white diamond print, puff sleeves and a tiered frill skirt',
      desc: 'A red rayon maxi with a small white and black diamond print, a scalloped sweetheart neckline, elegant puff sleeves, a gathered waist and a flowy tiered bottom frill.' },
    { ...CHANDERI_2, id: 'chanderi-purple', name: 'Purple Medallion Mul Chanderi', colour: 'Purple', tags: ['Printed'],
      hex: '#5a2a9a', aura: [140, 85, 220], img: 'images/chanderi-purple.webp', w: 1000, h: 1500,
      alt: 'Model wearing a purple mul chanderi kurta with a lilac and pink medallion print and matching purple pants',
      desc: 'A two-piece mul chanderi set: a purple kurta with a lilac and pink medallion print, a notched V-neckline, three-quarter sleeves and side slits, with matching purple pants. Comes with lining.' },
    { ...CHANDERI_2B, id: 'chanderi-navy-lily', name: 'Navy Lily Floral Mul Chanderi', colour: 'Navy blue', tags: ['Printed'],
      hex: '#1e2f6b', aura: [85, 105, 220], img: 'images/chanderi-navy-lily.webp', w: 1000, h: 1500,
      alt: 'Model wearing a navy blue mul chanderi kurta with large pink and lilac lily flowers and matching navy pants',
      desc: 'A navy-blue two-piece mul chanderi set with large pink and lilac lily blooms and green leaf sprays: a kurta with a notched V-neckline, three-quarter sleeves and side slits, with matching navy pants. Comes with lining.' },
    { ...CHANDERI_2B, id: 'chanderi-orange-lily', name: 'Orange Lily Floral Mul Chanderi', colour: 'Orange', tags: ['Printed'],
      hex: '#d9532c', aura: [238, 110, 55], img: 'images/chanderi-orange-lily.webp', w: 1000, h: 1500,
      alt: 'Model wearing an orange mul chanderi kurta with large peach and grey-blue lily flowers and matching orange pants',
      desc: 'An orange two-piece mul chanderi set with large peach and grey-blue lily blooms and golden leaf sprays: a kurta with a V-neckline, three-quarter sleeves and side slits, with matching orange pants. Comes with lining.' },
    { ...TOP_LINED, id: 'lined-blue-diamond', name: 'Blue Diamond Motif Cotton Top', colour: 'Blue', tags: ['Printed'],
      hex: '#1b6aa8', aura: [45, 135, 215], img: 'images/lined-blue-diamond.webp', w: 1000, h: 1500,
      alt: 'Model wearing a royal blue cotton top with small white diamond motifs and puff sleeves',
      desc: 'A royal-blue cotton top with small white diamond motifs, a notched round neckline and statement puff sleeves. Comes with lining.' },
    { ...TOP_LINED, id: 'lined-rust-motif', name: 'Rust Red Motif Cotton Top', colour: 'Rust red', tags: ['Printed'],
      hex: '#b23a22', aura: [215, 85, 50], img: 'images/lined-rust-motif.webp', w: 1000, h: 1500,
      alt: 'Model wearing a rust red cotton top with cream tassel-shaped motifs and a V-neckline',
      desc: 'A rust-red cotton top with cream tassel-shaped motifs, a clean V-neckline and elbow-length sleeves with a gently puffed shoulder. Comes with lining.' },
    { ...TOP_LINED, id: 'lined-berry-geo', name: 'Berry Pink Geometric Cotton Top', colour: 'Berry pink', tags: ['Printed'],
      hex: '#a8284e', aura: [205, 65, 105], img: 'images/lined-berry-geo.webp', w: 1000, h: 1500,
      alt: 'Model wearing a berry pink geometric print cotton top with puff sleeves and white pants',
      desc: 'A berry-pink cotton top in an all-over geometric print with a V-neckline, puff sleeves and side slits. Comes with lining. Sold as a top; the pants shown are for styling.' },
    { ...RAYON_COORD, id: 'rayon-coord-wine', name: 'Wine Abstract Print Rayon Co-ord', colour: 'Wine purple', tags: ['Printed'],
      hex: '#4e1d4f', aura: [155, 62, 160], img: 'images/rayon-coord-wine.webp', w: 1000, h: 1778,
      alt: 'Model wearing a wine purple rayon co-ord set with a red, cream and black abstract print and matching palazzo pants',
      desc: 'A wine-purple rayon two-piece co-ord set with a bold abstract brush-stroke print in red, cream and black: a straight kurta with a scalloped neckline and three-quarter sleeves, with matching palazzo pants.' },
    { ...RAYON_COORD, id: 'rayon-coord-pink', name: 'Pink Tulip Print Rayon Co-ord', colour: 'Pink', tags: ['Printed'],
      hex: '#d6285c', aura: [238, 62, 112], img: 'images/rayon-coord-pink.webp', w: 1000, h: 1778,
      alt: 'Model wearing a pink rayon co-ord set with a white tulip print and matching striped palazzo pants',
      desc: 'A bright pink rayon two-piece co-ord set with a white tulip print: a straight kurta with a scalloped neckline and three-quarter sleeves, with matching striped palazzo pants.' },
    { ...RAYON_COORD, id: 'rayon-coord-green', name: 'Bottle Green Floral Rayon Co-ord', colour: 'Bottle green', tags: ['Printed'],
      hex: '#4f6b2e', aura: [105, 155, 60], img: 'images/rayon-coord-green.webp', w: 1000, h: 1778,
      alt: 'Model wearing a bottle green rayon co-ord set with white floral motifs and matching printed palazzo pants',
      desc: 'A bottle-green rayon two-piece co-ord set with white floral motifs: a straight kurta with a scalloped neckline and three-quarter sleeves, with matching printed palazzo pants.' },
    { ...RAYON_COORD, id: 'rayon-coord-coral', name: 'Coral Floral Rayon Co-ord', colour: 'Coral and cream', tags: ['Printed'],
      hex: '#e0605a', aura: [238, 100, 92], img: 'images/rayon-coord-coral.webp', w: 1000, h: 1778,
      alt: 'Model wearing a coral, red and cream floral print rayon co-ord set with maroon striped palazzo pants',
      desc: 'A rayon two-piece co-ord set in a coral, red and cream floral print: a kurta with a notched neckline, three-quarter sleeves and side slits, with matching maroon striped palazzo pants.' },
    { ...KTOP, id: 'ktop-red-camel', name: 'Red Camel Block Print Cotton Top', colour: 'Red', tags: ['Printed'],
      hex: '#a8202c', aura: [215, 52, 58], img: 'images/ktop-red-camel.webp', w: 1000, h: 1500,
      alt: 'Model wearing a red cotton top with a block print of black camels in a patchwork style, with cream pants',
      desc: 'A red cotton top in a patchwork-style block print of black camels alternating with geometric panels, with a round neckline and three-quarter sleeves. Sold as a top; the pants shown are for styling.' },
    { ...KTOP, id: 'ktop-maroon-horse', name: 'Maroon Kalamkari Horse Yoke Cotton Top', colour: 'Maroon', tags: ['Printed'],
      hex: '#7a1a2a', aura: [192, 48, 72], img: 'images/ktop-maroon-horse.webp', w: 1000, h: 1500,
      alt: 'Model wearing a maroon cotton top with a blue and red kalamkari-style horse and elephant yoke, with cream pants',
      desc: 'A maroon cotton top with a kalamkari-style yoke of horses and elephants in blue and red, a scalloped neckline and matching printed sleeve cuffs. Sold as a top; the pants shown are for styling.' },
    { ...KTOP, id: 'ktop-red-elephant', name: 'Red Elephant Print Cotton Top', colour: 'Red', tags: ['Printed'],
      hex: '#b4222f', aura: [222, 58, 62], img: 'images/ktop-red-elephant.webp', w: 1000, h: 1500,
      alt: 'Model wearing a red cotton top with a block print of black and blush elephants, with cream pants',
      desc: 'A red cotton top with a block print of black and blush elephants, a notched V-neckline and three-quarter sleeves. Sold as a top; the pants shown are for styling.' },
    { ...KTOP, id: 'ktop-maroon-ikat', name: 'Maroon Ikat Patch Cotton Top', colour: 'Maroon', tags: ['Printed'],
      hex: '#6d1c26', aura: [185, 48, 72], img: 'images/ktop-maroon-ikat.webp', w: 1000, h: 1500,
      alt: 'Model wearing a maroon cotton top with colourful ikat-style yoke, cuffs and diamond patches, with cream pants',
      desc: 'A maroon cotton top with a colourful ikat-style yoke, cuffs and diamond patch details, a sweetheart V-neckline and three-quarter sleeves. Sold as a top; the pants shown are for styling.' },
    { ...KTOP, id: 'ktop-maroon-bird', name: 'Maroon Kalamkari Bird Yoke Cotton Top', colour: 'Maroon', tags: ['Printed'],
      hex: '#7a1f2d', aura: [196, 52, 74], img: 'images/ktop-maroon-bird.webp', w: 1000, h: 1500,
      alt: 'Model wearing a maroon cotton top with a kalamkari-style bird and flower yoke in red, blue and cream, with cream pants',
      desc: 'A maroon cotton top with a kalamkari-style yoke of birds and flowers in red, blue and cream, a notched neckline and matching printed cuffs. Sold as a top; the pants shown are for styling.' },
    { ...KTOP, set: 'Cotton Kalamkari 3 Piece Set', price: '₹1,649', sizes: 'L, XL', id: 'ktop-red-cross', name: 'Red Cross Motif Cotton Kalamkari', colour: 'Red', tags: ['Printed'],
      hex: '#b5252a', aura: [222, 56, 56], img: 'images/ktop-red-cross.webp', w: 1000, h: 1773,
      alt: 'Model wearing a red cotton kurta with a cream cross and geometric print, matching printed pants and a flowy printed dupatta',
      desc: 'A red cotton kalamkari three-piece set: a kurta in an all-over cream cross and geometric print with a scalloped notch neckline and three-quarter sleeves, matching printed pants and a flowy bordered dupatta.' },
    { ...BERLIN_LAVENDER, id: 'berlin-lavender', name: 'Lavender Ikat Print Berlin Kurta', colour: 'Lavender', tags: ['Printed'],
      hex: '#a77ad0', aura: [168, 125, 228], img: 'images/berlin-lavender.webp', w: 1000, h: 1778,
      alt: 'Model wearing a lavender kurta with a white, coral and tan ikat-inspired print and matching lavender pants',
      desc: 'A lavender Berlin 2-piece set: a kurta with a bold ikat-inspired print in white, coral and tan, a mandarin collar with a button placket and three-quarter sleeves, with matching lavender pants.' },
    { ...BERLIN_MUSTARD, id: 'berlin-mustard', name: 'Mustard Folk-Print Berlin Kurta', colour: 'Mustard', tags: ['Printed'],
      hex: '#eeb81b', aura: [248, 192, 42], img: 'images/berlin-mustard.webp', w: 1000, h: 1778,
      alt: 'Model wearing a mustard yellow kurta with a white folk-art leaf and vine print and matching pants',
      desc: 'A mustard Berlin 2-piece set: a kurta with a white folk-art print of leaves and vines, a collar neckline with buttons, three-quarter sleeves and side slits, with matching mustard pants.' },
    { ...MAXI_699, id: 'maxi-navy-motif', name: 'Navy Folk Motif Cotton Maxi', colour: 'Navy blue', tags: ['Printed'],
      hex: '#1c2c5e', aura: [75, 105, 215], img: 'images/maxi-navy-motif.webp', w: 1000, h: 1778,
      alt: 'Model wearing a navy blue cotton maxi frock with a cream folk motif print, puff sleeves and a tiered frill skirt',
      desc: 'A navy-blue cotton maxi frock with a cream folk-motif print, a V-neckline, puff sleeves, a gathered waist and a flowy tiered skirt with a frill hem.' },
    { ...RAYON_SET('₹599', 'M, XL, XXL'), id: 'rayon-set-navy', name: 'Navy Blue Arrow Ikat Rayon', colour: 'Navy blue', tags: ['Printed'],
      hex: '#1e2f6b', aura: [85, 105, 220], img: 'images/rayon-set-navy.webp', w: 1000, h: 1778,
      alt: 'Model wearing a navy blue rayon kurta with a white arrow-motif ikat print and matching printed pants',
      desc: 'A navy-blue rayon kurta with an all-over white arrow-motif ikat print, a V-neckline with striped trim and three-quarter sleeves, with matching printed pants.' },
    { ...RAYON_SET('₹599', 'L to XXL'), id: 'rayon-set-olive', name: 'Olive Green Ikat Rayon', colour: 'Olive green', tags: ['Printed'],
      hex: '#a9b82a', aura: [185, 200, 50], img: 'images/rayon-set-olive.webp', w: 1000, h: 1778,
      alt: 'Model wearing an olive green rayon kurta with a subtle white ikat arrow print and matching pants',
      desc: 'An olive-green rayon kurta with a subtle white ikat arrow print, a V-neckline and three-quarter sleeves, with matching pants.' },
    { ...RAYON_SET('₹599', 'XXL'), id: 'rayon-set-orange', name: 'Orange Leaf Motif Rayon', colour: 'Orange', tags: ['Printed'],
      hex: '#e0452c', aura: [238, 88, 55], img: 'images/rayon-set-orange.webp', w: 1000, h: 1778,
      alt: 'Model wearing an orange red rayon kurta with white leaf motifs and matching printed pants',
      desc: 'An orange rayon kurta with white leaf motifs, a V-neckline with striped trim and three-quarter sleeves, with matching printed pants.' },
    { ...RAYON_SET('₹466', 'L to XXL'), id: 'rayon-set-teal', name: 'Blue Floral Rayon Set with White Pants', colour: 'Blue with white pants', tags: ['Printed'],
      hex: '#13708a', aura: [28, 150, 192], img: 'images/rayon-set-teal.webp', w: 1000, h: 1249,
      alt: 'Model wearing a teal blue floral print rayon kurta with cream pants in a small blue motif print',
      desc: 'A teal-blue rayon kurta in an all-over floral print with a notched neckline, button detail and three-quarter sleeves, with white pants in a small blue motif print.' },
    { ...COTTON3('₹1,049', 'M to XXL'), id: 'cotton3-blue', name: 'Navy Blue Floral Motif Cotton', colour: 'Blue', tags: ['Printed'],
      hex: '#1a2a78', aura: [72, 98, 228], img: 'images/cotton3-blue.webp', w: 750, h: 2000,
      alt: 'Model wearing a navy blue cotton three-piece set with a large white floral motif on the kurta, palazzo pants and a dupatta',
      desc: 'A navy-blue cotton three-piece set: a kurta with a large white floral motif and a round neckline, matching palazzo pants and a flowy dupatta with small leaf motifs.' },
    { ...COTTON3('₹1,049', 'M, L'), id: 'cotton3-brick', name: 'Brick Floral Motif Cotton', colour: 'Brick', tags: ['Printed'],
      hex: '#b5442b', aura: [226, 98, 62], img: 'images/cotton3-brick.webp', w: 750, h: 2000,
      alt: 'Model wearing a brick red cotton three-piece set with a large white floral motif on the kurta, palazzo pants and a dupatta',
      desc: 'A brick-coloured cotton three-piece set: a kurta with a large white floral motif and a round neckline, matching palazzo pants and a flowy dupatta with small leaf motifs.' },
    { ...COTTON3('₹1,099', 'XXL'), id: 'cotton3-red', name: 'Red Bandhani Cotton', colour: 'Red', tags: ['Printed'],
      hex: '#d6195a', aura: [236, 52, 112], img: 'images/cotton3-red.webp', w: 1000, h: 1778,
      alt: 'Model wearing a bright red-pink bandhani style cotton three-piece set with white dot and floral motifs, pants and a dupatta',
      desc: 'A bright cotton three-piece set in a bandhani-style print of white dots and floral motifs: a kurta with a round neckline and tassel detail, matching pants and a dupatta.' },
    { ...SHORTCOORD('₹699', 'XL'), id: 'shortcoord-white', name: 'White Floral Border Cotton Short Co-ord', colour: 'White', tags: ['Printed'],
      hex: '#d9c9b0', aura: [236, 112, 125], img: 'images/shortcoord-white.webp', w: 1000, h: 1249,
      alt: 'Model wearing a white cotton short co-ord set with fine stripes and a pink and red floral medallion border, with wide palazzo pants',
      desc: 'A lightweight cotton short co-ord set in white with fine stripes and a rose-pink floral medallion border: a short kurta with a notched collar, button placket and three-quarter sleeves, with matching wide palazzo pants.' },
    { ...SHORTCOORD('₹799', 'M to XXL'), id: 'shortcoord-maroon', name: 'Maroon Floral Yoke Cotton Short Co-ord', colour: 'Maroon', tags: ['Printed'],
      hex: '#7a1a2a', aura: [192, 48, 72], img: 'images/shortcoord-maroon.webp', w: 1000, h: 1778,
      alt: 'Model wearing a maroon cotton short co-ord set with a white floral yoke and cuffs and wide-leg pants',
      desc: 'A maroon cotton short co-ord set with white floral yoke panels and cuffs: a gathered short top with a mandarin collar and button placket, with matching wide-leg pants.' },
    { ...SHORTCOORD('₹799', ''), id: 'shortcoord-green', name: 'Green Floral Yoke Cotton Short Co-ord', colour: 'Green', tags: ['Printed'],
      hex: '#1f5a2a', aura: [62, 152, 82], img: 'images/shortcoord-green.webp', w: 1000, h: 1778,
      alt: 'Model wearing a green cotton short co-ord set with a white floral yoke and cuffs and wide-leg pants',
      desc: 'A green cotton short co-ord set with white floral yoke panels and cuffs: a gathered short top with a mandarin collar and button placket, with matching wide-leg pants.' },
    { ...MULCOTTON('₹1,199', 'L, XXL'), id: 'mulcotton-violet', name: 'Violet Elephant Yoke Mul Cotton', colour: 'Violet', tags: ['Printed'],
      hex: '#4a2fa0', aura: [105, 85, 228], img: 'images/mulcotton-violet.webp', w: 1000, h: 1250,
      alt: 'Model wearing a violet mul cotton three-piece set with white elephant motifs on the yoke, white diamond motifs, pants and a lace border dupatta',
      desc: 'A violet mul cotton three-piece set: a gathered kurta with a notched neckline and a white elephant yoke, scattered white diamond motifs, matching pants and a dupatta with a white lace border.' },
    { ...MULCOTTON('₹1,199', 'L'), id: 'mulcotton-peach', name: 'Peach Orange Floral Mul Cotton', colour: 'Peach orange', tags: ['Printed'],
      hex: '#f08060', aura: [246, 125, 98], img: 'images/mulcotton-peach.webp', w: 1000, h: 1778,
      alt: 'Model wearing a white mul cotton three-piece set with large peach orange and pink lily prints, white pants and a printed dupatta',
      desc: 'A mul cotton three-piece set in white with large peach-orange and pink lily prints: a gathered flared kurta with a round neckline and sparkling trim, white pants and a printed dupatta.' },
    { ...CHINON('L to XXL'), id: 'chinon-purple', name: 'Purple Ombre Paisley Chinon', colour: 'Purple', tags: ['Printed'],
      hex: '#5a1f5e', aura: [152, 62, 165], img: 'images/chinon-purple.webp', w: 1000, h: 1250,
      alt: 'Model wearing a purple ombre chinon three-piece set with paisley motifs, a floral placket, a multicolour border, purple pants and a gradient dupatta with pearl trim',
      desc: 'A purple ombre chinon three-piece set: a straight kurta with a purple-to-copper gradient, paisley motifs, a floral-embellished placket and a multicolour border with pearl drops, matching purple pants and a gradient paisley dupatta with pearl-drop trim.' },
    { ...CHINON('M to XXL'), id: 'chinon-yellow', name: 'Mustard Mehrab Chinon', colour: 'Yellow', tags: ['Printed'],
      hex: '#d9a21c', aura: [242, 172, 42], img: 'images/chinon-yellow.webp', w: 1000, h: 1250,
      alt: 'Model wearing a mustard chinon three-piece set with an orange mirror-work mehrab front panel, printed borders, mustard pants and a tasselled printed dupatta',
      desc: 'A mustard chinon three-piece set: a straight kurta with an orange mirror-work front panel and mehrab arch motif, bold printed borders and a beaded hem, with matching mustard pants and a printed dupatta with tassels.' },
    { ...CHINON('XL'), id: 'chinon-pink', name: 'Pink Multicolour Mehrab Chinon', colour: 'Pink', tags: ['Printed'],
      hex: '#c2185b', aura: [218, 52, 122], img: 'images/chinon-pink.webp', w: 1000, h: 1281,
      alt: 'Model wearing a pink chinon three-piece set with a multicolour mehrab style printed panel, pink pants and a printed dupatta with teal tassels',
      desc: 'A pink chinon three-piece set with a bold mehrab-style printed panel in olive, orange and teal, a multicolour border with a pearl-drop hem, matching pink pants and a printed dupatta with teal tassels.' },
    { ...COTTON3('₹799', 'M'), id: 'cotton3-lace-pink', name: 'Pink Floral Lace Cotton', colour: 'Pink', tags: ['Printed'],
      hex: '#e0607e', aura: [234, 102, 132], img: 'images/cotton3-lace-pink.webp', w: 1000, h: 1778,
      alt: 'Model wearing a pink cotton three-piece set with a large cream floral print, lace trim, printed pants and a printed dupatta',
      desc: 'A pink cotton three-piece set with a large cream floral print: a kurta with a lace-trimmed V-neckline, sleeves and hem, matching printed pants and a printed dupatta with lace edging.' },
    { ...COTTON3('₹799', 'L, XL'), id: 'cotton3-lace-yellow', name: 'Mustard Floral Lace Cotton', colour: 'Yellow', tags: ['Printed'],
      hex: '#d9a21c', aura: [238, 178, 42], img: 'images/cotton3-lace-yellow.webp', w: 1000, h: 1778,
      alt: 'Model wearing a mustard yellow cotton three-piece set with a large cream floral print, lace trim, printed pants and a printed dupatta',
      desc: 'A mustard-yellow cotton three-piece set with a large cream floral print: a kurta with a lace-trimmed V-neckline, sleeves and hem, matching printed pants and a printed dupatta with lace edging.' },
    { ...COTTON3('₹799', 'L'), id: 'cotton3-lace-green', name: 'Teal Green Floral Lace Cotton', colour: 'Green', tags: ['Printed'],
      hex: '#13a39b', aura: [32, 182, 172], img: 'images/cotton3-lace-green.webp', w: 1000, h: 1778,
      alt: 'Model wearing a teal green cotton three-piece set with a large white floral print, lace trim, printed pants and a printed dupatta',
      desc: 'A teal-green cotton three-piece set with a large white floral print: a kurta with a lace-trimmed V-neckline, sleeves and hem, matching printed pants and a printed dupatta with lace edging.' },
    { ...ROMAN('Roman Silk Short Top 3 Piece Set', '₹1,899', 'L to XXL'), id: 'roman-silk-pink', name: 'Pink Floral Embroidered Roman Silk Short Top', colour: 'Pink', tags: ['Embroidered'],
      hex: '#f1b4cc', aura: [240, 150, 192], img: 'images/roman-silk-pink.webp', w: 1000, h: 1778,
      alt: 'Model wearing a pale pink Roman silk short top with floral embroidery, matching palazzo pants and a lightly embroidered dupatta',
      desc: 'A pale-pink Roman silk short top with floral embroidery and an embroidered placket on a round neckline. Shown with matching palazzo pants and a lightly embroidered dupatta.' },
    { ...ROMAN('Roman Gloss 3 Piece Set', '₹1,799', 'XXL'), id: 'roman-gloss-purple', name: 'Purple Floral Dupatta Roman Gloss', colour: 'Purple', tags: ['Printed'],
      hex: '#7a2a62', aura: [172, 72, 152], img: 'images/roman-gloss-purple.webp', w: 1000, h: 1778,
      alt: 'Model wearing a purple Roman gloss kurta with an embroidered yoke, matching pants and a sheer pastel floral dupatta',
      desc: 'A purple Roman gloss kurta with a V-neckline and embroidered yoke, shown with matching pants and a sheer dupatta in a pastel floral print with a striped border.' },
    { ...ROMAN('J4U 3 Piece Set', '₹1,499', 'XXL'), id: 'j4u-pink', name: 'Pink Floral Motif J4U', colour: 'Pink', tags: ['Printed'],
      hex: '#d6338a', aura: [232, 72, 152], img: 'images/j4u-pink.webp', w: 1000, h: 1778,
      alt: 'Model wearing a bright pink flared kurta with floral motifs on the skirt, with a sheer floral dupatta with a gold border',
      desc: 'A bright pink flared kurta with floral motifs on the skirt and a button placket, shown with a sheer floral dupatta with a gold border.' },
    { ...VERTICAN('₹1,499', 'L to XXL'), id: 'vertican-peacock', name: 'Peacock Blue Floral Embroidered', colour: 'Peacock blue', tags: ['Embroidered'],
      hex: '#0d6e7a', aura: [28, 152, 168], img: 'images/vertican-peacock.webp', w: 1000, h: 1778,
      alt: 'Model wearing a peacock blue kurta with large white floral embroidery, matching palazzo pants and a sheer scalloped dupatta',
      desc: 'A peacock-blue 3-piece set: a kurta with large white floral embroidery and a V-neckline with striped trim, matching palazzo pants and a sheer dupatta with scalloped, embroidered edges.' },
    { ...VERTICAN('₹899', 'XL to 3XL'), id: 'vertican-mustard', name: 'Mustard Black Floral Embroidered', colour: 'Mustard yellow', tags: ['Embroidered'],
      hex: '#d3a21a', aura: [236, 182, 38], img: 'images/vertican-mustard.webp', w: 1000, h: 1778,
      alt: 'Model wearing a mustard yellow kurta with black and gold floral embroidery at the neckline and front, matching pants and a plain dupatta',
      desc: 'A mustard-yellow 3-piece set: a kurta with black and gold floral embroidery at the V-neckline and on the front, matching pants and a plain dupatta.' },
    { ...COTTON6060('₹1,899', 'L, XXL'), id: 'cotton6060-peacock', name: 'Peacock Blue Lotus Embroidered 60-60 Cotton', colour: 'Peacock blue', tags: ['Embroidered'],
      hex: '#0e6f8f', aura: [22, 142, 188], img: 'images/cotton6060-peacock.webp', w: 1000, h: 1500,
      alt: 'Model wearing a peacock blue cotton kurta with a pink and gold lotus and leaf embroidery, matching pants and a dupatta with flower motifs',
      desc: 'A peacock-blue 60-60 cotton kurta with a lotus and leaf motif down the front and button detail at the notched neckline, shown with matching pants and a dupatta with scattered flower motifs and a sequin border. Comes with lining.' },
    { ...DABU('₹1,399', 'XXL'), id: 'dabu-pink', name: 'Pink Mandala Motif Dabu Cotton', colour: 'Pink', tags: ['Printed'],
      hex: '#d4195c', aura: [228, 46, 112], img: 'images/dabu-pink.webp', w: 1000, h: 1249,
      alt: 'Model wearing a rani pink Dabu cotton kurta with colourful mandala motifs and contrast piping, matching pants and a printed dupatta',
      desc: 'A rani-pink Dabu cotton kurta with colourful mandala motifs at the sides, contrast piping and an embroidered V-neck, shown with matching pants and a printed dupatta.' },
    { ...DABUCOORD('₹899', 'XL'), id: 'dabucoord-olive', name: 'Olive Green Printed Yoke Dabu Cotton Co-ord', colour: 'Olive green', tags: ['Printed'],
      hex: '#556b2f', aura: [108, 152, 58], img: 'images/dabucoord-olive.webp', w: 1000, h: 1149,
      alt: 'Model wearing an olive green Dabu cotton co-ord set with a red printed yoke, black tassels and wide palazzo pants',
      desc: 'An olive-green Dabu cotton two-piece co-ord set: a flared kurta with a red printed yoke, black tassels, printed side piping and cuffs, with matching wide palazzo pants.' },
    { ...DABUCOORD('₹899', 'XL'), id: 'dabucoord-moss', name: 'Moss Green Mirror-Work Mandala Dabu Cotton Co-ord', colour: 'Moss green', tags: ['Embroidered'],
      hex: '#8a9a22', aura: [168, 188, 48], img: 'images/dabucoord-moss.webp', w: 1000, h: 1778,
      alt: 'Model wearing a moss green Dabu cotton co-ord set with a mirror work V-neckline, mandala patch pockets and matching pants',
      desc: 'A moss-green Dabu cotton two-piece co-ord set: a straight kurta with a mirror-work V-neckline, mandala patch pockets and printed piping and cuffs, with matching pants.' },
    { ...DABUCOORD('₹899', 'XL'), id: 'dabucoord-purple', name: 'Purple Embroidered Yoke Dabu Cotton Co-ord', colour: 'Purple', tags: ['Embroidered'],
      hex: '#4b1f6e', aura: [135, 72, 190], img: 'images/dabucoord-purple.webp', w: 1000, h: 1778,
      alt: 'Model wearing a purple Dabu cotton co-ord set with a coral embroidered yoke, embroidered pockets and matching palazzo pants',
      desc: 'A purple Dabu cotton two-piece co-ord set: a straight kurta with a coral embroidered yoke, mirror accents, embroidered pockets and cuffs, with matching palazzo pants.' },
    { ...NIGHTSUIT('₹499', 'M to XXL'), id: 'nightsuit-green', name: 'Green Print Korean Night Suit', colour: 'Green', tags: ['Printed'],
      hex: '#34b27a', aura: [60, 186, 128], img: 'images/nightsuit-green.webp', w: 1000, h: 1328,
      alt: 'Model wearing a green and white printed Korean night suit with a V-neck top and wide leg pants',
      desc: 'A soft, lightweight Korean-fabric night suit in green with a ribbed texture and a white abstract floral print: a top with a V-neck, centre trim and three-quarter sleeves, with matching wide-leg pants.' }
  ];

  /* =========================================================
     Everything below builds the catalogue. No animations.
     ========================================================= */
  window.AURA_DATA = { products: PRODUCTS };   // shared with js/fx.js (the effects layer)
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

  /* ---------- Links and messages ---------- */
  const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const igDM = `https://ig.me/m/${CONFIG.instagramUser}`;      // opens an Instagram chat with the shop
  const orderText = p => `Hi Aura Magic! I would like to order the ${p.name} (${p.set}). Please share the price, available sizes and delivery details.`;
  const pageUrl = id => (CONFIG.shareBase || location.href.split('#')[0].split('?')[0]).split('#')[0] + '#' + id;
  const priceText = p => p.price || 'Message us for price';
  const sizeText = p => p.sizes || 'Ask on WhatsApp';
  const priceNum = p => parseInt(String(p.price || '').replace(/[^\d]/g, ''), 10) || 0;
  const rupees = n => '₹' + n.toLocaleString('en-IN');

  async function copyText(text) {
    try { if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (e) { /* use the fallback */ }
    try {
      const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:0'; document.body.appendChild(t); t.select();
      const ok = document.execCommand('copy'); t.remove(); return ok;
    } catch (e) { return false; }
  }

  let toastTimer;
  function showToast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 4200);
  }
  // Instagram cannot receive a ready-made message from a website, so we show a small window with two clear steps:
  // copy the message, then open the chat and paste it.
  const igd = $('#igd');
  function openIgDialog(text) {
    $('#igdText').value = text; $('#igdWa').href = waLink(text);
    $('#igdCopied').hidden = true; igd.hidden = false; document.body.classList.add('lb-open');
    copyText(text).then(ok => { $('#igdCopied').hidden = !ok; });   // already copied for them
    $('#igdCopy').focus({ preventScroll: true });
  }
  function closeIgDialog() { igd.hidden = true; if ($('#lb').hidden) document.body.classList.remove('lb-open'); }
  $('#igdClose').addEventListener('click', closeIgDialog);
  igd.addEventListener('click', e => { if (e.target === igd) closeIgDialog(); });
  $('#igdCopy').addEventListener('click', () => copyText($('#igdText').value).then(ok => { $('#igdCopied').hidden = !ok; if (!ok) { $('#igdText').select(); showToast('Press and hold the message, then choose Copy.'); } }));
  $('#igdOpen').addEventListener('click', () => { copyText($('#igdText').value); closeIgDialog(); });   // the link itself opens Instagram

  $$('[data-wa]').forEach(a => { a.href = waLink(CONFIG.greeting); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-ig]').forEach(a => { a.href = igDM; a.target = '_blank'; a.rel = 'noopener'; });
  $('#igdOpen').href = igDM;
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Collections (the catalogue sections, in this order) ----------
     Each outfit goes into the first collection whose test matches it. */
  const COLLECTIONS = [
    { id: 'cotton-maxi', title: 'Cotton Maxi Frocks', note: 'Flared cotton maxi frocks in prints, embroidery and mirror work.', test: p => p.set === 'Cotton Maxi Frock' },
    { id: 'rayon-maxi', title: 'Rayon Maxi Frocks', note: 'Soft rayon maxi frocks, including the short maxi, with puff sleeves and frill hems.', test: p => /^Rayon .*Maxi/.test(p.set) },
    { id: 'cotton-tops', title: 'Cotton Tops', note: 'Easy everyday cotton tops: jean tops, tops with lining and kalamkari tops.', test: p => /^Cotton .*Top( with Lining)?$/.test(p.set) },
    { id: 'coord', title: 'Co-ord Sets', note: 'Matching kurta and pants sets in cotton, rayon and dabu cotton.', test: p => p.set.includes('Co-ord') },
    { id: 'cotton-3pc', title: 'Cotton 3-Piece Sets', note: 'Kurta, pants and dupatta in cotton, 60-60 cotton, mul cotton, dabu cotton and kalamkari.', test: p => p.set === 'Cotton 3-Piece Set' || p.set.startsWith('60-60 Cotton 3-Piece') || p.set.startsWith('Mul Cotton') || p.set.startsWith('Dabu Cotton 3') || p.set.startsWith('Cotton Kalamkari 3') },
    { id: 'chanderi', title: 'Mul Chanderi Sets', note: 'Mul chanderi 2-piece and 3-piece sets, all with lining.', test: p => p.set.startsWith('Mul Chanderi') },
    { id: 'raw-silk', title: 'Raw Silk Sets', note: 'Raw silk kurti sets in rich colours, 3-piece with lining.', test: p => p.id.startsWith('raw-silk') },
    { id: 'raw-silk-vertican', title: 'Vertican 3 Piece Sets', note: 'Floral embroidered Vertican 3-piece sets.', test: p => p.id.startsWith('vertican') },
    { id: 'chinon', title: 'Chinon Sets', note: 'Chinon 3-piece sets with printed dupattas.', test: p => p.set.startsWith('Chinon') },
    { id: 'roman', title: 'Roman Silk, Roman Gloss & J4U', note: 'Special-occasion sets in Roman silk, Roman gloss and J4U.', test: p => /^(Roman|J4U)/.test(p.set) },
    { id: 'rayon-sets', title: 'Rayon Kurta Sets', note: 'Rayon kurta 2-piece sets with matching pants.', test: p => p.set === 'Rayon Kurta 2 Piece Set' },
    { id: 'berlin', title: 'Berlin Kurta 2 Piece Sets', note: 'Berlin kurta 2-piece sets in lavender and mustard.', test: p => p.set.startsWith('Berlin') },
    { id: 'night', title: 'Korean Night Suit', note: 'Soft, lightweight night suits for everyday comfort.', test: p => p.set.startsWith('Korean') }
  ];
  const placed = new Set();
  COLLECTIONS.forEach(c => { c.items = PRODUCTS.filter(p => !placed.has(p.id) && c.test(p)); c.items.forEach(p => { placed.add(p.id); p.collection = c.id; }); });
  const leftovers = PRODUCTS.filter(p => !placed.has(p.id));          // safety net: a new outfit never goes missing
  if (leftovers.length) { COLLECTIONS.push({ id: 'more', title: 'More Styles', note: '', items: leftovers }); leftovers.forEach(p => { p.collection = 'more'; }); }
  const COLLS = COLLECTIONS.filter(c => c.items.length);
  const collOf = p => COLLS.find(c => c.id === p.collection);
  const priceRange = c => {
    const n = c.items.map(priceNum).filter(Boolean); if (!n.length) return 'Message us for price';
    const lo = Math.min(...n), hi = Math.max(...n); return lo === hi ? rupees(lo) : `${rupees(lo)} – ${rupees(hi)}`;
  };

  /* ---------- Draw the catalogue ---------- */
  const photo = (p, cls = '') => `<img class="${cls}" src="${p.img}" width="${p.w}" height="${p.h}" alt="${p.alt}" loading="lazy" decoding="async">`;

  function cardHTML(p) {
    return `
    <article class="card" id="p-${p.id}" style="--cr:${(p.aura || [155, 109, 255]).join(' ')}">
      <button class="card-media" type="button" data-open="${p.id}" data-cursor="View" aria-label="View ${p.name}">${photo(p)}</button>
      <div class="card-body">
        <h4 class="card-name">${p.name}</h4>
        <p class="card-set">${p.set}</p>
        <p class="card-price"><strong>${priceText(p)}</strong><span>Sizes: ${sizeText(p)}</span></p>
        <div class="card-actions">
          <a class="mini mini-wa" href="${waLink(orderText(p))}" target="_blank" rel="noopener" aria-label="Order ${p.name} on WhatsApp"><svg aria-hidden="true"><use href="#i-wa"/></svg><span>WhatsApp</span></a>
          <a class="mini mini-ig" data-ig-order="${p.id}" href="${igDM}" target="_blank" rel="noopener" aria-label="Order ${p.name} on Instagram"><svg aria-hidden="true"><use href="#i-ig"/></svg><span>Instagram</span></a>
        </div>
      </div>
    </article>`;
  }

  function renderCatalogue() {
    $('#collIndex').innerHTML = COLLS.map(c => `
      <a class="coll-tile" href="#c-${c.id}">
        <img src="${c.items[0].img}" width="${c.items[0].w}" height="${c.items[0].h}" alt="" loading="lazy" decoding="async">
        <span class="coll-tile-text"><strong>${c.title}</strong><small>${c.items.length} ${c.items.length === 1 ? 'style' : 'styles'} · ${c.items.length > 1 && priceRange(c).includes('–') ? 'From ' + rupees(Math.min(...c.items.map(priceNum).filter(Boolean))) : priceRange(c)}</small></span>
      </a>`).join('');
    $('#catalogue').innerHTML = COLLS.map(c => `
      <section class="coll" id="c-${c.id}" aria-labelledby="h-${c.id}">
        <header class="coll-head">
          <div>
            <h3 id="h-${c.id}">${c.title}</h3>
            ${c.note ? `<p class="coll-note">${c.note}</p>` : ''}
          </div>
          <p class="coll-meta"><span>${c.items.length} ${c.items.length === 1 ? 'style' : 'styles'}</span><span>${priceRange(c)}</span><a href="#collections">All collections ↑</a></p>
        </header>
        <div class="grid">${c.items.map(cardHTML).join('')}</div>
      </section>`).join('');
    const fill = $('#fOutfit');
    fill.innerHTML = '<option value="">Not sure yet</option>' + COLLS.map(c => `<optgroup label="${c.title}">${c.items.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('');
  }
  renderCatalogue();
  { const chips = $('#chips');
    chips.innerHTML = COLLS.map(c => `<a class="chip" href="#c-${c.id}" data-chip="c-${c.id}">${c.title}<small>${c.items.length}</small></a>`).join('');
    const mark = id => $$('.chip', chips).forEach(a => {
      const on = a.dataset.chip === id; a.setAttribute('aria-current', on ? 'true' : 'false');
      if (on) { const l = a.offsetLeft - (chips.clientWidth - a.offsetWidth) / 2; chips.scrollLeft = Math.max(0, l); }   // keep the active chip in view (sideways only)
    });
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) mark(en.target.id); }), { rootMargin: '-35% 0px -60% 0px' }); $$('.coll').forEach(sec => io.observe(sec)); } }
  { const put = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    put('#statStyles', PRODUCTS.length); put('#statColls', COLLS.length); put('#statFrom', rupees(Math.min(...PRODUCTS.map(priceNum).filter(Boolean)))); }

  document.addEventListener('click', e => {
    const open = e.target.closest('[data-open]');
    if (open) { e.preventDefault(); openLB(open.dataset.open); return; }
    const igOne = e.target.closest('[data-ig-order]');
    if (igOne) { e.preventDefault(); openIgDialog(orderText(byId[igOne.dataset.igOrder])); return; }
    const igAny = e.target.closest('[data-ig]');
    if (igAny) { e.preventDefault(); openIgDialog(CONFIG.greeting); }
  });

  /* ---------- Photo pop-up ---------- */
  const lb = $('#lb');
  let list = [], idx = 0, lastFocus = null;

  function fillLB() {
    const p = list[idx], c = collOf(p);
    const img = $('#lbImg'); img.src = p.img; img.alt = p.alt; img.width = p.w; img.height = p.h;
    $('#lbColl').textContent = c ? c.title : '';
    $('#lbTitle').textContent = p.name; $('#lbSet').textContent = p.set; $('#lbDesc').textContent = p.desc;
    $('#lbColour').textContent = p.colour; $('#lbPrice').textContent = priceText(p); $('#lbSizes').textContent = sizeText(p);
    $('#lbWa').href = waLink(orderText(p)); $('#lbIg').href = igDM;
    $('#lbMail').href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Enquiry: ' + p.name)}&body=${encodeURIComponent(orderText(p))}`;
    $('#lbCount').textContent = `${idx + 1} of ${list.length}`;
    $('#lbPrev').hidden = $('#lbNext').hidden = list.length < 2;
    $('#lbPhoto').classList.remove('zoomed'); $('#lbPhoto').style.setProperty('--ratio', (p.w / p.h).toFixed(4)); renderLbThumbs();
    setHash(p.id);
    new Image().src = list[(idx + 1) % list.length].img;           // load the next photo ahead of time
  }
  function renderLbThumbs() {
    const box = $('#lbThumbs'), n = list.length; box.innerHTML = ''; box.hidden = n < 2; if (n < 2) return;
    const ids = n <= 9 ? list.map((_, k) => k) : [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(k => (idx + k + n * 3) % n);
    ids.forEach(k => {
      const q = list[k], b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', `Show ${q.name}`); if (k === idx) b.setAttribute('aria-current', 'true');
      b.innerHTML = `<img src="${q.img}" alt="" width="${q.w}" height="${q.h}" loading="lazy" decoding="async">`;
      b.addEventListener('click', () => { idx = k; lb.scrollTop = 0; fillLB(); });
      box.appendChild(b);
    });
  }
  const setHash = id => { try { history.replaceState(null, '', id ? '#' + id : location.pathname + location.search); } catch (e) { /* ignore */ } };

  function openLB(id) {
    const p = byId[id]; if (!p) return;
    const c = collOf(p); list = c ? c.items : [p]; idx = Math.max(0, list.indexOf(p));
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.classList.add('lb-open');
    lb.scrollTop = 0; fillLB(); $('#lbClose').focus({ preventScroll: true });
  }
  function closeLB() {
    if (lb.hidden) return;
    lb.hidden = true; document.body.classList.remove('lb-open'); setHash(null);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  const step = d => { if (lb.hidden || list.length < 2) return; idx = (idx + d + list.length) % list.length; lb.scrollTop = 0; fillLB(); };

  $('#lbClose').addEventListener('click', closeLB);
  { const photo = $('#lbPhoto'), fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const pan = e => { const r = photo.getBoundingClientRect(); photo.style.setProperty('--ox', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); photo.style.setProperty('--oy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%'); };
    photo.addEventListener('click', e => { if (!fine) return; photo.classList.toggle('zoomed'); pan(e); });
    photo.addEventListener('pointermove', e => { if (photo.classList.contains('zoomed')) pan(e); });
    let sx = 0, sy = 0;
    lb.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4 && !e.target.closest('.lb-thumbs')) step(dx < 0 ? 1 : -1);
    }, { passive: true }); }
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  $('#lbIg').addEventListener('click', e => { e.preventDefault(); openIgDialog(orderText(list[idx])); });
  $('#lbShare').addEventListener('click', async () => {
    const p = list[idx], url = pageUrl(p.id), text = `${p.name}${p.price ? ' – ' + p.price : ''} at Aura Magic`;
    if (navigator.share) { try { await navigator.share({ title: p.name, text, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
    const ok = await copyText(url);
    showToast(ok ? 'Link copied. Paste it in WhatsApp, Instagram or anywhere to share.' : url);
  });
  addEventListener('keydown', e => {
    if (!igd.hidden) { if (e.key === 'Escape') closeIgDialog(); return; }
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {                                     // keep keyboard focus inside the pop-up
      const f = $$('button, a[href]', lb).filter(el => !el.hidden && el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // links like ...#rayon-red-diamond (or the older ...#outfit=rayon-red-diamond) open that outfit straight away
  const hashId = () => location.hash.replace(/^#(outfit=)?/, '');
  function fromHash() {
    const id = hashId();
    if (byId[id]) { if (lb.hidden) { const el = document.getElementById('p-' + id); if (el) el.scrollIntoView(); openLB(id); } }
    else if (/^c-/.test(id) && document.getElementById(id)) document.getElementById(id).scrollIntoView();
  }
  addEventListener('hashchange', fromHash);
  fromHash();

  /* ---------- Menu, floating buttons ---------- */
  const header = $('#top'), burger = $('#burger');
  { const mark = () => header.classList.toggle('scrolled', window.scrollY > 30); addEventListener('scroll', mark, { passive: true }); mark(); }
  burger.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('#nav a').forEach(a => a.addEventListener('click', () => { header.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); }));
  const fabs = $$('.fab'); let fabState = null;
  const syncFabs = () => { const on = scrollY > 400; if (on !== fabState) { fabState = on; fabs.forEach(f => { f.hidden = !on; }); } };
  addEventListener('scroll', syncFabs, { passive: true }); syncFabs();

  /* ---------- Enquiry form: WhatsApp or Instagram ---------- */
  function formText() {
    const name = $('#fName').value.trim(), err = $('#fNameErr');
    if (!name) { err.textContent = 'Please enter your name so we know who to reply to.'; $('#fName').focus(); return ''; }
    err.textContent = '';
    const p = byId[$('#fOutfit').value], msg = $('#fMsg').value.trim();
    return `Hi Aura Magic! I am ${name}.` + (p ? ` I am interested in the ${p.name} (${p.set}).` : ' I would like to know more about your collection.') + (msg ? ` ${msg}` : '');
  }
  $('#enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const text = formText(); if (!text) return;
    window.open(waLink(text), '_blank', 'noopener');
    showToast('Opening WhatsApp with your message…');
  });
  $('#fIg').addEventListener('click', () => {
    const text = formText(); if (!text) return;
    openIgDialog(text);
  });
})();
