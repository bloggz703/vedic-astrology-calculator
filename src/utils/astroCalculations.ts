// Zodiac signs in order
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Nakshatras in order
const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

// Ayanamsa value for Lahiri (most commonly used in Vedic astrology)
const AYANAMSA = 23.15;

// Convert degrees to radians
function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

// Convert radians to degrees
function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

// Normalize angle to 0-360 degrees
function normalizeAngle(angle: number): number {
  angle = angle % 360;
  return angle < 0 ? angle + 360 : angle;
}

// Calculate Julian Date
function calculateJulianDate(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const y = month > 2 ? year : year - 1;
  const m = month > 2 ? month : month + 12;
  const d = day + hour/24 + minute/1440 + second/86400;

  const a = Math.floor(y/100);
  const b = 2 - a + Math.floor(a/4);
  
  const jd = Math.floor(365.25 * (y + 4716)) +
            Math.floor(30.6001 * (m + 1)) +
            d + b - 1524.5;

  return jd;
}

// Calculate sidereal time
function calculateSiderealTime(date: Date, longitude: number): number {
  const jd = calculateJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;
  
  // Greenwich sidereal time at 0h UT
  let theta = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
              0.000387933 * T * T - T * T * T / 38710000.0;
  
  // Add longitude to get local sidereal time
  theta = theta + longitude;
  
  return normalizeAngle(theta);
}

// Calculate Sun's position
function calculateSunPosition(date: Date): number {
  const jd = calculateJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;
  
  // Mean elements
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  
  // Sun's equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(toRadians(M)) +
           (0.019993 - 0.000101 * T) * Math.sin(toRadians(2 * M)) +
           0.000289 * Math.sin(toRadians(3 * M));
  
  // Sun's true longitude
  const L = L0 + C;
  
  // Convert to sidereal longitude (apply ayanamsa)
  return normalizeAngle(L - AYANAMSA);
}

// Calculate Ascendant (Rising Sign)
function calculateAscendant(date: Date, latitude: number, longitude: number): string {
  // Calculate local sidereal time
  const lst = calculateSiderealTime(date, longitude);
  
  // Calculate Sun's position
  const sunLong = calculateSunPosition(date);
  
  // Convert latitude to radians
  const latRad = toRadians(latitude);
  
  // Calculate obliquity of ecliptic
  const jd = calculateJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;
  const eps = 23.43929111 - 0.013004167 * T - 0.000000164 * T * T + 0.000000503 * T * T * T;
  const epsRad = toRadians(eps);
  
  // Calculate ascendant
  let ascendant = toDegrees(Math.atan2(
    Math.cos(toRadians(lst)),
    -(Math.sin(toRadians(lst)) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad))
  ));
  
  // Normalize and adjust for ayanamsa
  ascendant = normalizeAngle(ascendant - AYANAMSA);
  
  // Convert to zodiac sign
  const signIndex = Math.floor(ascendant / 30);
  return zodiacSigns[signIndex];
}

// Calculate Moon's position
function calculateMoonPosition(date: Date): number {
  const jd = calculateJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;
  
  // Mean elements
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841.0 - T * T * T * T / 65194000.0;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868.0 - T * T * T * T / 113065000.0;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000.0;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699.0 - T * T * T * T / 14712000.0;
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000.0 + T * T * T * T / 863310000.0;

  // Periodic perturbations
  let dL = 6288.016 * Math.sin(toRadians(Mp)) +
          1274.242 * Math.sin(toRadians(2 * D - Mp)) +
          658.314 * Math.sin(toRadians(2 * D)) +
          214.818 * Math.sin(toRadians(2 * Mp));

  dL = dL / 1000000.0 * 360.0;

  let longitude = normalizeAngle(Lp + dL);
  
  // Apply ayanamsa correction for Vedic astrology
  longitude = normalizeAngle(longitude - AYANAMSA);
  
  return longitude;
}

