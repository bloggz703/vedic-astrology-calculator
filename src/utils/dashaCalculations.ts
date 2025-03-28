// Dasha periods for each planet in years
const dashaPeriods = {
  'Ketu': 7,
  'Venus': 20,
  'Sun': 6,
  'Moon': 10,
  'Mars': 7,
  'Rahu': 18,
  'Jupiter': 16,
  'Saturn': 19,
  'Mercury': 17
};

// Planet characteristics and interpretations
const planetaryInfluences = {
  'Ketu': {
    general: "A period of spiritual growth and detachment from material concerns. Focus on inner development.",
    career: "Career changes may occur, especially towards spiritual or research-oriented fields.",
    relationships: "A time to release past attachments and develop more spiritual connections.",
    health: "Pay attention to nervous system and practice grounding exercises."
  },
  'Venus': {
    general: "Period of comfort, luxury, and artistic expression. Focus on relationships and creativity.",
    career: "Good for careers in arts, entertainment, luxury goods, or relationship-oriented fields.",
    relationships: "Favorable for marriage, partnerships, and social connections.",
    health: "Generally good health, but watch for overindulgence."
  },
  'Sun': {
    general: "Period of recognition, authority, and self-expression. Focus on leadership and identity.",
    career: "Opportunities for advancement and leadership positions.",
    relationships: "Time to assert independence while maintaining relationships.",
    health: "Good vitality, but avoid overexertion."
  },
  'Moon': {
    general: "Period of emotional growth and intuitive development. Focus on home and family.",
    career: "Success in fields related to public service, healthcare, or emotional support.",
    relationships: "Strong emotional connections and family bonds.",
    health: "Pay attention to emotional well-being and digestive health."
  },
  'Mars': {
    general: "Period of energy, initiative, and courage. Focus on goals and ambitions.",
    career: "Success through bold action and competitive endeavors.",
    relationships: "Dynamic relationships that may require managing conflicts.",
    health: "High energy but watch for accidents and inflammation."
  },
  'Rahu': {
    general: "Period of material growth and worldly desires. Focus on innovation and unconventional paths.",
    career: "Success through new technologies or unconventional methods.",
    relationships: "Unusual or foreign connections may develop.",
    health: "Watch for stress and anxiety."
  },
  'Jupiter': {
    general: "Period of expansion, wisdom, and good fortune. Focus on learning and growth.",
    career: "Success in teaching, consulting, or advisory roles.",
    relationships: "Beneficial relationships with mentors and teachers.",
    health: "Generally good health, but avoid excess."
  },
  'Saturn': {
    general: "Period of discipline, responsibility, and hard work. Focus on long-term goals.",
    career: "Success through persistence and structured effort.",
    relationships: "Serious commitments and lasting bonds.",
    health: "Need for regular exercise and good habits."
  },
  'Mercury': {
    general: "Period of communication, learning, and adaptability. Focus on intellectual growth.",
    career: "Success in communication, writing, or analytical fields.",
    relationships: "Intellectual connections and friendships.",
    health: "Mental health is important, manage stress through activities."
  }
};

// Calculate Moon's position at birth
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

// Calculate starting Dasha planet based on Moon's position
function calculateStartingDasha(moonLongitude: number): string {
  const nakshatraLength = 360 / 27;
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraLength);
  
  // Map Nakshatra index to ruling planet
  const nakshatraRulers = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
  ];
  
  return nakshatraRulers[nakshatraIndex];
}

// Calculate Dasha periods
export function calculateDashaPeriods(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  planet: string;
  startDate: Date;
  endDate: Date;
  interpretation: {
    general: string;
    career: string;
    relationships: string;
    health: string;
  };
}[] {
  // Calculate Moon's position
  const moonLongitude = calculateMoonPosition(birthDateTime);
  
  // Get starting Dasha planet
  const startingPlanet = calculateStartingDasha(moonLongitude);
  
  // Calculate balance of first Dasha
  const nakshatraLength = 360 / 27;
  const positionInNakshatra = moonLongitude % nakshatraLength;
  const balanceFraction = 1 - (positionInNakshatra / nakshatraLength);
  
  // Generate Dasha sequence
  const dashaSequence = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
    'Rahu', 'Jupiter', 'Saturn', 'Mercury'
  ];
  
  // Find starting index
  const startIndex = dashaSequence.indexOf(startingPlanet);
  
  // Calculate periods
  const periods = [];
  let currentDate = new Date(birthDateTime);
  
  // Add first partial Dasha
  const firstPlanet = dashaSequence[startIndex];
  const firstPeriodYears = dashaPeriods[firstPlanet as keyof typeof dashaPeriods] * balanceFraction;
  
  let endDate = new Date(currentDate);
  endDate.setFullYear(endDate.getFullYear() + Math.floor(firstPeriodYears));
  endDate.setMonth(endDate.getMonth() + Math.floor((firstPeriodYears % 1) * 12));
  
  periods.push({
    planet: firstPlanet,
    startDate: new Date(currentDate),
    endDate: new Date(endDate),
    interpretation: planetaryInfluences[firstPlanet as keyof typeof planetaryInfluences]
  });
  
  currentDate = new Date(endDate);
  
  // Add remaining Dashas
  for (let i = 1; i < 9; i++) {
    const planetIndex = (startIndex + i) % 9;
    const planet = dashaSequence[planetIndex];
    const periodYears = dashaPeriods[planet as keyof typeof dashaPeriods];
    
    endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + periodYears);
    
    periods.push({
      planet,
      startDate: new Date(currentDate),
      endDate: new Date(endDate),
      interpretation: planetaryInfluences[planet as keyof typeof planetaryInfluences]
    });
    
    currentDate = new Date(endDate);
  }
  
  return periods;
}