import React from "react";
import Dropdown from "../../components/Dropdown";

import { useAuthProvider } from "../../context/useAuth";

const Header = () => {
  const { signOut } = useAuthProvider();
  return (
    <>
      <nav className="bg-blue-600">
        <div className="container text-white flex flex-wrap justify-between items-center mx-auto">
          <a href="">StarWars</a>
          <ul className="flex p-5 justify-end">
            <li className="">
              <Dropdown
                label="Menu"
                className="pe-5"
                setShow
                options={[
                  { idx: 1, label: "user", route: "/user" },
                  { idx: 2, label: "Logout", onChange: () => signOut() },
                ]}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
