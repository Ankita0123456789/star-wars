import Head from 'next/head';
import { usePaginatePosts } from '../../components/useRequest';

export default function Home() {
  const { planets, error, isLoadingMore, size, setSize, isReachingEnd } =
    usePaginatePosts();
  if (error) return <h1>Something went wrong!</h1>;
  if (!planets) return <h1>Loading..</h1>;

  return (
    <div>

      <main className="max-w-xl mx-auto">
        <h1 className="font-bold m-5">My Posts</h1>
        {planets?.map((item:any, key) => (
          <div className='container' key={item.id}>
               <p>{item.count}</p>
               {item?.results.map((plat:any, key:any) => (
                <div key={item.id}>{plat.name} </div>
               ))

               }
          </div>
        ))}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'Loading...'
            : isReachingEnd
            ? 'No more posts'
            : 'Load more'}
        </button>
      </main>
    </div>
  );
}