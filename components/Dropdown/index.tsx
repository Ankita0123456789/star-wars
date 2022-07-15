import { useState, useRef } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

import Popover from "../Popover";

// import { IDropdown, IOption } from "./interfaces";

const Dropdown = ({
  label,
  options,
  placement,
  className,
  header,
  footer,
  onChange,
  isMenu,
}: any) => {
  const trigger = useRef<any>(null);
  const [show, setShow] = useState(false);
  const cheevron = <BiChevronDown />;

  return (
    <>
      <button
        type="button"
        ref={trigger}
        onClick={() => setShow(!show)}
        className={`${className}`}
      >
        {label}
      </button>
      <Popover
        trigger={trigger}
        placement={placement || "bottom"}
        show={show}
        onClose={() => setShow(true)}
      >
        <div
          className={`border border-gray-1 z-20 m-3 w-36  bg-white text-black rounded shadow-card ${
            show ? "" : "hidden"
          }`}
        >
          {header ?? null}
          <div className="p-2">
            {options.map((option: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center  px-3 py-3 hover:bg-gray-4 rounded-md cursor-pointer"
              >
                {isMenu && !option.onChange ? (
                  <Link href={option.route}>
                    <a>{option.label}</a>
                  </Link>
                ) : (
                  <span onClick={option.onChange ? option.onChange : null}>
                    {option.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Dropdown;
