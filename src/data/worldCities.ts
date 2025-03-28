interface WorldCity {
  name: string;
  admin1: string;  // State/Province/Region
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const worldCities: WorldCity[] = [
  // United Kingdom
  { name: "London", admin1: "England", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London" },
  { name: "Manchester", admin1: "England", country: "United Kingdom", latitude: 53.4808, longitude: -2.2426, timezone: "Europe/London" },
  { name: "Birmingham", admin1: "England", country: "United Kingdom", latitude: 52.4862, longitude: -1.8904, timezone: "Europe/London" },
  { name: "Leeds", admin1: "England", country: "United Kingdom", latitude: 53.7997, longitude: -1.5492, timezone: "Europe/London" },
  { name: "Glasgow", admin1: "Scotland", country: "United Kingdom", latitude: 55.8642, longitude: -4.2518, timezone: "Europe/London" },
  { name: "Southampton", admin1: "England", country: "United Kingdom", latitude: 50.9097, longitude: -1.4044, timezone: "Europe/London" },
  { name: "Liverpool", admin1: "England", country: "United Kingdom", latitude: 53.4084, longitude: -2.9916, timezone: "Europe/London" },
  { name: "Newcastle", admin1: "England", country: "United Kingdom", latitude: 54.9783, longitude: -1.6178, timezone: "Europe/London" },
  { name: "Nottingham", admin1: "England", country: "United Kingdom", latitude: 52.9548, longitude: -1.1581, timezone: "Europe/London" },
  { name: "Sheffield", admin1: "England", country: "United Kingdom", latitude: 53.3811, longitude: -1.4701, timezone: "Europe/London" },
  { name: "Bristol", admin1: "England", country: "United Kingdom", latitude: 51.4545, longitude: -2.5879, timezone: "Europe/London" },
  { name: "Belfast", admin1: "Northern Ireland", country: "United Kingdom", latitude: 54.5973, longitude: -5.9301, timezone: "Europe/London" },
  { name: "Cardiff", admin1: "Wales", country: "United Kingdom", latitude: 51.4816, longitude: -3.1791, timezone: "Europe/London" },
  { name: "Edinburgh", admin1: "Scotland", country: "United Kingdom", latitude: 55.9533, longitude: -3.1883, timezone: "Europe/London" },
  { name: "Bedford", admin1: "England", country: "United Kingdom", latitude: 52.1361, longitude: -0.4667, timezone: "Europe/London" },
  { name: "Cambridge", admin1: "England", country: "United Kingdom", latitude: 52.2053, longitude: 0.1218, timezone: "Europe/London" },
  { name: "Oxford", admin1: "England", country: "United Kingdom", latitude: 51.7520, longitude: -1.2577, timezone: "Europe/London" },
  { name: "York", admin1: "England", country: "United Kingdom", latitude: 53.9591, longitude: -1.0815, timezone: "Europe/London" },
  { name: "Bath", admin1: "England", country: "United Kingdom", latitude: 51.3758, longitude: -2.3599, timezone: "Europe/London" },
  { name: "Brighton", admin1: "England", country: "United Kingdom", latitude: 50.8225, longitude: -0.1372, timezone: "Europe/London" },
  
  // United States
  { name: "New York", admin1: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York" },
  { name: "Los Angeles", admin1: "California", country: "United States", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles" },
  { name: "Chicago", admin1: "Illinois", country: "United States", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago" },
  { name: "Houston", admin1: "Texas", country: "United States", latitude: 29.7604, longitude: -95.3698, timezone: "America/Chicago" },
  { name: "Phoenix", admin1: "Arizona", country: "United States", latitude: 33.4484, longitude: -112.0740, timezone: "America/Phoenix" },
  { name: "Philadelphia", admin1: "Pennsylvania", country: "United States", latitude: 39.9526, longitude: -75.1652, timezone: "America/New_York" },
  { name: "San Antonio", admin1: "Texas", country: "United States", latitude: 29.4241, longitude: -98.4936, timezone: "America/Chicago" },
  { name: "San Diego", admin1: "California", country: "United States", latitude: 32.7157, longitude: -117.1611, timezone: "America/Los_Angeles" },
  { name: "Dallas", admin1: "Texas", country: "United States", latitude: 32.7767, longitude: -96.7970, timezone: "America/Chicago" },
  { name: "San Jose", admin1: "California", country: "United States", latitude: 37.3382, longitude: -121.8863, timezone: "America/Los_Angeles" },

  // India
  { name: "Mumbai", admin1: "Maharashtra", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Delhi", admin1: "Delhi", country: "India", latitude: 28.6139, longitude: 77.2090, timezone: "Asia/Kolkata" },
  { name: "Bangalore", admin1: "Karnataka", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", admin1: "Telangana", country: "India", latitude: 17.3850, longitude: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Chennai", admin1: "Tamil Nadu", country: "India", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata" },
  { name: "Kolkata", admin1: "West Bengal", country: "India", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Pune", admin1: "Maharashtra", country: "India", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad", admin1: "Gujarat", country: "India", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Jaipur", admin1: "Rajasthan", country: "India", latitude: 26.9124, longitude: 75.7873, timezone: "Asia/Kolkata" },
  { name: "Surat", admin1: "Gujarat", country: "India", latitude: 21.1702, longitude: 72.8311, timezone: "Asia/Kolkata" },

  // Australia
  { name: "Sydney", admin1: "New South Wales", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
  { name: "Melbourne", admin1: "Victoria", country: "Australia", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne" },
  { name: "Brisbane", admin1: "Queensland", country: "Australia", latitude: -27.4698, longitude: 153.0251, timezone: "Australia/Brisbane" },
  { name: "Perth", admin1: "Western Australia", country: "Australia", latitude: -31.9505, longitude: 115.8605, timezone: "Australia/Perth" },
  { name: "Adelaide", admin1: "South Australia", country: "Australia", latitude: -34.9285, longitude: 138.6007, timezone: "Australia/Adelaide" },
  { name: "Gold Coast", admin1: "Queensland", country: "Australia", latitude: -28.0167, longitude: 153.4000, timezone: "Australia/Brisbane" },
  { name: "Newcastle", admin1: "New South Wales", country: "Australia", latitude: -32.9283, longitude: 151.7817, timezone: "Australia/Sydney" },
  { name: "Canberra", admin1: "Australian Capital Territory", country: "Australia", latitude: -35.2809, longitude: 149.1300, timezone: "Australia/Sydney" },
  { name: "Wollongong", admin1: "New South Wales", country: "Australia", latitude: -34.4331, longitude: 150.8831, timezone: "Australia/Sydney" },
  { name: "Hobart", admin1: "Tasmania", country: "Australia", latitude: -42.8821, longitude: 147.3272, timezone: "Australia/Hobart" },

  // Japan
  { name: "Tokyo", admin1: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
  { name: "Osaka", admin1: "Osaka", country: "Japan", latitude: 34.6937, longitude: 135.5023, timezone: "Asia/Tokyo" },
  { name: "Yokohama", admin1: "Kanagawa", country: "Japan", latitude: 35.4437, longitude: 139.6380, timezone: "Asia/Tokyo" },
  { name: "Nagoya", admin1: "Aichi", country: "Japan", latitude: 35.1815, longitude: 136.9066, timezone: "Asia/Tokyo" },
  { name: "Sapporo", admin1: "Hokkaido", country: "Japan", latitude: 43.0618, longitude: 141.3545, timezone: "Asia/Tokyo" },
  { name: "Fukuoka", admin1: "Fukuoka", country: "Japan", latitude: 33.5902, longitude: 130.4017, timezone: "Asia/Tokyo" },
  { name: "Kobe", admin1: "Hyogo", country: "Japan", latitude: 34.6901, longitude: 135.1955, timezone: "Asia/Tokyo" },
  { name: "Kyoto", admin1: "Kyoto", country: "Japan", latitude: 35.0116, longitude: 135.7681, timezone: "Asia/Tokyo" },
  { name: "Kawasaki", admin1: "Kanagawa", country: "Japan", latitude: 35.5308, longitude: 139.7029, timezone: "Asia/Tokyo" },
  { name: "Saitama", admin1: "Saitama", country: "Japan", latitude: 35.8616, longitude: 139.6455, timezone: "Asia/Tokyo" }
];

export default worldCities;