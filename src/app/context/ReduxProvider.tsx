"use client";
import store1 from "../store/store";
import store2 from "../redux/store";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store1}>
      <Provider store={store2}>{children}</Provider>
    </Provider>
  );
}
