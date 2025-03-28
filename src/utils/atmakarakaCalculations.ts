// Planetary positions and characteristics
const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const planetaryCharacteristics = {
  'Sun': {
    characteristics: ['Leadership', 'Authority', 'Self-expression', 'Divine consciousness'],
    interpretation: {
      general: "As your Atmakaraka, the Sun indicates a soul journey focused on leadership, authenticity, and self-realization.",
      karmic_lessons: "Learning to balance ego with humility and to express your true divine nature.",
      spiritual_path: "Development of self-awareness and connection to divine consciousness.",
      life_purpose: "To shine your light and inspire others through authentic leadership and creative expression."
    }
  },
  'Moon': {
    characteristics: ['Emotional wisdom', 'Nurturing', 'Intuition', 'Inner peace'],
    interpretation: {
      general: "The Moon as Atmakaraka suggests a soul journey centered on emotional wisdom and nurturing energy.",
      karmic_lessons: "Understanding and healing emotional patterns, developing emotional intelligence.",
      spiritual_path: "Cultivation of inner peace and emotional stability.",
      life_purpose: "To share emotional wisdom and create nurturing spaces for others' growth."
    }
  },
  'Mars': {
    characteristics: ['Courage', 'Initiative', 'Protection', 'Dynamic action'],
    interpretation: {
      general: "Mars as your Atmakaraka indicates a soul journey of courage, initiative, and protective action.",
      karmic_lessons: "Learning to channel energy constructively and stand up for truth.",
      spiritual_path: "Development of spiritual warrior qualities and protective service.",
      life_purpose: "To initiate positive change and protect those in need."
    }
  },
  'Mercury': {
    characteristics: ['Communication', 'Intelligence', 'Adaptability', 'Learning'],
    interpretation: {
      general: "Mercury as Atmakaraka suggests a soul journey focused on communication and intellectual growth.",
      karmic_lessons: "Developing clear communication and using knowledge wisely.",
      spiritual_path: "Integration of spiritual wisdom through study and teaching.",
      life_purpose: "To share knowledge and facilitate understanding between people."
    }
  },
  'Jupiter': {
    characteristics: ['Wisdom', 'Expansion', 'Teaching', 'Higher purpose'],
    interpretation: {
      general: "Jupiter as your Atmakaraka indicates a soul journey of expanding wisdom and spiritual teaching.",
      karmic_lessons: "Learning to balance material and spiritual abundance.",
      spiritual_path: "Development of wisdom and spiritual understanding.",
      life_purpose: "To teach and inspire others in their spiritual growth."
    }
  },
  'Venus': {
    characteristics: ['Love', 'Harmony', 'Beauty', 'Relationships'],
    interpretation: {
      general: "Venus as Atmakaraka suggests a soul journey centered on love, beauty, and harmonious relationships.",
      karmic_lessons: "Learning to balance giving and receiving love, understanding true value.",
      spiritual_path: "Cultivation of divine love and artistic expression.",
      life_purpose: "To create beauty and harmony in the world through relationships and art."
    }
  },
  'Saturn': {
    characteristics: ['Discipline', 'Responsibility', 'Wisdom', 'Structure'],
    interpretation: {
      general: "Saturn as your Atmakaraka indicates a soul journey of discipline and responsibility.",
      karmic_lessons: "Learning patience, persistence, and acceptance of life's limitations.",
      spiritual_path: "Development of spiritual discipline and service.",
      life_purpose: "To build lasting structures that serve humanity's growth."
    }
  },
  'Rahu': {
    characteristics: ['Innovation', 'Transformation', 'Desire', 'Evolution'],
    interpretation: {
      general: "Rahu as Atmakaraka suggests a soul journey of transformation and spiritual evolution.",
      karmic_lessons: "Learning to transform worldly desires into spiritual aspirations.",
      spiritual_path: "Integration of material and spiritual worlds.",
      life_purpose: "To innovate and bring new perspectives to spiritual growth."
    }
  },
  'Ketu': {
    characteristics: ['Liberation', 'Spirituality', 'Detachment', 'Enlightenment'],
    interpretation: {
      general: "Ketu as your Atmakaraka indicates a soul journey focused on spiritual liberation.",
      karmic_lessons: "Learning to balance spiritual detachment with worldly responsibilities.",
      spiritual_path: "Development of deep spiritual insight and liberation.",
      life_purpose: "To help others find spiritual liberation through detachment."
    }
  }
};

// Calculate planetary positions
function calculatePlanetaryPositions(birthDateTime: Date): { planet: string; degree: number; }[] {
  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (birthDateTime.getTime() - epoch.getTime()) / (24 * 60 * 60 * 1000);
  
  // Simplified calculations for demonstration
  // In a real implementation, these would be more precise astronomical calculations
  const positions = planets.map(planet => {
    let degree;
    switch (planet) {
      case 'Sun':
        degree = (daysSinceEpoch * 0.98564736 + 280.46646) % 360;
        break;
      case 'Moon':
        degree = (daysSinceEpoch * 13.17639648 + 218.3164477) % 360;
        break;
      case 'Mars':
        degree = (daysSinceEpoch * 0.524039 + 355.45332) % 360;
        break;
      case 'Mercury':
        degree = (daysSinceEpoch * 4.092335 + 168.6562) % 360;
        break;
      case 'Jupiter':
        degree = (daysSinceEpoch * 0.083091 + 34.35151) % 360;
        break;
      case 'Venus':
        degree = (daysSinceEpoch * 1.602136 + 50.4161) % 360;
        break;
      case 'Saturn':
        degree = (daysSinceEpoch * 0.033459 + 50.0774) % 360;
        break;
      case 'Rahu':
        degree = (360 - ((daysSinceEpoch * 0.053233 + 259.183275) % 360)) % 360;
        break;
      case 'Ketu':
        degree = ((daysSinceEpoch * 0.053233 + 259.183275) % 360);
        break;
      default:
        degree = 0;
    }
    return { planet, degree };
  });

  return positions;
}

// Calculate Atmakaraka
export function calculateAtmakaraka(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  planet: string;
  degree: number;
  interpretation: {
    general: string;
    karmic_lessons: string;
    spiritual_path: string;
    life_purpose: string;
  };
  characteristics: string[];
} {
  // Calculate positions of all planets
  const positions = calculatePlanetaryPositions(birthDateTime);
  
  // Find planet with highest degree
  const atmakaraka = positions.reduce((prev, current) => 
    (current.degree > prev.degree) ? current : prev
  );
  
  // Get characteristics and interpretation for the Atmakaraka planet
  const planetInfo = planetaryCharacteristics[atmakaraka.planet as keyof typeof planetaryCharacteristics];

  return {
    planet: atmakaraka.planet,
    degree: atmakaraka.degree,
    interpretation: planetInfo.interpretation,
    characteristics: planetInfo.characteristics
  };
}