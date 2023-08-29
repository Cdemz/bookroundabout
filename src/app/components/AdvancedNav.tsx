"use client";
import { RecoilRoot } from "recoil";

import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

const AdvancedNav = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider>
          <NavBar />
        </SessionProvider>
      </PersistGate>
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
