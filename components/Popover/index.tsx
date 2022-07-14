import React, { useEffect } from "react";
import { useState } from "react";
import { usePopper } from "react-popper";
import useClickOutside from "../../libs/useClickOutside";
// import { PopoverIF } from "./interfaces";

const Popover = ({
  show,
  onClose,
  children,
  trigger,
  placement = "auto",
  id,
  offset,
}: any) => {
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes, update } = usePopper(
    trigger.current,
    popperElement,
    {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset || [0, 0],
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (show && typeof update === "function") {
      void update();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useClickOutside(popperElement, show ? onClose : null);
  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      id={id || "popover"}
      className="z-30"
    >
      <div hidden={!show}>{children}</div>
    </div>
  );
};

export default Popover;