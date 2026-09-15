// Run this once with: node seed/seedLaptops.js
// It connects to your database and loads sample laptops + coupons.
require('dotenv').config();
const mongoose = require('mongoose');
const Laptop = require('../models/Laptop');
const Coupon = require('../models/Coupon');

const laptops = [
  { name: 'Acer Aspire 3 (14", Ryzen)', type: 'laptop', price: 29999, condition: 'new', useTags: ['everyday'], portability: 'medium', os: 'windows', specs: { cpu: 'Ryzen 3', ram: '8 GB', storage: '256 GB SSD' }, blurb: 'Cheapest sensible option for light everyday use.' },
  { name: 'ASUS Vivobook Go 15', type: 'laptop', price: 41990, condition: 'new', useTags: ['everyday', 'office'], portability: 'medium', os: 'windows', specs: { cpu: 'Ryzen 5 7520U', ram: '16 GB', storage: '512 GB SSD' }, blurb: 'Best value 16GB machine under 45k.' },
  { name: 'HP 15 255R G10', type: 'laptop', price: 47000, condition: 'new', useTags: ['coding', 'office', 'heavy'], portability: 'medium', os: 'windows', specs: { cpu: 'Ryzen 5 7535U', ram: '16 GB', storage: '512 GB SSD' }, blurb: 'Strongest CPU-for-rupee under 50k.' },
  { name: 'Dell DC 15250', type: 'laptop', price: 49000, condition: 'new', useTags: ['office', 'everyday', 'heavy'], portability: 'medium', os: 'windows', specs: { cpu: 'Core 3 100U', ram: '24 GB', storage: '512 GB SSD' }, blurb: 'Unusually generous RAM at this price.' },
  { name: 'Infinix Zerobook (Core i9 13th Gen)', type: 'laptop', price: 68990, condition: 'refurbished', useTags: ['coding', 'heavy', 'editing'], portability: 'medium', os: 'windows', specs: { cpu: 'Core i9-13900H', ram: '32 GB', storage: '1 TB SSD' }, blurb: 'Outrageous core count and RAM for the price.' },
  { name: 'ASUS Vivobook 16 (Core Ultra 5)', type: 'laptop', price: 79990, condition: 'new', useTags: ['coding', 'heavy', 'office'], portability: 'medium', os: 'windows', specs: { cpu: 'Core Ultra 5 225H', ram: '16 GB', storage: '512 GB SSD' }, blurb: "Core Ultra's NPU speeds up local AI tools." },
  { name: 'Dell G15 5520', type: 'laptop', price: 68000, condition: 'used', useTags: ['gaming', 'coding', 'editing'], portability: 'low', os: 'windows', specs: { cpu: 'Core i5-12500H', ram: '16 GB', storage: '512 GB SSD', graphics: 'RTX 3050' }, blurb: 'Hybrid gaming + coding machine.' },
  { name: 'ASUS TUF Gaming A15', type: 'laptop', price: 69990, condition: 'new', useTags: ['gaming'], portability: 'low', os: 'windows', specs: { cpu: 'Ryzen 7 7445HS', ram: '16 GB', storage: '512 GB SSD', graphics: 'RTX 3050' }, blurb: 'Best all-round value gaming laptop under 80k.' },
  { name: 'HP Victus 15 (RTX 4050)', type: 'laptop', price: 74000, condition: 'new', useTags: ['gaming', 'editing'], portability: 'low', os: 'windows', specs: { cpu: 'Core i5-13420H', ram: '16 GB', storage: '512 GB SSD', graphics: 'RTX 4050' }, blurb: 'Easy first gaming laptop recommendation.' },
  { name: 'Lenovo LOQ 15IRX9', type: 'laptop', price: 89990, condition: 'new', useTags: ['gaming', 'editing', 'heavy'], portability: 'low', os: 'windows', specs: { cpu: 'Core i5-13450HX', ram: '24 GB', storage: '512 GB SSD', graphics: 'RTX 4050' }, blurb: 'More RAM and CPU than most gaming laptops nearby.' },
  { name: 'Apple MacBook Air (M-series)', type: 'laptop', price: 114900, condition: 'new', useTags: ['editing', 'office', 'coding', 'everyday'], portability: 'high', os: 'macos', specs: { cpu: 'Apple M-series', ram: '16 GB', storage: '512 GB SSD' }, blurb: 'Best battery life on this list by a wide margin.' },
  { name: 'Budget office desktop', type: 'desktop', price: 35000, condition: 'new', useTags: ['office', 'everyday'], portability: 'low', os: 'windows', specs: { cpu: 'Ryzen 5 5600G', ram: '16 GB', storage: '512 GB SSD' }, blurb: 'No-frills desktop for a fixed-desk setup.' },
  { name: 'Mid-range gaming desktop', type: 'desktop', price: 80000, condition: 'new', useTags: ['gaming', 'editing'], portability: 'low', os: 'windows', specs: { cpu: 'Ryzen 5 7600', ram: '16 GB', storage: '1 TB SSD', graphics: 'RTX 4060' }, blurb: 'More GPU headroom than a same-priced laptop.' },
  { name: 'Creator desktop (used)', type: 'desktop', price: 105000, condition: 'used', useTags: ['editing', 'heavy', 'coding'], portability: 'low', os: 'windows', specs: { cpu: 'Core i7-14700', ram: '32 GB', storage: '1 TB SSD', graphics: 'RTX 4070' }, blurb: 'Built for sustained heavy workloads.' },
];

const coupons = [
  { code: 'STUDENT20', brand: 'ASUS', discountDescription: 'Extra ₹2,000 off', validUntil: new Date('2026-12-31') },
  { code: 'GAME10', brand: 'HP', discountDescription: '10% cashback on gaming laptops', validUntil: new Date('2026-12-31') },
  { code: 'FESTIVE500', brand: 'Dell', discountDescription: 'Flat ₹1,500 off', validUntil: new Date('2026-12-31') },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding...');

  await Laptop.deleteMany({});
  await Coupon.deleteMany({});

  await Laptop.insertMany(laptops);
  await Coupon.insertMany(coupons);

  console.log(`Inserted ${laptops.length} laptops and ${coupons.length} coupons.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});