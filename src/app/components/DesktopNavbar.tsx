import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { SlArrowUp } from "react-icons/sl";

const DesktopNavbar = () => {
  return (
    <div className="fixed flex w-full bottom-10 z-40 text-center items-center justify-center">
      <div className="bg-green-500 flex items-center text-white rounded-full ml-auto mr-4  px-3 py-5 h-14">
        <Link href="https://wa.me/2349020704026" target="_blank">
          <BsWhatsapp size={30} />
        </Link>
      </div>
    </div>
  );
};

export default DesktopNavbar;
