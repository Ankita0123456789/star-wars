import { useEffect } from "react";

const useClickOutside = (ref: any, callback?: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref && !ref.contains(e.target) && callback) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;