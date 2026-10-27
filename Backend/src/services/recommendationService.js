// Transparent weighted scoring: easy to explain, test and later replace with ML.
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function scoreLaptop(laptop, preferences) {
  const budget = Number(preferences.budget) || 60000;
  const targetRam = Number(preferences.ram) || 8;
  const targetStorage = Number(preferences.storage) || 256;
  const use = String(preferences.use || "college").toLowerCase();
  const portability = preferences.portability || "balanced";

  // Budget score: full points under budget, gradually lower when over budget.
  const budgetScore = laptop.price <= budget
    ? 100
    : clamp(100 - ((laptop.price - budget) / budget) * 120, 0, 100);

  const ramScore = clamp((laptop.ram / targetRam) * 100, 0, 100);
  const storageScore = clamp((laptop.storage / targetStorage) * 100, 0, 100);
  const cpuScore = clamp((laptop.processorTier / 5) * 100, 0, 100);
  const gpuScore = clamp((laptop.gpuTier / 5) * 100, 0, 100);
  const portableScore = clamp(100 - ((laptop.weight - 1) / 1.5) * 100, 0, 100);

  let weights = { budget: 0.25, ram: 0.15, storage: 0.10, cpu: 0.20, gpu: 0.15, portability: 0.15 };
  if (["gaming", "video editing"].includes(use)) {
    weights = { budget: 0.20, ram: 0.15, storage: 0.10, cpu: 0.20, gpu: 0.25, portability: 0.05 };
  } else if (["coding", "college", "office", "everyday"].includes(use)) {
    weights = { budget: 0.30, ram: 0.20, storage: 0.10, cpu: 0.20, gpu: 0.05, portability: 0.10 };
  }

  let score =
    budgetScore * weights.budget +
    ramScore * weights.ram +
    storageScore * weights.storage +
    cpuScore * weights.cpu +
    gpuScore * weights.gpu +
    (portability === "lightweight" ? portableScore : portability === "performance" ? (cpuScore * 0.6 + gpuScore * 0.4) : 70) * weights.portability;

  // Small bonus when the product explicitly supports the requested use case.
  const useCaseScore = (laptop.useCases || []).some((item) => item.toLowerCase() === use) ? 5 : 0;
  score = clamp(score + useCaseScore, 0, 100);

  const reasons = [];
  if (laptop.price <= budget) reasons.push("Fits within your budget");
  else reasons.push("Slightly above budget, but offers stronger specifications");
  if (laptop.ram >= targetRam) reasons.push(`${laptop.ram} GB RAM meets your preference`);
  if (laptop.storage >= targetStorage) reasons.push(`${laptop.storage} GB storage meets your preference`);
  if (["gaming", "video editing"].includes(use) && laptop.gpuTier >= 3) reasons.push("Dedicated graphics are useful for demanding visual workloads");
  if (portability === "lightweight" && laptop.weight <= 1.5) reasons.push("Lightweight design is easier to carry");
  if (laptop.useCases?.some((item) => item.toLowerCase() === use)) reasons.push(`Suitable for ${use}`);

  return { score: Math.round(score), reasons: reasons.slice(0, 4) };
}

function getRecommendations(laptops, preferences) {
  return laptops
    .map((laptop) => ({ laptop, ...scoreLaptop(laptop, preferences) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

module.exports = { scoreLaptop, getRecommendations };
