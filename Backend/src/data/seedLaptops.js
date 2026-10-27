const Laptop = require("../models/Laptop");

// Illustrative sample catalogue for development; not a live price feed.
const sampleLaptops = [
  { brand:"Lenovo", model:"IdeaPad Slim 5", price:64990, processor:"AMD Ryzen 5 8645HS", processorTier:3, ram:16, storage:512, gpu:"Integrated Radeon", gpuTier:2, weight:1.46, type:"Student", rating:4.4, description:"A balanced everyday laptop for college, coding and multitasking.", pros:["16 GB RAM","Portable build","Fast SSD"], cons:["Not designed for demanding AAA gaming"], useCases:["college","coding","office","everyday"] },
  { brand:"ASUS", model:"TUF Gaming A15", price:89990, processor:"AMD Ryzen 7 7735HS", processorTier:4, ram:16, storage:512, gpu:"NVIDIA GeForce RTX 4050", gpuTier:4, weight:2.2, type:"Gaming", rating:4.5, description:"Performance-focused laptop for gaming, development and creative workloads.", pros:["Dedicated graphics","Good performance","Upgrade potential"], cons:["Heavier than ultrabooks","Gaming battery life varies"], useCases:["gaming","video editing","coding"] },
  { brand:"HP", model:"Pavilion 14", price:54990, processor:"Intel Core i5", processorTier:3, ram:16, storage:512, gpu:"Intel integrated graphics", gpuTier:1, weight:1.41, type:"Student", rating:4.1, description:"Compact general-purpose option for study and office tasks.", pros:["Lightweight","Good everyday performance"], cons:["Integrated graphics only"], useCases:["college","office","everyday"] },
  { brand:"Acer", model:"Aspire 7", price:62990, processor:"AMD Ryzen 5", processorTier:3, ram:16, storage:512, gpu:"NVIDIA GeForce RTX 3050", gpuTier:3, weight:2.1, type:"Gaming", rating:4.2, description:"An entry-level performance option for gaming and technical coursework.", pros:["Dedicated GPU","Good value on paper"], cons:["Bulkier design"], useCases:["gaming","coding","video editing"] },
  { brand:"Apple", model:"MacBook Air 13", price:99900, processor:"Apple M3", processorTier:4, ram:16, storage:512, gpu:"Apple integrated GPU", gpuTier:3, weight:1.24, type:"Business", rating:4.7, description:"A lightweight laptop with strong battery efficiency for productivity and development.", pros:["Very portable","Quiet operation","Strong battery efficiency"], cons:["Limited upgradeability","Some games and Windows-only tools may not suit it"], useCases:["college","coding","office","everyday","video editing"] },
  { brand:"Dell", model:"Inspiron 15", price:47990, processor:"Intel Core i3", processorTier:2, ram:8, storage:512, gpu:"Intel integrated graphics", gpuTier:1, weight:1.65, type:"Everyday", rating:3.9, description:"An entry-level option for browsing, documents and basic coursework.", pros:["Lower starting price","Good for basic tasks"], cons:["8 GB RAM may limit heavier multitasking"], useCases:["college","office","everyday"] },
  { brand:"MSI", model:"Thin 15", price:74990, processor:"Intel Core i7", processorTier:4, ram:16, storage:512, gpu:"NVIDIA GeForce RTX 4050", gpuTier:4, weight:1.86, type:"Gaming", rating:4.2, description:"A gaming-oriented laptop with dedicated graphics in a relatively slim chassis.", pros:["Dedicated graphics","Strong CPU tier"], cons:["Fan noise can increase under load"], useCases:["gaming","coding","video editing"] },
  { brand:"ASUS", model:"Vivobook 16", price:57990, processor:"AMD Ryzen 7", processorTier:4, ram:16, storage:512, gpu:"Integrated Radeon", gpuTier:2, weight:1.88, type:"Creator", rating:4.3, description:"A larger-screen everyday laptop suitable for productivity and light creative work.", pros:["Large display class","16 GB RAM"], cons:["Less portable than 14-inch models"], useCases:["college","coding","office","video editing"] }
];

async function seedLaptops() {
  const count = await Laptop.countDocuments();
  if (count === 0) {
    await Laptop.insertMany(sampleLaptops);
    console.log(`Seeded ${sampleLaptops.length} sample laptops`);
  }
}

module.exports = seedLaptops;
