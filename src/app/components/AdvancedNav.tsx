"use client";
import { RecoilRoot } from "recoil";

import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import Cart from "./Cart";
import { Provider } from "react-redux";
import store from "../store";

const AdvancedNav = () => {
  return (
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
};

export default AdvancedNav;

// "use client";
// import { RecoilRoot } from "recoil";

// import NavBar from "./NavBar";
// import { Toaster } from "react-hot-toast";
// import Cart from "./Cart";

// const AdvancedNav = () => {
//   return (
//     <RecoilRoot>
//       <NavBar />
//       <Cart />
//     </RecoilRoot>
//   );
// };

// export default AdvancedNav;
