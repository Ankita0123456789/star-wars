import type { NextPage } from "next";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { useAuthProvider } from "../context/useAuth";
import fetcher from "../libs/fetcher";

import Header from "./header";

const Home: NextPage = () => {
  const router = useRouter();
  const auth = useAuthProvider();
  const [showMenu, setShowMenu] = useState(false);
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //
  //     if (signin.success) {
  //       router.push("/tasks");
  //     } else {
  //       alert(signin.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resp = await fetch("/api/login/", {
      method: "POST",
      body: JSON.stringify({ name: state.name, password: state.password }),
      // headers: { "Content-type": "application/json" },
    });

    resp
      .json()
      .then((res: any) => {
        if (res.success) {
          auth.signIn(res.data);
          setShowMenu(true);
          router.push("/planets");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showMenu ? <Header /> : null}
      <div className="container mx-auto">
        <div className="row place-content-center flex justify-center my-36">
          <div className="card rounded shadow-lg border border-gray-300 columns-1 w-10/12 md:w-7/12 xl:w-5/12 content flex justify-center py-5 bg-blue-200 ">
            <form>
              <h2 className="text-2xl text-center font-semibold py-4">Login</h2>
              <div className="p-3 ">
                <label htmlFor="floatingInput">Username</label>
                <br></br>
                <input
                  type="text"
                  className="border border-slate-400 rounded w-10/12 xl:w-96  p-2 mt-3"
                  id="floatingInput"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  placeholder="Write your username"
                />
              </div>
              <div className="p-3">
                <label htmlFor="floatingPassword">Password</label>
                <br></br>
                <input
                  type="password"
                  className="border border-slate-400 rounded w-10/12 xl:w-96 p-2 mt-3"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div className="text-center py-4">
                <button
                  type="submit"
                  className="border border-default rounded-md text-white p-2 px-10 bg-blue-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
