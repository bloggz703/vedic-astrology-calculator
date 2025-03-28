// Zodiac signs in order
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const planetaryLords = {
  Aries: 'Mars',
  Taurus: 'Venus',
  Gemini: 'Mercury',
  Cancer: 'Moon',
  Leo: 'Sun',
  Virgo: 'Mercury',
  Libra: 'Venus',
  Scorpio: 'Mars',
  Sagittarius: 'Jupiter',
  Capricorn: 'Saturn',
  Aquarius: 'Saturn',
  Pisces: 'Jupiter'
};

// Calculate Moon's position
function calculateMoonPosition(birthDateTime: Date): number {
  // Convert birth time to decimal hours
  const hours = birthDateTime.getHours();
  const minutes = birthDateTime.getMinutes();
  const decimalTime = hours + (minutes / 60);
  
  // Calculate days since epoch
  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (birthDateTime.getTime() - epoch.getTime()) / (24 * 60 * 60 * 1000);
  
  // Mean lunar elements
  const meanLongitude = 218.3164477 + 13.17639648 * daysSinceEpoch;
  const meanAnomaly = 134.9634114 + 13.06498999 * daysSinceEpoch;
  
  // Simplified lunar position calculation
  let moonLongitude = meanLongitude + 6.289 * Math.sin(meanAnomaly * Math.PI / 180);
  
  // Normalize to 0-360 degrees
  moonLongitude = ((moonLongitude % 360) + 360) % 360;
  
  return moonLongitude;
}

// Calculate Navamsa position
function calculateNavamsaPosition(longitude: number): number {
  const sign = Math.floor(longitude / 30);
  const degreeInSign = longitude % 30;
  const navamsaLength = 3.333333; // 30 degrees / 9 parts
  const navamsaNumber = Math.floor(degreeInSign / navamsaLength);
  
  // Calculate final Navamsa position
  let navamsaSign = (sign * 9 + navamsaNumber) % 12;
  if (navamsaSign < 0) navamsaSign += 12;
  
  return navamsaSign;
}

// Calculate Navamsa chart
export function calculateNavamsa(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  navamsaSign: string;
  lordOfNavamsa: string;
  aspects: {
    planet: string;
    aspect: string;
    influence: string;
  }[];
  interpretation: {
    general: string;
    timing: string;
    recommendation: string;
  };
} {
  // Calculate Moon's position
  const moonLongitude = calculateMoonPosition(birthDateTime);
  
  // Calculate Navamsa position
  const navamsaIndex = calculateNavamsaPosition(moonLongitude);
  
  // Get zodiac sign for Navamsa
  const navamsaSign = zodiacSigns[navamsaIndex];
  const lordOfNavamsa = planetaryLords[navamsaSign as keyof typeof planetaryLords];

  // Generate aspects based on the sign and lord
  const aspects = generateAspects(navamsaSign, lordOfNavamsa);

  // Generate interpretation based on the sign
  const interpretation = generateInterpretation(navamsaSign);

  return {
    navamsaSign,
    lordOfNavamsa,
    aspects,
    interpretation
  };
}

// Generate planetary aspects
function generateAspects(sign: string, lord: string): {
  planet: string;
  aspect: string;
  influence: string;
}[] {
  const baseAspects = [
    {
      planet: lord,
      aspect: `Lord of ${sign}`,
      influence: `Primary influence through ${lord}'s qualities`
    }
  ];

  // Add specific aspects based on sign
  switch (sign) {
    case 'Aries':
    case 'Leo':
    case 'Sagittarius':
      baseAspects.push({
        planet: 'Sun',
        aspect: 'Trine to Fire signs',
        influence: 'Enhances leadership and spiritual growth'
      });
      break;
    case 'Taurus':
    case 'Virgo':
    case 'Capricorn':
      baseAspects.push({
        planet: 'Saturn',
        aspect: 'Trine to Earth signs',
        influence: 'Strengthens stability and material success'
      });
      break;
    case 'Gemini':
    case 'Libra':
    case 'Aquarius':
      baseAspects.push({
        planet: 'Mercury',
        aspect: 'Trine to Air signs',
        influence: 'Boosts intellectual and spiritual understanding'
      });
      break;
    default:
      baseAspects.push({
        planet: 'Moon',
        aspect: 'Trine to Water signs',
        influence: 'Deepens emotional and spiritual connection'
      });
  }

  return baseAspects;
}

// Generate interpretation
function generateInterpretation(sign: string): {
  general: string;
  timing: string;
  recommendation: string;
} {
  switch (sign) {
    case 'Aries':
    case 'Leo':
    case 'Sagittarius':
      return {
        general: 'Your Navamsa in a fire sign indicates strong spiritual leadership potential.',
        timing: 'Favorable periods occur during Jupiter transits to fire signs.',
        recommendation: 'Focus on balancing spiritual pursuits with worldly responsibilities.'
      };
    case 'Taurus':
    case 'Virgo':
    case 'Capricorn':
      return {
        general: 'Earth sign Navamsa suggests practical approach to spirituality.',
        timing: 'Venus transits to earth signs activate spiritual growth.',
        recommendation: 'Ground spiritual practices in daily routine.'
      };
    case 'Gemini':
    case 'Libra':
    case 'Aquarius':
      return {
        general: 'Air sign Navamsa indicates intellectual approach to spirituality.',
        timing: 'Mercury transits bring periods of spiritual insight.',
        recommendation: 'Balance intellectual understanding with devotional practice.'
      };
    default:
      return {
        general: 'Water sign Navamsa shows deep intuitive connection to spirituality.',
        timing: 'Moon transits enhance spiritual receptivity.',
        recommendation: 'Trust your intuition while maintaining practical grounding.'
      };
  }
}