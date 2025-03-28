// Guna points for each aspect
const gunaPoints = {
  varna: 1,
  vashya: 2,
  tara: 3,
  yoni: 4,
  graha: 5,
  gana: 6,
  bhakoot: 7,
  nadi: 8
};

// Calculate Varna compatibility (1 point)
function calculateVarnaCompatibility(sign1: string, sign2: string): number {
  const varnaMap = {
    Aries: 'Brahmin', Leo: 'Kshatriya', Sagittarius: 'Vaishya',
    Taurus: 'Shudra', Virgo: 'Brahmin', Capricorn: 'Kshatriya',
    Gemini: 'Vaishya', Libra: 'Shudra', Aquarius: 'Brahmin',
    Cancer: 'Kshatriya', Scorpio: 'Vaishya', Pisces: 'Shudra'
  };

  const varna1 = varnaMap[sign1 as keyof typeof varnaMap];
  const varna2 = varnaMap[sign2 as keyof typeof varnaMap];

  if (varna1 === varna2) return gunaPoints.varna;
  return 0;
}

// Calculate Vashya compatibility (2 points)
function calculateVashyaCompatibility(sign1: string, sign2: string): number {
  const vashyaMap = {
    Aries: 'Chatushpad', Leo: 'Chatushpad', Sagittarius: 'Chatushpad',
    Taurus: 'Chatushpad', Virgo: 'Manav', Capricorn: 'Chatushpad',
    Gemini: 'Manav', Libra: 'Manav', Aquarius: 'Manav',
    Cancer: 'Keet', Scorpio: 'Keet', Pisces: 'Jalachar'
  };

  const vashya1 = vashyaMap[sign1 as keyof typeof vashyaMap];
  const vashya2 = vashyaMap[sign2 as keyof typeof vashyaMap];

  if (vashya1 === vashya2) return gunaPoints.vashya;
  return 0;
}

// Calculate Tara compatibility (3 points)
function calculateTaraCompatibility(nakshatra1: number, nakshatra2: number): number {
  const difference = Math.abs(nakshatra1 - nakshatra2);
  const taraValue = (difference % 9) + 1;
  
  // Favorable Taras
  if ([1, 3, 5, 7].includes(taraValue)) return gunaPoints.tara;
  return 0;
}

// Calculate Yoni compatibility (4 points)
function calculateYoniCompatibility(nakshatra1: number, nakshatra2: number): number {
  const yoniMap = [
    'Horse', 'Elephant', 'Sheep', 'Snake', 'Dog', 'Cat',
    'Rat', 'Cow', 'Buffalo', 'Tiger', 'Deer', 'Monkey',
    'Mongoose', 'Lion', 'Horse', 'Elephant', 'Sheep', 'Snake',
    'Dog', 'Cat', 'Rat', 'Cow', 'Buffalo', 'Tiger',
    'Deer', 'Monkey', 'Mongoose'
  ];

  const yoni1 = yoniMap[nakshatra1];
  const yoni2 = yoniMap[nakshatra2];

  if (yoni1 === yoni2) return gunaPoints.yoni;
  return 0;
}

// Calculate Graha Maitri (5 points)
function calculateGrahaMaitriCompatibility(sign1: string, sign2: string): number {
  const rulerMap = {
    Aries: 'Mars', Leo: 'Sun', Sagittarius: 'Jupiter',
    Taurus: 'Venus', Virgo: 'Mercury', Capricorn: 'Saturn',
    Gemini: 'Mercury', Libra: 'Venus', Aquarius: 'Saturn',
    Cancer: 'Moon', Scorpio: 'Mars', Pisces: 'Jupiter'
  };

  const ruler1 = rulerMap[sign1 as keyof typeof rulerMap];
  const ruler2 = rulerMap[sign2 as keyof typeof rulerMap];

  // Friendly planets
  const friendships = {
    Sun: ['Moon', 'Mars', 'Jupiter'],
    Moon: ['Sun', 'Mercury'],
    Mars: ['Sun', 'Moon', 'Jupiter'],
    Mercury: ['Sun', 'Venus'],
    Jupiter: ['Sun', 'Moon', 'Mars'],
    Venus: ['Mercury', 'Saturn'],
    Saturn: ['Mercury', 'Venus']
  };

  if (friendships[ruler1 as keyof typeof friendships].includes(ruler2)) {
    return gunaPoints.graha;
  }
  return 0;
}

