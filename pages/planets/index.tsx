import { InferGetStaticPropsType } from "next";
import { useState, useContext } from "react";
import Link from "next/link";

import Header from "../header";
import Legend from "../legends";
import Loading from "../loading";

import { useAuthProvider } from "../../context/useAuth";
import { usePaginatePosts } from "../../components/useRequest";

type Planet = {
  name: string;
  diameter: string;
  population: string;
  climate: string;
};

const Planets = () => {
  // const { data: planets } = useSWR(`/api/planets`, fetcher);
  const auth = useAuthProvider();
  const { user } = auth;
  const [searchTitle, setSearchTitle] = useState("");
  const { planets, error, isLoadingMore, size, setSize, isReachingEnd } =
    usePaginatePosts();
  if (error) return <h1>Something went wrong!</h1>;
  if (!planets) return <Loading />;

  console.log(user);

  if (!user) {
    return (
      <div>
        <h1>You are not logged in</h1>
        <Link href="/">Login</Link>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="grid grid-cols-7">
          <div className="planets col-span-5">
            <p className="text-3xl text-center my-5 mt-10">Planets</p>
            <div className="text-center">
              <input
                type="text"
                className="border border-gray-400 w-96 rounded p-2 m-10"
                placeholder="search planet"
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div>
              {planets?.map((item: any, key) => (
                <div
                  className="container-fluid flex flex-row flex-wrap justify-around"
                  key={item.id}
                >
                  {item?.results
                    .filter((value: any) => {
                      if (searchTitle === "") {
                        return value;
                      } else if (
                        value.name
                          .toLowerCase()
                          .includes(searchTitle.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .map((plat: any, key: any) => {
                      let itemStyle = parseInt(plat.population)
                        ? parseInt(plat.population) <= 200000
                          ? { color: "bg-teal-200", font: "text-xs" }
                          : parseInt(plat.population) <= 6000000
                          ? { color: "bg-red-300", font: "text-sm" }
                          : parseInt(plat.population) <= 30000000
                          ? { color: "bg-amber-200", font: "text-lg" }
                          : parseInt(plat.population) <= 1000000000
                          ? { color: "bg-lime-200", font: "text-xl" }
                          : parseInt(plat.population) <= 2000000000
                          ? { color: "bg-indigo-200", font: "text-2xl" }
                          : parseInt(plat.population) <= 4500000000
                          ? { color: "bg-pink-200", font: "text-3xl" }
                          : { color: "bg-blue-200", font: "text-3xl" }
                        : { color: "bg-gray-200", font: "text-base" };
                      return (
                        <div
                          className={`columns-1 w-8/12 md:w-5/12 lg:w-3/12 xl:w-3/12 border p-5 rounded m-5 text-center ${itemStyle.color}`}
                          key={plat.id}
                        >
                          <p className={`text-sm pb-2 ${itemStyle.font}`}>
                            {plat.name}
                          </p>
                          <p className="text-sm">Diameter - {plat.diameter}</p>
                          <p className="text-sm py-2">
                            Temperature - {plat.climate}
                          </p>
                          <p className={`text-sm pb-2`}>
                            Population - {plat.population}
                          </p>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Loading
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
                text={
                  isLoadingMore
                    ? "Loading Planets"
                    : isReachingEnd
                    ? "No more planets"
                    : "Load more"
                }
              />
            </div>
          </div>
          <div className="mt-56 col-span-2">
            <Legend />
          </div>
        </div>
      </div>
    </>
  );
};

export default Planets;
