import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://kitsu.io/api/edge',
  timeout: 15000,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.status);
    } else if (error.request) {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch paginated anime list
 * @param {number} page - Page number (0-indexed)
 * @param {number} limit - Items per page
 * @returns {Promise} Anime list data
 */
export const fetchAnimeList = async (page = 0, limit = 10) => {
  try {
    const offset = page * limit;
    const response = await apiClient.get('/anime', {
      params: {
        'page[limit]': limit,
        'page[offset]': offset,
        'fields[anime]': 'canonicalTitle,titles,synopsis,averageRating,posterImage,coverImage,episodeCount,status,startDate,endDate,ageRating,subtype'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch anime list: ${error.message}`);
  }
};

export default apiClient;