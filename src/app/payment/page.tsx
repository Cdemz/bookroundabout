import React from "react";
import ReduxProvider from "../context/ReduxProvider";
import store2, { persistor } from "../redux/store";
import Bigpay from "./pay";
import { Provider } from "react-redux";

interface Props {
  // Define any props you need here
}

const PaymentPage: React.FC<Props> = (props) => {
  // Define any state variables you need here
  // Define any functions you need here

  return (
    // Define your JSX here

    <ReduxProvider>
      <Provider store={store2}>
        <Bigpay />
      </Provider>
    </ReduxProvider>
  );
};

export default PaymentPage;
