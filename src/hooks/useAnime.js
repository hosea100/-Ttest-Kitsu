import { useState, useEffect, useCallback } from 'react';
import { fetchAnimeList, fetchAnimeDetail } from '../api/kitsuApi';

/**
 * Custom hook for fetching paginated anime list
 */
export const useAnimeList = (initialPage = 0, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchAnimeList(page, limit);
      
      setData(response.data || []);
      
      const totalPages = response.meta?.count 
        ? Math.ceil(response.meta.count / limit) 
        : Infinity;
      setHasMore(page < totalPages - 1);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching anime list:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const refresh = () => {
    fetchData(currentPage);
  };

  return {
    data,
    loading,
    error,
    currentPage,
    hasMore,
    goToPage,
    nextPage,
    prevPage,
    refresh
  };
};

/**
 * Custom hook for fetching single anime details
 */
export const useAnimeDetail = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchAnimeDetail(id);
        setData(response.data);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching anime details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
