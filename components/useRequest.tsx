import useSWRInfinite from 'swr/infinite';

const fetcher = (url:any) => fetch(url).then((res) => res.json());

const url = 'https://swapi.dev/api/planets/';


export const usePaginatePosts = () => {
  const PAGE_LIMIT = 5;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${url}?page=${index + 1}&limit=${PAGE_LIMIT}`,
    fetcher
  );

  const planets = data ? [].concat(...data) : [];
   


  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return { planets, error, isLoadingMore, size, setSize, isReachingEnd };
};