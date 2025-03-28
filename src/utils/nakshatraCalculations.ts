// Nakshatras in order
const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const nakshatraInfo = {
  'Ashwini': {
    deity: 'Ashwini Kumaras',
    ruling_planet: 'Ketu',
    characteristics: ['Swift', 'Healing', 'Youthful', 'Adventurous']
  },
  'Bharani': {
    deity: 'Yama',
    ruling_planet: 'Venus',
    characteristics: ['Determined', 'Resourceful', 'Transformative', 'Intense']
  },
  'Krittika': {
    deity: 'Agni',
    ruling_planet: 'Sun',
    characteristics: ['Sharp', 'Ambitious', 'Focused', 'Radiant']
  },
  'Rohini': {
    deity: 'Brahma',
    ruling_planet: 'Moon',
    characteristics: ['Creative', 'Nurturing', 'Sensual', 'Artistic']
  },
  'Mrigashira': {
    deity: 'Soma',
    ruling_planet: 'Mars',
    characteristics: ['Gentle', 'Searching', 'Adaptable', 'Curious']
  },
  'Ardra': {
    deity: 'Rudra',
    ruling_planet: 'Rahu',
    characteristics: ['Passionate', 'Intense', 'Transformative', 'Powerful']
  },
  'Punarvasu': {
    deity: 'Aditi',
    ruling_planet: 'Jupiter',
    characteristics: ['Wise', 'Generous', 'Optimistic', 'Restoring']
  },
  'Pushya': {
    deity: 'Brihaspati',
    ruling_planet: 'Saturn',
    characteristics: ['Nurturing', 'Protective', 'Traditional', 'Loyal']
  },
  'Ashlesha': {
    deity: 'Naga',
    ruling_planet: 'Mercury',
    characteristics: ['Mystical', 'Intuitive', 'Healing', 'Magnetic']
  },
  'Magha': {
    deity: 'Pitris',
    ruling_planet: 'Ketu',
    characteristics: ['Royal', 'Ambitious', 'Proud', 'Leadership']
  },
  'Purva Phalguni': {
    deity: 'Bhaga',
    ruling_planet: 'Venus',
    characteristics: ['Creative', 'Romantic', 'Playful', 'Charming']
  },
  'Uttara Phalguni': {
    deity: 'Aryaman',
    ruling_planet: 'Sun',
    characteristics: ['Social', 'Diplomatic', 'Balanced', 'Harmonious']
  },
  'Hasta': {
    deity: 'Savitar',
    ruling_planet: 'Moon',
    characteristics: ['Skilled', 'Practical', 'Resourceful', 'Healing']
  },
  'Chitra': {
    deity: 'Vishwakarma',
    ruling_planet: 'Mars',
    characteristics: ['Artistic', 'Beautiful', 'Innovative', 'Talented']
  },
  'Swati': {
    deity: 'Vayu',
    ruling_planet: 'Rahu',
    characteristics: ['Independent', 'Adaptable', 'Spiritual', 'Free']
  },
  'Vishakha': {
    deity: 'Indra-Agni',
    ruling_planet: 'Jupiter',
    characteristics: ['Purposeful', 'Focused', 'Ambitious', 'Determined']
  },
  'Anuradha': {
    deity: 'Mitra',
    ruling_planet: 'Saturn',
    characteristics: ['Friendly', 'Successful', 'Devoted', 'Balanced']
  },
  'Jyeshtha': {
    deity: 'Indra',
    ruling_planet: 'Mercury',
    characteristics: ['Courageous', 'Senior', 'Protective', 'Leadership']
  },
  'Mula': {
    deity: 'Nirriti',
    ruling_planet: 'Ketu',
    characteristics: ['Destructive', 'Transformative', 'Deep', 'Spiritual']
  },
  'Purva Ashadha': {
    deity: 'Apas',
    ruling_planet: 'Venus',
    characteristics: ['Purifying', 'Energetic', 'Invincible', 'Victorious']
  },
  'Uttara Ashadha': {
    deity: 'Vishwadevas',
    ruling_planet: 'Sun',
    characteristics: ['Universal', 'Balanced', 'Wise', 'Victorious']
  },
  'Shravana': {
    deity: 'Vishnu',
    ruling_planet: 'Moon',
    characteristics: ['Learning', 'Wisdom', 'Fame', 'Devotion']
  },
  'Dhanishta': {
    deity: 'Vasus',
    ruling_planet: 'Mars',
    characteristics: ['Wealthy', 'Musical', 'Swift', 'Generous']
  },
  'Shatabhisha': {
    deity: 'Varuna',
    ruling_planet: 'Rahu',
    characteristics: ['Healing', 'Mystical', 'Scientific', 'Independent']
  },
  'Purva Bhadrapada': {
    deity: 'Ajaikapada',
    ruling_planet: 'Jupiter',
    characteristics: ['Fiery', 'Intense', 'Transformative', 'Spiritual']
  },
  'Uttara Bhadrapada': {
    deity: 'Ahirbudhnya',
    ruling_planet: 'Saturn',
    characteristics: ['Wise', 'Balanced', 'Spiritual', 'Detached']
  },
  'Revati': {
    deity: 'Pushan',
    ruling_planet: 'Mercury',
    characteristics: ['Nurturing', 'Spiritual', 'Gentle', 'Prosperous']
  }
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

// Calculate Nakshatra
export function calculateNakshatra(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  nakshatra: string;
  pada: number;
  deity: string;
  ruling_planet: string;
  characteristics: string[];
  interpretation: {
    general: string;
    career: string;
    relationships: string;
    spirituality: string;
  };
} {
  // Calculate Moon's position
  const moonLongitude = calculateMoonPosition(birthDateTime);
  
  // Calculate Nakshatra index (0-26)
  const nakshatraLength = 360 / 27;
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraLength);
  
  // Calculate Pada (1-4)
  const longitudeInNakshatra = moonLongitude - (nakshatraIndex * nakshatraLength);
  const pada = Math.floor(longitudeInNakshatra * 4 / nakshatraLength) + 1;
  
  // Get Nakshatra name
  const nakshatra = nakshatras[nakshatraIndex];
  
  // Get Nakshatra info
  const info = nakshatraInfo[nakshatra as keyof typeof nakshatraInfo];
  
  // Generate interpretation
  const interpretation = generateInterpretation(nakshatra, pada);

  return {
    nakshatra,
    pada,
    deity: info.deity,
    ruling_planet: info.ruling_planet,
    characteristics: info.characteristics,
    interpretation
  };
}

