const Laptop = require('../models/Laptop');
const Coupon = require('../models/Coupon');
const Match = require('../models/Match');

// Scores one laptop against the user's answers. Mirrors the original
// frontend scoring logic, now running server-side against real data.
function scoreLaptop(laptop, answers) {
  const budget = Number(answers.budget);
  if (laptop.price > budget * 1.03) return null; // slight grace, then excluded

  let score = 0;

  // form factor
  if (answers.form === 'either') score += 20;
  else if (answers.form === laptop.type) score += 25;
  else return null;

  // use case
  if (laptop.useTags.includes(answers.use)) score += 35;
  else score += 8;

  // budget utilisation — reward using the budget well
  const ratio = laptop.price / budget;
  score += Math.min(20, Math.round(ratio * 20));

  // portability
  const order = ['high', 'medium', 'low'];
  if (answers.portability === laptop.portability) score += 12;
  else if (Math.abs(order.indexOf(answers.portability) - order.indexOf(laptop.portability)) === 1) score += 6;

  // OS
  if (answers.os === 'none') score += 6;
  else if (answers.os === laptop.os) score += 8;

  return Math.min(100, Math.round(score));
}

// Finds a coupon whose brand matches part of the laptop's name (case-insensitive)
async function findCouponFor(laptop) {
  const coupons = await Coupon.find();
  const match = coupons.find((c) =>
    laptop.name.toLowerCase().includes(c.brand.toLowerCase())
  );
  return match ? `${match.discountDescription} with code ${match.code}` : null;
}

// Compares this laptop's price to the average price of other laptops
// sharing at least one use-case tag — an honest, data-backed "price analysis"
async function calculatePriceVsAverage(laptop) {
  const similar = await Laptop.find({ useTags: { $in: laptop.useTags } });
  if (similar.length < 2) return null;

  const avg = similar.reduce((sum, l) => sum + l.price, 0) / similar.length;
  const diffPercent = Math.round(((laptop.price - avg) / avg) * 100);
  return diffPercent;
}

async function recommend(req, res) {
  try {
    const { budget, use, form, portability, os, condition } = req.body;
    if (!budget || !use || !form || !portability || !os || !condition) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const conditionFilter = condition === 'new' ? { condition: 'new' } : {};
    const candidates = await Laptop.find(conditionFilter);

    const scored = candidates
      .map((laptop) => ({ laptop, score: scoreLaptop(laptop, req.body) }))
      .filter((x) => x.score !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const results = await Promise.all(
      scored.map(async ({ laptop, score }) => {
        const priceVsAverage = await calculatePriceVsAverage(laptop);
        const coupon = await findCouponFor(laptop);
        return {
          laptopId: laptop._id,
          name: laptop.name,
          price: laptop.price,
          condition: laptop.condition,
          matchScore: score,
          priceVsAverage,
          coupon,
          specs: laptop.specs,
          blurb: laptop.blurb,
        };
      })
    );

    // Save this match to history (requires the user to be logged in — see recommendRoutes.js)
    if (req.userId) {
      await Match.create({
        userId: req.userId,
        answers: { budget, use, form, portability, os, condition },
        results,
      });
    }

    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Could not generate recommendations.' });
  }
}

async function dashboardSummary(req, res) {
  try {
    const matches = await Match.find({ userId: req.userId }).sort({ createdAt: -1 });

    const matchesRun = matches.length;
    const lastMatch = matches[0];
    const lastBudget = lastMatch?.answers?.budget ?? null;
    const lastUseCase = lastMatch?.answers?.use ?? null;

    const recentMatches = matches.slice(0, 3).map((m) => ({
      name: m.results[0]?.name ?? 'Unknown',
      price: m.results[0]?.price ?? 0,
      score: m.results[0]?.matchScore ?? 0,
      useCase: m.answers.use,
    }));

    res.json({
      matchesRun,
      savedPicks: 0, // bookmarking isn't built yet — reported honestly as 0
      lastBudget,
      lastUseCase,
      recentMatches,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not load dashboard data.' });
  }
}

module.exports = { recommend, dashboardSummary };