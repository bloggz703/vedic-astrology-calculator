import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import debounce from '../utils/debounce';
import worldCities from '../data/worldCities';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const searchLocations = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Normalize search term
    const normalizedQuery = query.toLowerCase().trim();
    
    // Filter cities based on search term with improved matching
    const filteredCities = worldCities
      .filter(city => {
        const cityName = city.name.toLowerCase();
        const adminName = city.admin1.toLowerCase();
        const countryName = city.country.toLowerCase();
        const fullName = `${cityName}, ${adminName}, ${countryName}`;
        
        return cityName.includes(normalizedQuery) ||
               adminName.includes(normalizedQuery) ||
               countryName.includes(normalizedQuery) ||
               fullName.includes(normalizedQuery);
      })
      .slice(0, 15) // Show more results
      .map(city => ({
        name: `${city.name}, ${city.admin1}, ${city.country}`,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone
      }));

    setSuggestions(filteredCities);
    setIsLoading(false);
  };

  const debouncedSearch = debounce(searchLocations, 300);

  useEffect(() => {
    if (!selectedLocation) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, selectedLocation]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedLocation(null);
  };

  return (
    <div className="relative mb-20">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter city name (e.g. London, Bedford, Tokyo)"
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isLoading && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1">
          <div className="p-4 text-gray-500">Loading...</div>
        </div>
      )}

      {!isLoading && !selectedLocation && suggestions.length > 0 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1 max-h-96 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              className="w-full p-4 text-left hover:bg-sky-50 flex items-center gap-2"
              onClick={() => handleLocationSelect(location)}
            >
              <MapPin className="h-4 w-4 text-sky-600 flex-shrink-0" />
              <span className="truncate">{location.name}</span>
            </button>
          ))}
        </div>
      )}

      {!isLoading && !selectedLocation && searchTerm && suggestions.length === 0 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1">
          <div className="p-4 text-gray-500">No locations found. Try entering a city name like "London" or "Bedford"</div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;