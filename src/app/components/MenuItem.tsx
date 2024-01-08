import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

type MenuItemProps = {
  linkText: string;
  // sad: string;
};

const MenuItem = ({ linkText }: MenuItemProps) => {
  return (
    <Menu.Item>
      <Link
        href={`/Category?name=${linkText}`}
        // href={sad}
        passHref // Add passHref to ensure the link works as expected
      >
        <p
          className="block px-4 py-2 text-sm text-gray-700" // Define your styles here
        >
          {linkText}
        </p>
      </Link>
    </Menu.Item>
  );
};

export default MenuItem;
