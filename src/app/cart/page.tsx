"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../store";
const page = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

export default page;

// "use client";
// import React from "react";
// import { RecoilRoot } from "recoil";
// import Cart from "./cart";
// const page = () => {
//   return (
//     <RecoilRoot>
//       <Cart />
//     </RecoilRoot>
//   );
// };

// export default page;
