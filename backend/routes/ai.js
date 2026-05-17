const express = require('express');
const router = express.Router();

const aiResponses = {
  phosphorus: 'For low phosphorus maize, apply DAP (Di-Ammonium Phosphate) at 100–150 kg/ha basal. For top-dressing, use Single Super Phosphate. Apply before rainfall for best uptake. Your Field 01 needs treatment within 5 days.',
  faw: 'For Fall Armyworm on maize: (1) Apply emamectin benzoate 2% EC at 200ml/ha, (2) Target the whorl stage early morning, (3) Consider Bt-based biopesticides for organic approach. Scout daily — treat at >20% infestation.',
  harvest: 'Field 03 wheat should be harvested when grain moisture reaches 13–14%. With current NDVI of 0.81 and your growth calendar, Jan 25 is optimal. Avoid harvesting after rain — wait 2 dry days minimum.',
  seed: 'For Mashonaland East red clay soil: SC403 (medium, 110 days, 8.2t/ha potential) is your top match at 96% compatibility. Also consider SC627 for longer season. Both show excellent drought and MLSV tolerance.',
  default: 'Great question! Based on your field data and local conditions in Mashonaland East, I recommend consulting your agronomist for a detailed plan. I can provide general guidance — what specific crop or problem are you asking about?'
};

router.post('/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const lower = message.toLowerCase();
  let response = aiResponses.default;

  if (lower.includes('phosphor') || lower.includes('fertiliz') || lower.includes('dap')) {
    response = aiResponses.phosphorus;
  } else if (lower.includes('faw') || lower.includes('armyworm') || lower.includes('pest')) {
    response = aiResponses.faw;
  } else if (lower.includes('harvest') || lower.includes('wheat')) {
    response = aiResponses.harvest;
  } else if (lower.includes('seed') || lower.includes('variety') || lower.includes('sc') || lower.includes('mashonaland')) {
    response = aiResponses.seed;
  }

  res.json({
    response,
    timestamp: new Date().toISOString(),
    confidence: 0.85
  });
});

router.get('/suggestions', (req, res) => {
  res.json({
    suggestions: [
      { title: 'Phosphorus advice', query: 'What is the best fertilizer for low phosphorus maize?' },
      { title: 'FAW treatment', query: 'How do I treat Fall Armyworm on maize?' },
      { title: 'Harvest timing', query: 'When should I harvest Field 03 wheat?' },
      { title: 'Seed selection', query: 'Which SC variety suits Mashonaland East red soil?' }
    ]
  });
});

module.exports = router;
