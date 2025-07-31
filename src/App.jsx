import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, Moon, Sun, Globe, Users, MapPin, Calendar, Car, Phone, Map, ChefHat, Clock, Utensils, ArrowLeft, Camera, Star } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

// API utility functions with error handling
const API_BASE = 'https://restcountries.com/v3.1';
const MEAL_API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// Country backgrounds and tourist attractions data
const countryData = {
  'United States': {
    background: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Statue of Liberty', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80' },
      { name: 'Grand Canyon', image: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { name: 'Times Square', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Golden Gate Bridge', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'United Kingdom': {
    background: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Big Ben', image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { name: 'Tower Bridge', image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { name: 'Stonehenge', image: 'https://images.unsplash.com/photo-1617374596035-0ec0950268a2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { name: 'Edinburgh Castle', image: 'https://plus.unsplash.com/premium_photo-1697730001925-6d5102374d43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWRpbmJ1cmdoJTIwY2FzdGxlfGVufDB8fDB8fHww' }
    ]
  },
  'France': {
    background: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJhbmNlfGVufDB8fDB8fHww',
    attractions: [
      { name: 'Eiffel Tower', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Louvre Museum', image: 'https://images.unsplash.com/photo-1587648415693-4a5362b2ce41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bG91dnJlJTIwbXVzZXVtfGVufDB8fDB8fHww' },
      { name: 'Notre Dame', image: 'https://images.unsplash.com/photo-1574870310056-79c4b3c7d449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90cmUlMjBkYW1lfGVufDB8fDB8fHww' },
      { name: 'Palace of Versailles', image: 'https://plus.unsplash.com/premium_photo-1661962571049-792ae9be2d79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFsYWNlJTIwb2YlMjB2ZXJzYWlsbGVzfGVufDB8fDB8fHww' }
    ]
  },
  'Germany': {
    background: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Brandenburg Gate', image: 'https://images.unsplash.com/photo-1538675985853-aadd8dd44346?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Neuschwanstein Castle', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Cologne Cathedral', image: 'https://images.unsplash.com/photo-1558564827-bf9e4ac17fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Black Forest', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Japan': {
    background: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Mount Fuji', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Tokyo Tower', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Kyoto Temples', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Cherry Blossoms', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Canada': {
    background: 'https://images.unsplash.com/photo-1503614472-8c93d56cd96b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Niagara Falls', image: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Banff National Park', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'CN Tower', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Lake Louise', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Italy': {
    background: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Colosseum', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Leaning Tower of Pisa', image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Venice Canals', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Trevi Fountain', image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Spain': {
    background: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Sagrada Familia', image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Alhambra', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Park Güell', image: 'https://images.unsplash.com/photo-1564501049412-d89a32dce16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Flamenco Shows', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Australia': {
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Sydney Opera House', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Great Barrier Reef', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Uluru (Ayers Rock)', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Blue Mountains', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  'Brazil': {
    background: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Christ the Redeemer', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Sugarloaf Mountain', image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Iguazu Falls', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Copacabana Beach', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d4d6d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  },
  
  
};

// Default fallback data
const getCountryData = (countryName) => {
  return countryData[countryName] || {
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    attractions: [
      { name: 'Historic Landmark', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Natural Wonder', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Cultural Site', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Scenic View', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ]
  };
};

// Fallback countries data in case API fails
const fallbackCountries = [
  {
    name: { common: "United States", official: "United States of America" },
    cca2: "US", cca3: "USA",
    region: "Americas", subregion: "North America",
    capital: ["Washington, D.C."],
    population: 331449281,
    area: 9372610,
    flags: { png: "https://flagcdn.com/w320/us.png", svg: "https://flagcdn.com/us.svg" },
    languages: { eng: "English" },
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    timezones: ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"],
    latlng: [38.0, -97.0],
    independent: true,
    unMember: true,
    startOfWeek: "sunday",
    car: { side: "right" },
    idd: { root: "+1", suffixes: ["201", "202", "203"] }
  },
  {
    name: { common: "United Kingdom", official: "United Kingdom of Great Britain and Northern Ireland" },
    cca2: "GB", cca3: "GBR",
    region: "Europe", subregion: "Northern Europe",
    capital: ["London"],
    population: 67886011,
    area: 242495,
    flags: { png: "https://flagcdn.com/w320/gb.png", svg: "https://flagcdn.com/gb.svg" },
    languages: { eng: "English" },
    currencies: { GBP: { name: "British pound", symbol: "£" } },
    timezones: ["UTC-08:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC", "UTC+01:00", "UTC+02:00", "UTC+06:00"],
    latlng: [54.0, -2.0],
    independent: true,
    unMember: true,
    startOfWeek: "monday",
    car: { side: "left" },
    idd: { root: "+4", suffixes: ["4"] }
  },
  {
    name: { common: "France", official: "French Republic" },
    cca2: "FR", cca3: "FRA",
    region: "Europe", subregion: "Western Europe",
    capital: ["Paris"],
    population: 67391582,
    area: 551695,
    flags: { png: "https://flagcdn.com/w320/fr.png", svg: "https://flagcdn.com/fr.svg" },
    languages: { fra: "French" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    timezones: ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+11:00", "UTC+12:00"],
    latlng: [46.0, 2.0],
    independent: true,
    unMember: true,
    startOfWeek: "monday",
    car: { side: "right" },
    idd: { root: "+3", suffixes: ["3"] },
    borders: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
  },
  {
    name: { common: "Germany", official: "Federal Republic of Germany" },
    cca2: "DE", cca3: "DEU",
    region: "Europe", subregion: "Central Europe",
    capital: ["Berlin"],
    population: 83240525,
    area: 357114,
    flags: { png: "https://flagcdn.com/w320/de.png", svg: "https://flagcdn.com/de.svg" },
    languages: { deu: "German" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    timezones: ["UTC+01:00"],
    latlng: [51.0, 9.0],
    independent: true,
    unMember: true,
    startOfWeek: "monday",
    car: { side: "right" },
    idd: { root: "+4", suffixes: ["9"] },
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"]
  },
  {
    name: { common: "Japan", official: "Japan" },
    cca2: "JP", cca3: "JPN",
    region: "Asia", subregion: "Eastern Asia",
    capital: ["Tokyo"],
    population: 125836021,
    area: 377930,
    flags: { png: "https://flagcdn.com/w320/jp.png", svg: "https://flagcdn.com/jp.svg" },
    languages: { jpn: "Japanese" },
    currencies: { JPY: { name: "Japanese yen", symbol: "¥" } },
    timezones: ["UTC+09:00"],
    latlng: [36.0, 138.0],
    independent: true,
    unMember: true,
    startOfWeek: "sunday",
    car: { side: "left" },
    idd: { root: "+8", suffixes: ["1"] }
  },
  {
    name: { common: "Canada", official: "Canada" },
    cca2: "CA", cca3: "CAN",
    region: "Americas", subregion: "North America",
    capital: ["Ottawa"],
    population: 38005238,
    area: 9984670,
    flags: { png: "https://flagcdn.com/w320/ca.png", svg: "https://flagcdn.com/ca.svg" },
    languages: { eng: "English", fra: "French" },
    currencies: { CAD: { name: "Canadian dollar", symbol: "$" } },
    timezones: ["UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:30"],
    latlng: [60.0, -95.0],
    independent: true,
    unMember: true,
    startOfWeek: "sunday",
    car: { side: "right" },
    idd: { root: "+1", suffixes: [""] },
    borders: ["USA"]
  }
];

const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${API_BASE}/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : fallbackCountries;
  } catch (error) {
    console.warn('Failed to fetch countries from API, using fallback data:', error);
    return fallbackCountries;
  }
};

const searchCountryByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE}/name/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Search failed, filtering fallback data:', error);
    return fallbackCountries.filter(country => 
      country.name.common.toLowerCase().includes(name.toLowerCase()) ||
      country.name.official.toLowerCase().includes(name.toLowerCase())
    );
  }
};

const filterByRegion = async (region) => {
  try {
    const response = await fetch(`${API_BASE}/region/${encodeURIComponent(region)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Filter failed, filtering fallback data:', error);
    return fallbackCountries.filter(country => 
      country.region.toLowerCase() === region.toLowerCase()
    );
  }
};

// TheMealDB API functions
const fetchMealsByCountry = async (country) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/filter.php?a=${encodeURIComponent(country)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching meals:', error);
    return [];
  }
};

const fetchMealDetails = async (mealId) => {
  try {
    const response = await fetch(`${MEAL_API_BASE}/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 dark:border-gray-700/50"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" />
      )}
    </button>
  );
};