// Calculate Gana compatibility (6 points)
function calculateGanaCompatibility(nakshatra1: number, nakshatra2: number): number {
  const ganaMap = [
    'Dev', 'Manush', 'Rakshas', 'Dev', 'Manush', 'Rakshas',
    'Dev', 'Manush', 'Rakshas', 'Dev', 'Manush', 'Rakshas',
    'Dev', 'Manush', 'Rakshas', 'Dev', 'Manush', 'Rakshas',
    'Dev', 'Manush', 'Rakshas', 'Dev', 'Manush', 'Rakshas',
    'Dev', 'Manush', 'Rakshas'
  ];

  const gana1 = ganaMap[nakshatra1];
  const gana2 = ganaMap[nakshatra2];

  if (gana1 === gana2) return gunaPoints.gana;
  if ((gana1 === 'Dev' && gana2 === 'Manush') || (gana1 === 'Manush' && gana2 === 'Dev')) return gunaPoints.gana / 2;
  return 0;
}

// Calculate Bhakoot compatibility (7 points)
function calculateBhakootCompatibility(sign1: string, sign2: string): number {
  const signNumbers = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4,
    Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8,
    Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
  };

  const num1 = signNumbers[sign1 as keyof typeof signNumbers];
  const num2 = signNumbers[sign2 as keyof typeof signNumbers];
  const difference = Math.abs(num1 - num2) + 1;

  // Favorable houses
  if ([2, 4, 6, 8, 12].includes(difference)) return gunaPoints.bhakoot;
  return 0;
}

// Calculate Nadi compatibility (8 points)
function calculateNadiCompatibility(nakshatra1: number, nakshatra2: number): number {
  const nadiMap = [
    'Aadi', 'Madhya', 'Antya', 'Aadi', 'Madhya', 'Antya',
    'Aadi', 'Madhya', 'Antya', 'Aadi', 'Madhya', 'Antya',
    'Aadi', 'Madhya', 'Antya', 'Aadi', 'Madhya', 'Antya',
    'Aadi', 'Madhya', 'Antya', 'Aadi', 'Madhya', 'Antya',
    'Aadi', 'Madhya', 'Antya'
  ];

  const nadi1 = nadiMap[nakshatra1];
  const nadi2 = nadiMap[nakshatra2];

  if (nadi1 !== nadi2) return gunaPoints.nadi;
  return 0;
}

// Calculate total Guna Milan score
export function calculateKundliMilanScore(
  boySign: string,
  girlSign: string,
  boyNakshatra: number,
  girlNakshatra: number
): {
  total: number;
  breakdown: {
    varna: number;
    vashya: number;
    tara: number;
    yoni: number;
    graha: number;
    gana: number;
    bhakoot: number;
    nadi: number;
  };
} {
  const varna = calculateVarnaCompatibility(boySign, girlSign);
  const vashya = calculateVashyaCompatibility(boySign, girlSign);
  const tara = calculateTaraCompatibility(boyNakshatra, girlNakshatra);
  const yoni = calculateYoniCompatibility(boyNakshatra, girlNakshatra);
  const graha = calculateGrahaMaitriCompatibility(boySign, girlSign);
  const gana = calculateGanaCompatibility(boyNakshatra, girlNakshatra);
  const bhakoot = calculateBhakootCompatibility(boySign, girlSign);
  const nadi = calculateNadiCompatibility(boyNakshatra, girlNakshatra);

  const breakdown = { varna, vashya, tara, yoni, graha, gana, bhakoot, nadi };
  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  return { total, breakdown };
}

export function getCompatibilityInterpretation(score: number): {
  level: string;
  description: string;
  recommendation: string;
} {
  if (score >= 32) {
    return {
      level: 'Excellent',
      description: 'This match indicates a highly harmonious relationship with strong compatibility across most aspects.',
      recommendation: 'This is considered a very auspicious match for marriage.'
    };
  } else if (score >= 28) {
    return {
      level: 'Very Good',
      description: 'The match shows strong compatibility with good potential for a successful marriage.',
      recommendation: 'This match is favorable for marriage with minor considerations.'
    };
  } else if (score >= 24) {
    return {
      level: 'Good',
      description: 'This match indicates above-average compatibility with some areas needing attention.',
      recommendation: 'Marriage can be considered after addressing any specific concerns.'
    };
  } else if (score >= 18) {
    return {
      level: 'Average',
      description: 'The match shows moderate compatibility with several areas needing consideration.',
      recommendation: 'Marriage may be considered after careful consideration and remedial measures.'
    };
  } else {
    return {
      level: 'Below Average',
      description: 'This match indicates significant challenges in compatibility.',
      recommendation: 'Marriage should be considered only after thorough consultation with an expert and implementing suggested remedies.'
    };
  }
}