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

// Calculate Arudha Lagna based on birth details
function calculateArudhaLagna(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): number {
  // Convert birth time to decimal hours
  const hours = birthDateTime.getHours();
  const minutes = birthDateTime.getMinutes();
  const decimalTime = hours + (minutes / 60);
  
  // Calculate local sidereal time (simplified)
  const year = birthDateTime.getFullYear();
  const month = birthDateTime.getMonth() + 1;
  const day = birthDateTime.getDate();
  
  // Julian Date calculation (simplified)
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 
             Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Calculate sidereal time
  const t = (jd - 2451545.0) / 36525.0;
  const lst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
             longitude + (0.000387933 * t * t) - (t * t * t / 38710000.0);
  
  // Normalize to 0-360 degrees
  const normalizedLst = ((lst % 360) + 360) % 360;
  
  // Calculate ascendant
  const ascendant = normalizedLst + (decimalTime * 15) - 
                    (latitude * Math.cos(normalizedLst * Math.PI / 180));
  
  // Get house position (1-12)
  return Math.floor(ascendant / 30) + 1;
}

// Calculate Upapada Lagna based on birth details
export function calculateUpapadaLagna(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  upapadaSign: string;
  lordOfUpapada: string;
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
  // Calculate Arudha Lagna
  const arudhaLagnaHouse = calculateArudhaLagna(birthDateTime, latitude, longitude);
  
  // Calculate Upapada Lagna (12th from Arudha Lagna)
  const upapadaHouse = ((arudhaLagnaHouse + 11) % 12) + 1;
  
  // Get zodiac sign for Upapada Lagna
  const upapadaSign = zodiacSigns[upapadaHouse - 1];
  const lordOfUpapada = planetaryLords[upapadaSign as keyof typeof planetaryLords];

  // Generate aspects based on the sign and lord
  const aspects = generateAspects(upapadaSign, lordOfUpapada);

  // Generate interpretation based on the sign
  const interpretation = generateInterpretation(upapadaSign);

  return {
    upapadaSign,
    lordOfUpapada,
    aspects,
    interpretation
  };
}

// Generate planetary aspects based on sign and lord
function generateAspects(sign: string, lord: string): {
  planet: string;
  aspect: string;
  influence: string;
}[] {
  const baseAspects = [
    {
      planet: lord,
      aspect: `Lord of ${sign}`,
      influence: `Primary influence on marriage and relationships through ${lord}'s qualities`
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
        influence: 'Brings leadership and vitality to relationships'
      });
      break;
    case 'Taurus':
    case 'Virgo':
    case 'Capricorn':
      baseAspects.push({
        planet: 'Saturn',
        aspect: 'Trine to Earth signs',
        influence: 'Adds stability and longevity to partnerships'
      });
      break;
    case 'Gemini':
    case 'Libra':
    case 'Aquarius':
      baseAspects.push({
        planet: 'Mercury',
        aspect: 'Trine to Air signs',
        influence: 'Enhances communication and intellectual connection'
      });
      break;
    default:
      baseAspects.push({
        planet: 'Moon',
        aspect: 'Trine to Water signs',
        influence: 'Deepens emotional bonds and intuitive connection'
      });
  }

  return baseAspects;
}

// Generate interpretation based on sign
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
        general: 'Your Upapada Lagna in a fire sign indicates passionate and dynamic relationships.',
        timing: 'Marriage possibilities are strong during Jupiter transits to fire signs.',
        recommendation: 'Focus on balancing independence with partnership needs.'
      };
    case 'Taurus':
    case 'Virgo':
    case 'Capricorn':
      return {
        general: 'Earth sign Upapada Lagna suggests stable and practical approach to relationships.',
        timing: 'Venus transits to earth signs may bring marriage opportunities.',
        recommendation: 'Work on emotional expression while maintaining stability.'
      };
    case 'Gemini':
    case 'Libra':
    case 'Aquarius':
      return {
        general: 'Air sign Upapada indicates intellectual compatibility is important in relationships.',
        timing: 'Mercury and Venus transits bring favorable periods for marriage.',
        recommendation: 'Balance mental connection with emotional depth.'
      };
    default:
      return {
        general: 'Water sign Upapada shows emotional depth and intuitive connection in relationships.',
        timing: 'Moon transits to water signs activate marriage possibilities.',
        recommendation: 'Focus on emotional boundaries while maintaining sensitivity.'
      };
  }
}