// Search Bar Component
// Search Bar Component
const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-mg mx-auto flex">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          className="w-full pl-10 pr-4 py-3 rounded-l-lg border border-white/30 dark:border-gray-600/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-lg"
        />
      </div>
      <button
        onClick={onSearch}
        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg border border-blue-600 hover:border-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({ onFilter, selectedRegion }) => {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  return (
    <select
      value={selectedRegion}
      onChange={(e) => onFilter(e.target.value)}
      className="px-4 py-3 rounded-lg border border-white/30 dark:border-gray-600/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-lg "
    >
      {regions.map(region => (
        <option key={region} value={region}>{region}</option>
      ))}
    </select>
  );
};

// Tourist Attractions Component
const TouristAttractions = ({ countryName }) => {
  const countryInfo = getCountryData(countryName);
  
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Camera className="w-6 h-6 mr-2 text-pink-400" />
        Popular Tourist Attractions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {countryInfo.attractions.map((attraction, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-semibold text-lg flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                {attraction.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Traditional Cuisine Component
const TraditionalCuisine = ({ countryName }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Country name mapping for TheMealDB API
  const getApiCountryName = (country) => {
    const countryMapping = {
      'United States': 'American',
      'United Kingdom': 'British',
      'China': 'Chinese',
      'Italy': 'Italian',
      'France': 'French',
      'Spain': 'Spanish',
      'Germany': 'German',
      'Japan': 'Japanese',
      'India': 'Indian',
      'Mexico': 'Mexican',
      'Greece': 'Greek',
      'Thailand': 'Thai',
      'Turkey': 'Turkish',
      'Morocco': 'Moroccan',
      'Jamaica': 'Jamaican',
      'Canada': 'Canadian',
      'Russia': 'Russian',
      'Egypt': 'Egyptian',
      'Poland': 'Polish',
      'Portugal': 'Portuguese',
      'Ukraine': 'Ukrainian',
      'Vietnam': 'Vietnamese',
      'Malaysia': 'Malaysian',
      'Tunisia': 'Tunisian',
      'Croatia': 'Croatian',
      'Ireland': 'Irish',
      'Kenya': 'Kenyan',
      'Philippines': 'Filipino'
    };
    return countryMapping[country] || country;
  };

  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true);
      const apiCountryName = getApiCountryName(countryName);
      const mealsData = await fetchMealsByCountry(apiCountryName);
      setMeals(mealsData.slice(0, 6)); // Show only first 6 dishes
      setLoading(false);
    };

    if (countryName) {
      loadMeals();
    }
  }, [countryName]);

  const handleMealClick = async (meal) => {
    setSelectedMeal(meal);
    setDetailsLoading(true);
    const details = await fetchMealDetails(meal.idMeal);
    setMealDetails(details);
    setDetailsLoading(false);
  };

  const closeMealModal = () => {
    setSelectedMeal(null);
    setMealDetails(null);
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
          <ChefHat className="w-6 h-6 mr-2 text-orange-600" />
          Traditional Cuisine
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
          <ChefHat className="w-6 h-6 mr-2 text-orange-600" />
          Traditional Cuisine
        </h3>
        <p className="text-gray-300 text-center py-4">
          No traditional dishes found for this country in our database.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <ChefHat className="w-6 h-6 mr-2 text-orange-600" />
        Traditional Cuisine
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => handleMealClick(meal)}
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <h4 className="font-semibold text-white text-sm truncate">
                {meal.strMeal}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Meal Details Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30">
            <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 border-b border-gray-200/30 dark:border-gray-700/30 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                Recipe Details
              </h3>
              <button
                onClick={closeMealModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {detailsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : mealDetails ? (
                <div className="space-y-4">
                  <img
                    src={mealDetails.strMealThumb}
                    alt={mealDetails.strMeal}
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mealDetails.strMeal}
                  </h4>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-1 text-blue-600" />
                      {mealDetails.strArea}
                    </span>
                    <span className="flex items-center">
                      <ChefHat className="w-4 h-4 mr-1 text-green-600" />
                      {mealDetails.strCategory}
                    </span>
                  </div>

                  {mealDetails.strInstructions && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-purple-600" />
                        Instructions
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {mealDetails.strInstructions.slice(0, 300)}...
                      </p>
                    </div>
                  )}

                  {mealDetails.strYoutube && (
                    <a
                      href={mealDetails.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    >
                      <span className="mr-2">📺</span>
                      Watch Recipe Video
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Failed to load recipe details.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CountryCard = ({ country, onClick }) => {
  return (
    <div
      onClick={() => onClick(country)}
      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-white/20 dark:border-gray-700/50"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white dark:text-white mb-2">
          {country.name.common}
        </h3>
        <div className="space-y-1 text-gray-300 dark:text-gray-300">
          <p><span className="font-medium text-white">Region:</span> {country.region}</p>
          <p><span className="font-medium text-white">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          <p><span className="font-medium text-white">Population:</span> {country.population?.toLocaleString()}</p>
          <p><span className="font-medium text-white">Code:</span> {country.cca2}</p>
        </div>
      </div>
    </div>
  );
};

// Country Detail Full Page Component
const CountryDetailPage = ({ country, onBack, allCountries }) => {
  const countryInfo = getCountryData(country.name.common);
  
  const getBorderCountries = () => {
    if (!country.borders) return [];
    return country.borders.map(border => {
      const borderCountry = allCountries.find(c => c.cca3 === border);
      return borderCountry?.name.common || border;
    });
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ');
  };

  const getTimezones = () => {
    if (!country.timezones) return 'N/A';
    return country.timezones.join(', ');
  };

  const getMapsLink = () => {
    if (!country.latlng) return '#';
    return `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Country-specific Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        <img
          src={countryInfo.background}
          alt={`${country.name.common} landscape`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-300 border border-white/30"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Countries
        </button>
        
        {/* Country Header */}
        <div className="text-center mb-12">
          <img
            src={country.flags?.png || country.flags?.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-32 h-20 object-cover rounded-lg shadow-2xl mx-auto mb-6 border-4 border-white/30"
            loading="lazy"
          />
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            {country.name.common}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            {country.name.official}
          </p>
        </div>
        
        {/* Country Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Basic Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-blue-400" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-white"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-400" />
                  <span className="text-white"><strong>Region:</strong> {country.region}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span><strong>Population:</strong> {country.population?.toLocaleString()}</span>
                </div>
                
                <div className="text-white">
                  <strong>Subregion:</strong> {country.subregion || 'N/A'}
                </div>
                
                <div className="text-white">
                  <strong>Languages:</strong> {getLanguages()}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-white">
                  <strong>Area:</strong> {country.area?.toLocaleString()} km²
                </div>
                
                <div className="text-white">
                  <strong>Coordinates:</strong> {country.latlng?.join(', ') || 'N/A'}
                </div>
                
                <div className="flex items-center space-x-2 text-white">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span><strong>Calling Code:</strong> {country.idd?.root}{country.idd?.suffixes?.[0] || ''}</span>
                </div>
                
                <div className="text-white">
                  <strong>Currencies:</strong> {getCurrencies()}
                </div>
                
                <div className="flex items-center space-x-2 text-white">
                  <Car className="w-4 h-4 text-red-400" />
                  <span><strong>Driving Side:</strong> {country.car?.side || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            {getBorderCountries().length > 0 && (
              <div className="mt-6 text-white">
                <strong>Border Countries:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getBorderCountries().map((border, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30">
                      {border}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <a
                href={getMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600/80 hover:bg-green-600 backdrop-blur-sm text-white rounded-lg transition-all duration-300 border border-green-500/50"
              >
                <Map className="w-4 h-4" />
                <span>View on Maps</span>
              </a>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-orange-400" />
              Additional Details
            </h2>
            
            <div className="space-y-4">
              <div className="text-white">
                <strong>Timezones:</strong> {getTimezones()}
              </div>
              
              <div className="text-white">
                <strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}
              </div>
              
              <div className="text-white">
                <strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}
              </div>
              
              <div className="flex items-center space-x-2 text-white">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span><strong>Week Start:</strong> {country.startOfWeek || 'N/A'}</span>
              </div>
              
              {country.demonyms?.eng && (
                <div className="text-white">
                  <strong>Demonyms:</strong> {country.demonyms.eng.m} (male), {country.demonyms.eng.f} (female)
                </div>
              )}
              
              {country.coatOfArms?.png && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Coat of Arms</h3>
                  <img
                    src={country.coatOfArms.png}
                    alt={`Coat of Arms of ${country.name.common}`}
                    className="w-24 h-24 object-contain bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tourist Attractions Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-2xl mb-8">
          <TouristAttractions countryName={country.name.common} />
        </div>
        
        {/* Traditional Cuisine Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-2xl">
          <TraditionalCuisine countryName={country.name.common} />
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const Home = ({ countries, loading, onCountrySelect, onSearch, onFilter, searchTerm, setSearchTerm, selectedRegion }) => {
  // Ensure countries is always an array
  const safeCountries = Array.isArray(countries) ? countries : [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white dark:text-white mb-4 drop-shadow-lg">
          🌍 Country Explorer
        </h1>
        <p className="text-lg text-white/90 dark:text-gray-200 mb-8 drop-shadow-md">
          Discover countries around the world
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <SearchBar
            onSearch={onSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <FilterDropdown
            onFilter={onFilter}
            selectedRegion={selectedRegion}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {safeCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onClick={onCountrySelect}
            />
          ))}
        </div>
      )}
      
      {!loading && safeCountries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-white/80 dark:text-gray-300 drop-shadow-md">
            No countries found. Try a different search term or filter.
          </p>
        </div>
      )}
    </div>
  );
};

// Main App Component
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [error, setError] = useState(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    loadAllCountries();
  }, []);

  const loadAllCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllCountries();
      const safeData = Array.isArray(data) ? data : fallbackCountries;
      setCountries(safeData);
      setAllCountries(safeData);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to load countries. Using offline data.');
      setCountries(fallbackCountries);
      setAllCountries(fallbackCountries);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setCountries(allCountries);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchCountryByName(searchTerm);
      const safeData = Array.isArray(data) ? data : [];
      setCountries(safeData);
    } catch (error) {
      console.error('Error searching countries:', error);
      setError('Search failed. Please try again.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    setSelectedRegion(region);
    
    if (region === 'All') {
      setCountries(allCountries);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await filterByRegion(region);
      const safeData = Array.isArray(data) ? data : [];
      setCountries(safeData);
    } catch (error) {
      console.error('Error filtering countries:', error);
      setError('Filter failed. Please try again.');
      // Fallback to local filtering
      const filtered = allCountries.filter(country => 
        country.region.toLowerCase() === region.toLowerCase()
      );
      setCountries(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>
        {selectedCountry ? (
          <CountryDetailPage
            country={selectedCountry}
            onBack={handleBack}
            allCountries={allCountries}
          />
        ) : (
          <div className="min-h-screen relative overflow-hidden transition-all duration-300">
            {/* Cinematic Background for Homepage */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/90 dark:from-gray-900/95 dark:via-slate-900/90 dark:to-black/95"></div>
              <img
                src="https://images.unsplash.com/photo-1519302959554-a75be0afc82a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2826&q=80"
                alt="World Map Background"
                className="w-full h-full object-cover opacity-30 dark:opacity-20"
                loading="lazy"
              />
              {/* Animated overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-indigo-900/30 animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-4 py-8 relative z-10">
              <div className="flex justify-end mb-6">
                <ThemeToggle />
              </div>
              
              {error && (
                <div className="mb-4 p-4 bg-red-100/90 dark:bg-red-900/30 backdrop-blur-sm border border-red-400/50 dark:border-red-700/50 rounded-lg text-red-700 dark:text-red-300 text-center">
                  {error}
                </div>
              )}
              
              <Home
                countries={countries}
                loading={loading}
                onCountrySelect={handleCountrySelect}
                onSearch={handleSearch}
                onFilter={handleFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedRegion={selectedRegion}
              />
            </div>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}