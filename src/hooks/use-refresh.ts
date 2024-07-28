// use-refresh.ts
import { useState, useCallback } from 'react';

const useRefresh = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const refresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return { refresh, refreshKey };
};

export default useRefresh;