// Calculate Moon sign and nakshatra
function calculateMoonSign(date: Date, latitude: number, longitude: number): {
  sign: string;
  nakshatra: string;
  pada: number;
} {
  const moonLongitude = calculateMoonPosition(date);
  
  // Calculate sign
  const signIndex = Math.floor(moonLongitude / 30);
  const sign = zodiacSigns[signIndex];
  
  // Calculate nakshatra
  const nakshatraIndex = Math.floor(moonLongitude * 27 / 360);
  const nakshatra = nakshatras[nakshatraIndex];
  
  // Calculate pada (1-4)
  const longitudeInNakshatra = moonLongitude - (nakshatraIndex * 360 / 27);
  const pada = Math.floor(longitudeInNakshatra * 4 / (360 / 27)) + 1;
  
  return {
    sign,
    nakshatra,
    pada
  };
}

// Get ruling planet for a sign
function getRulingPlanet(sign: string): string {
  const rulerships = {
    'Aries': 'Mars',
    'Taurus': 'Venus',
    'Gemini': 'Mercury',
    'Cancer': 'Moon',
    'Leo': 'Sun',
    'Virgo': 'Mercury',
    'Libra': 'Venus',
    'Scorpio': 'Mars',
    'Sagittarius': 'Jupiter',
    'Capricorn': 'Saturn',
    'Aquarius': 'Saturn',
    'Pisces': 'Jupiter'
  };
  return rulerships[sign as keyof typeof rulerships];
}

// Get sign characteristics
function getSignCharacteristics(sign: string): {
  element: string;
  quality: string;
  characteristics: string[];
} {
  const signInfo = {
    'Aries': {
      element: 'Fire',
      quality: 'Cardinal',
      characteristics: ['Leadership', 'Courage', 'Energy', 'Initiative']
    },
    'Taurus': {
      element: 'Earth',
      quality: 'Fixed',
      characteristics: ['Stability', 'Reliability', 'Sensuality', 'Determination']
    },
    'Gemini': {
      element: 'Air',
      quality: 'Mutable',
      characteristics: ['Adaptability', 'Communication', 'Curiosity', 'Versatility']
    },
    'Cancer': {
      element: 'Water',
      quality: 'Cardinal',
      characteristics: ['Nurturing', 'Emotional depth', 'Protection', 'Intuition']
    },
    'Leo': {
      element: 'Fire',
      quality: 'Fixed',
      characteristics: ['Creativity', 'Leadership', 'Confidence', 'Generosity']
    },
    'Virgo': {
      element: 'Earth',
      quality: 'Mutable',
      characteristics: ['Analysis', 'Precision', 'Service', 'Improvement']
    },
    'Libra': {
      element: 'Air',
      quality: 'Cardinal',
      characteristics: ['Balance', 'Harmony', 'Justice', 'Partnership']
    },
    'Scorpio': {
      element: 'Water',
      quality: 'Fixed',
      characteristics: ['Intensity', 'Transformation', 'Power', 'Mystery']
    },
    'Sagittarius': {
      element: 'Fire',
      quality: 'Mutable',
      characteristics: ['Adventure', 'Philosophy', 'Optimism', 'Freedom']
    },
    'Capricorn': {
      element: 'Earth',
      quality: 'Cardinal',
      characteristics: ['Ambition', 'Discipline', 'Responsibility', 'Achievement']
    },
    'Aquarius': {
      element: 'Air',
      quality: 'Fixed',
      characteristics: ['Innovation', 'Originality', 'Humanitarianism', 'Independence']
    },
    'Pisces': {
      element: 'Water',
      quality: 'Mutable',
      characteristics: ['Compassion', 'Spirituality', 'Imagination', 'Healing']
    }
  };
  return signInfo[sign as keyof typeof signInfo];
}

export {
  calculateAscendant,
  calculateMoonSign,
  getRulingPlanet,
  getSignCharacteristics,
  calculateSunPosition // Added this export
};