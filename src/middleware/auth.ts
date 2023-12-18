// import { useRouter } from "next/router"; // Import from "next/router" instead of "next/navigation"
// import { useSelector } from "react-redux";
// import { RootState } from "../app/redux/store";

// const protectRouteMiddleware = <P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ) => {
//   const ProtectedComponent: React.FC<P> = (props) => {
//     const router = useRouter();
//     const state = useSelector((state: RootState) => state);

//     // Your authentication logic here

//     if (!state.user.isAuthenticated) {
//       router.push("/login");
//       return null;
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return ProtectedComponent;
// };

// export default protectRouteMiddleware;
