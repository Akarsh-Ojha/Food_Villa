/* ==========================================================
   CONFIG — edit this file only; no need to touch index.html
   ========================================================== */
export const CONFIG = {
  // Restaurant WhatsApp number: country code + number, digits only, NO "+" sign.
  // Example for India: "919876543210"  (91 + 10-digit number)
  WHATSAPP_NUMBER: "918922964243",

  RESTAURANT_NAME: { en: "Spice Garden", hi: "स्पाइस गार्डन" },
  CURRENCY: "₹",

  CATEGORIES: [
    { id: "fast",    en: "Fast Food",     hi: "फास्ट फूड",    e: "🍔" },
    { id: "south",   en: "South Indian",  hi: "साउथ इंडियन",  e: "🥞" },
    { id: "curry",   en: "Curries & Rice", hi: "करी और राइस", e: "🍛" },
    { id: "starter", en: "Starters",      hi: "स्टार्टर",     e: "🥟" },
    { id: "sweet",   en: "Drinks & Sweets", hi: "ड्रिंक्स और मिठाई", e: "🥭" }
  ],

  // mrp = original price, price = selling (discounted) price.
  // img = optional photo URL; if empty, an emoji tile is shown.
  MENU: [
    { id: 1,  cat: "fast",    en: "Paneer Burger",      hi: "पनीर बर्गर",       mrp: 129, price: 99,  e: "🍔", img: "" },
    { id: 2,  cat: "fast",    en: "Veg Pizza",          hi: "वेज पिज़्ज़ा",      mrp: 249, price: 199, e: "🍕", img: "" },
    { id: 3,  cat: "fast",    en: "Peri Peri Fries",    hi: "पेरी पेरी फ्राइज़",  mrp: 109, price: 89,  e: "🍟", img: "" },
    { id: 4,  cat: "south",   en: "Masala Dosa",        hi: "मसाला डोसा",       mrp: 120, price: 120, e: "🥞", img: "" },
    { id: 5,  cat: "south",   en: "Idli Sambar",        hi: "इडली सांभर",       mrp: 80,  price: 69,  e: "🍚", img: "" },
    { id: 6,  cat: "south",   en: "Medu Vada",          hi: "मेदु वड़ा",        mrp: 70,  price: 60,  e: "🍩", img: "" },
    { id: 7,  cat: "curry",   en: "Paneer Butter Masala", hi: "पनीर बटर मसाला", mrp: 260, price: 229, e: "🍛", img: "" },
    { id: 8,  cat: "curry",   en: "Veg Biryani",        hi: "वेज बिरयानी",      mrp: 220, price: 189, e: "🍲", img: "" },
    { id: 9,  cat: "curry",   en: "Dal Tadka with Rice", hi: "दाल तड़का राइस",   mrp: 160, price: 140, e: "🥘", img: "" },
    { id: 10, cat: "curry",   en: "Butter Naan",        hi: "बटर नान",          mrp: 45,  price: 40,  e: "🫓", img: "" },
    { id: 11, cat: "starter", en: "Veg Momos",          hi: "वेज मोमोज़",        mrp: 99,  price: 79,  e: "🥟", img: "" },
    { id: 12, cat: "starter", en: "Paneer Tikka",       hi: "पनीर टिक्का",      mrp: 220, price: 189, e: "🍢", img: "" },
    { id: 13, cat: "starter", en: "Samosa (2 pcs)",     hi: "समोसा (2 पीस)",    mrp: 40,  price: 40,  e: "🥠", img: "" },
    { id: 14, cat: "sweet",   en: "Mango Lassi",        hi: "मैंगो लस्सी",      mrp: 90,  price: 75,  e: "🥭", img: "" },
    { id: 15, cat: "sweet",   en: "Gulab Jamun (2 pcs)", hi: "गुलाब जामुन (2 पीस)", mrp: 70, price: 60, e: "🍮", img: "" },
    { id: 16, cat: "sweet",   en: "Masala Chai",        hi: "मसाला चाय",        mrp: 30,  price: 30,  e: "🍵", img: "" }
  ]
};