// Generate interpretation based on Nakshatra and Pada
function generateInterpretation(nakshatra: string, pada: number): {
  general: string;
  career: string;
  relationships: string;
  spirituality: string;
} {
  const interpretations: { [key: string]: {
    general: string;
    career: string;
    relationships: string;
    spirituality: string;
  }} = {
    'Ashwini': {
      general: "You possess swift action, healing abilities, and a youthful spirit.",
      career: "Excellence in medicine, sports, or quick-paced professions.",
      relationships: "Dynamic and adventurous in relationships, seeking active partners.",
      spirituality: "Spiritual healing and swift progress on the spiritual path."
    },
    'Bharani': {
      general: "You have transformative power and deep resourcefulness.",
      career: "Success in research, psychology, or transformative fields.",
      relationships: "Intense and passionate relationships with deep connections.",
      spirituality: "Deep spiritual transformation and regeneration."
    }
    // Add interpretations for all nakshatras...
  };

  const defaultInterpretation = {
    general: `Born in ${nakshatra} (Pada ${pada}), you possess unique qualities that shape your life path.`,
    career: "Your Nakshatra indicates natural talents and career opportunities aligned with your cosmic blueprint.",
    relationships: "Understanding your Nakshatra helps in navigating relationships and finding compatible partners.",
    spirituality: "Your birth star reveals your spiritual inclinations and path to self-realization."
  };

  return interpretations[nakshatra] || defaultInterpretation;
}