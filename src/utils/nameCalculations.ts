// Convert name to numerical value using numerology principles
function getNameNumber(name: string): number {
  const numerologyValues: { [key: string]: number } = {
    'a': 1, 'j': 1, 's': 1,
    'b': 2, 'k': 2, 't': 2,
    'c': 3, 'l': 3, 'u': 3,
    'd': 4, 'm': 4, 'v': 4,
    'e': 5, 'n': 5, 'w': 5,
    'f': 6, 'o': 6, 'x': 6,
    'g': 7, 'p': 7, 'y': 7,
    'h': 8, 'q': 8, 'z': 8,
    'i': 9, 'r': 9
  };

  return name.toLowerCase()
    .split('')
    .filter(char => /[a-z]/.test(char))
    .map(char => numerologyValues[char] || 0)
    .reduce((sum, num) => sum + num, 0);
}

// Calculate destiny number (reduced to single digit)
function getDestinyNumber(number: number): number {
  if (number <= 9) return number;
  return getDestinyNumber(
    number.toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0)
  );
}

// Calculate compatibility aspects
function calculateAspects(name1: string, name2: string): {
  name: string;
  score: number;
  description: string;
}[] {
  const num1 = getDestinyNumber(getNameNumber(name1));
  const num2 = getDestinyNumber(getNameNumber(name2));

  // Compatibility matrices for different aspects
  const emotionalMatrix = [
    [90, 65, 75, 45, 85, 55, 65, 70, 80],
    [65, 85, 60, 75, 55, 90, 45, 65, 70],
    [75, 60, 85, 65, 70, 50, 85, 45, 75],
    [45, 75, 65, 90, 60, 75, 55, 85, 50],
    [85, 55, 70, 60, 85, 65, 70, 50, 90],
    [55, 90, 50, 75, 65, 85, 60, 75, 45],
    [65, 45, 85, 55, 70, 60, 90, 65, 75],
    [70, 65, 45, 85, 50, 75, 65, 85, 60],
    [80, 70, 75, 50, 90, 45, 75, 60, 85]
  ];

  const intellectualMatrix = [
    [85, 70, 65, 55, 75, 60, 80, 45, 90],
    [70, 90, 55, 80, 45, 85, 65, 75, 50],
    [65, 55, 85, 70, 85, 45, 75, 60, 80],
    [55, 80, 70, 85, 60, 75, 45, 90, 65],
    [75, 45, 85, 60, 90, 70, 65, 55, 75],
    [60, 85, 45, 75, 70, 85, 55, 80, 45],
    [80, 65, 75, 45, 65, 55, 85, 70, 90],
    [45, 75, 60, 90, 55, 80, 70, 85, 60],
    [90, 50, 80, 65, 75, 45, 90, 60, 85]
  ];

  const practicalMatrix = [
    [80, 75, 60, 70, 45, 85, 55, 90, 65],
    [75, 85, 70, 45, 90, 55, 80, 65, 75],
    [60, 70, 90, 85, 65, 75, 45, 55, 80],
    [70, 45, 85, 80, 75, 60, 90, 70, 45],
    [45, 90, 65, 75, 85, 70, 55, 80, 90],
    [85, 55, 75, 60, 70, 90, 65, 45, 55],
    [55, 80, 45, 90, 55, 65, 85, 75, 80],
    [90, 65, 55, 70, 80, 45, 75, 80, 65],
    [65, 75, 80, 45, 90, 55, 80, 65, 85]
  ];

  // Adjust indices since arrays are 0-based but destiny numbers are 1-based
  const i = num1 - 1;
  const j = num2 - 1;

  return [
    {
      name: 'Emotional Compatibility',
      score: emotionalMatrix[i][j],
      description: 'How well you connect emotionally and understand each other\'s feelings.'
    },
    {
      name: 'Intellectual Compatibility',
      score: intellectualMatrix[i][j],
      description: 'Your ability to communicate and share ideas effectively.'
    },
    {
      name: 'Practical Compatibility',
      score: practicalMatrix[i][j],
      description: 'How well you work together in daily life and handle responsibilities.'
    }
  ];
}

// Get interpretation based on overall score
function getInterpretation(score: number): {
  level: string;
  description: string;
  recommendation: string;
} {
  if (score >= 85) {
    return {
      level: 'Excellent',
      description: 'You have a naturally harmonious connection with strong potential for a lasting relationship.',
      recommendation: 'This is a highly favorable match. Focus on maintaining open communication and mutual understanding.'
    };
  } else if (score >= 70) {
    return {
      level: 'Very Good',
      description: 'Your names indicate strong compatibility with good potential for growth together.',
      recommendation: 'Build on your natural compatibility by sharing experiences and supporting each other\'s goals.'
    };
  } else if (score >= 55) {
    return {
      level: 'Good',
      description: 'You have a positive connection with room for developing deeper understanding.',
      recommendation: 'Work on strengthening communication and finding common ground in your differences.'
    };
  } else if (score >= 40) {
    return {
      level: 'Average',
      description: 'Your compatibility shows potential but may require effort to maintain harmony.',
      recommendation: 'Focus on developing patience and understanding of each other\'s perspectives.'
    };
  } else {
    return {
      level: 'Challenging',
      description: 'Your names indicate some natural differences that may require extra attention.',
      recommendation: 'Success is possible with conscious effort, understanding, and willingness to compromise.'
    };
  }
}

// Main calculation function
export function calculateNameCompatibility(name1: string, name2: string): {
  score: number;
  interpretation: {
    level: string;
    description: string;
    recommendation: string;
  };
  aspects: {
    name: string;
    score: number;
    description: string;
  }[];
} {
  const aspects = calculateAspects(name1, name2);
  const overallScore = Math.round(
    aspects.reduce((sum, aspect) => sum + aspect.score, 0) / aspects.length
  );

  return {
    score: overallScore,
    interpretation: getInterpretation(overallScore),
    aspects
  };
}