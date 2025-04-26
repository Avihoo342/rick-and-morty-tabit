export const BASE_URL = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS = {
  CHARACTERS: `${BASE_URL}/character`,
  EPISODES: `${BASE_URL}/episode`,
};

export const TOOLBAR_LABELS = {
  SEARCH: 'Search Characters',
  SEARCH_PLACEHOLDER: 'Enter name',
  FILTER: 'Filter by Status',
  TOGGLE_VIEW_GRID: 'Switch to Grid View',
  TOGGLE_VIEW_LIST: 'Switch to List View',
  NAVIGATE_TO_EPISODES: 'To Episodes...'
};

export const STATUS_MESSAGES = {
  LOADING: 'Loading characters...',
  NO_RESULTS: 'No characters found matching your criteria.',
  LOADING_DETAILS: 'Loading character details...'
};
  

export const INFINITE_SCROLL_SETTINGS = {
  DISTANCE: 2,
  UP_DISTANCE: 1,
  THROTTLE: 300,
};
export const TABLE_COLUMNS = ['id', 'name', 'status', 'species', 'type', 'gender'];

export const CHARACTER_STATUSES = ["ALIVE", "DEAD", "UNKNOWN", "ALL"] as const;

export const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

export const ROUTES = {
  HOME: '/',
  CHARACTERS: '/characters',
  CHARACTER_DETAIL: '/characters/:id',
  EPISODES: '/episodes',
};