// Yoga definitions and characteristics
const yogaDefinitions = {
  'Raj Yoga': {
    planets: ['Sun', 'Moon', 'Jupiter'],
    requirements: 'Mutual aspect or conjunction between benefic planets in angles',
    interpretation: {
      general: "Raj Yoga indicates success, authority, and leadership potential.",
      timing: "Most effective during the dasha periods of involved planets.",
      effects: [
        "Rise in social status and recognition",
        "Leadership opportunities",
        "Material success and prosperity",
        "Political or administrative power"
      ]
    }
  },
  'Dhana Yoga': {
    planets: ['Jupiter', 'Venus', 'Mercury'],
    requirements: 'Benefic planets in 2nd, 5th, or 11th houses',
    interpretation: {
      general: "Dhana Yoga brings wealth and financial prosperity.",
      timing: "Manifests strongly during Jupiter and Venus periods.",
      effects: [
        "Financial gains and wealth accumulation",
        "Business success",
        "Material comforts",
        "Good investment opportunities"
      ]
    }
  },
  'Gaja Kesari Yoga': {
    planets: ['Jupiter', 'Moon'],
    requirements: 'Jupiter in angle from Moon in good dignity',
    interpretation: {
      general: "Gaja Kesari Yoga bestows wisdom, success, and popularity.",
      timing: "Most prominent during Jupiter and Moon dashas.",
      effects: [
        "Enhanced intelligence and wisdom",
        "Success in education",
        "Social recognition",
        "Leadership qualities"
      ]
    }
  },
  'Budh-Aditya Yoga': {
    planets: ['Sun', 'Mercury'],
    requirements: 'Mercury within 12 degrees of Sun in good dignity',
    interpretation: {
      general: "Budh-Aditya Yoga grants intelligence and communication skills.",
      timing: "Strongest during Mercury and Sun periods.",
      effects: [
        "Excellence in communication",
        "Success in intellectual pursuits",
        "Good education",
        "Career success in media or writing"
      ]
    }
  },
  'Amala Yoga': {
    planets: ['Benefic planets'],
    requirements: 'Benefic planet in 10th house without malefic aspects',
    interpretation: {
      general: "Amala Yoga indicates pure fame and reputation.",
      timing: "Active during periods of the yoga-forming planet.",
      effects: [
        "Spotless reputation",
        "Success without controversy",
        "Ethical conduct",
        "Respect in society"
      ]
    }
  }
};

// Calculate planetary positions
function calculatePlanetaryPositions(birthDateTime: Date): { [key: string]: number } {
  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (birthDateTime.getTime() - epoch.getTime()) / (24 * 60 * 60 * 1000);
  
  // Simplified calculations for demonstration
  // In a real implementation, these would be more precise astronomical calculations
  return {
    'Sun': (daysSinceEpoch * 0.98564736 + 280.46646) % 360,
    'Moon': (daysSinceEpoch * 13.17639648 + 218.3164477) % 360,
    'Mars': (daysSinceEpoch * 0.524039 + 355.45332) % 360,
    'Mercury': (daysSinceEpoch * 4.092335 + 168.6562) % 360,
    'Jupiter': (daysSinceEpoch * 0.083091 + 34.35151) % 360,
    'Venus': (daysSinceEpoch * 1.602136 + 50.4161) % 360,
    'Saturn': (daysSinceEpoch * 0.033459 + 50.0774) % 360
  };
}

// Check for yoga formation
function checkYogaFormation(
  positions: { [key: string]: number },
  yogaName: string,
  requirements: string
): number {
  // Simplified yoga checking logic
  // In a real implementation, this would include more complex astronomical calculations
  let strength = 0;

  switch (yogaName) {
    case 'Raj Yoga':
      // Check for benefic planets in angles
      const angles = [0, 90, 180, 270];
      strength = angles.some(angle => 
        Math.abs(positions['Jupiter'] - angle) < 10 ||
        Math.abs(positions['Venus'] - angle) < 10
      ) ? 8 : 0;
      break;

    case 'Dhana Yoga':
      // Check for benefics in wealth houses
      const wealthHouses = [60, 150, 330];
      strength = wealthHouses.some(house =>
        Math.abs(positions['Jupiter'] - house) < 10 ||
        Math.abs(positions['Venus'] - house) < 10
      ) ? 7 : 0;
      break;

    case 'Gaja Kesari Yoga':
      // Check Jupiter-Moon relationship
      const moonJupiterDiff = Math.abs(positions['Moon'] - positions['Jupiter']);
      strength = (moonJupiterDiff < 10 || Math.abs(moonJupiterDiff - 120) < 10) ? 9 : 0;
      break;

    case 'Budh-Aditya Yoga':
      // Check Sun-Mercury conjunction
      strength = Math.abs(positions['Sun'] - positions['Mercury']) < 12 ? 8 : 0;
      break;

    case 'Amala Yoga':
      // Check 10th house benefics
      const tenthHouse = 270;
      strength = Math.abs(positions['Jupiter'] - tenthHouse) < 10 ? 7 : 0;
      break;

    default:
      strength = 0;
  }

  return strength;
}

// Calculate yoga combinations
export function calculateYogaCombinations(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  name: string;
  planets: string[];
  strength: number;
  interpretation: {
    general: string;
    timing: string;
    effects: string[];
  };
}[] {
  // Calculate planetary positions
  const positions = calculatePlanetaryPositions(birthDateTime);
  
  // Check for each yoga
  const yogas = Object.entries(yogaDefinitions)
    .map(([name, definition]) => {
      const strength = checkYogaFormation(positions, name, definition.requirements);
      
      if (strength > 0) {
        return {
          name,
          planets: definition.planets,
          strength,
          interpretation: definition.interpretation
        };
      }
      return null;
    })
    .filter((yoga): yoga is NonNullable<typeof yoga> => yoga !== null)
    .sort((a, b) => b.strength - a.strength);

  return yogas;
}