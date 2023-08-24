import React from "react";
import { Menu } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type MenuItemProps = {
  linkText: string;
};

const MenuItem = ({ linkText }: MenuItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          {linkText}
        </a>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
