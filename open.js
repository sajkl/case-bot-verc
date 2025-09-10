api/open.js
// api/open.js
// POST /api/open
// Request body: { caseId: string }
// Response: { prize: { id, label, emoji, rarity, starsValue? } }

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { caseId } = req.body || {};
  if (!caseId) return res.status(400).json({ error: 'Missing caseId' });


  const CASES = {
    starter: {
      prizes: [
        { id: 's1', label: 'Стикер-пак', emoji: '😺', rarity: 'common', weight: 45 },
        { id: 's2', label: '2⭐ назад', emoji: '⭐', rarity: 'common', weight: 28, starsValue: 2 },
        { id: 's3', label: 'Эксклюзивный бейдж', emoji: '🏅', rarity: 'rare', weight: 17 },
        { id: 's4', label: 'Аватар-рамка', emoji: '🖼️', rarity: 'epic', weight: 8 },
        { id: 's5', label: 'Мегаприз: 20⭐', emoji: '💫', rarity: 'legendary', weight: 2, starsValue: 20 }
      ]
    },
    // добавь остальные кейсы (lite, pro, ultra) по аналогии
  };

  const c = CASES[caseId];
  if (!c) return res.status(404).json({ error: 'Unknown caseId' });

  // Выбор приза по весам
  const total = c.prizes.reduce((s, p) => s + (p.weight || 0), 0);
  let r = Math.random() * total;
  let prize = c.prizes[c.prizes.length - 1];
  for (const p of c.prizes) {
    r -= p.weight || 0;
    if (r <= 0) {
      prize = p;
      break;
    }
  }

  return res.status(200).json({ prize });
};
