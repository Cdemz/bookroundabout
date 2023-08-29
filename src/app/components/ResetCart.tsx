import { resetCart } from "../store/nextSlice";
import { useDispatch } from "react-redux";

const ResetCart = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to reset your items from the cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="w-44 h-10 font-semibold bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-v)] hover:text-white duration-300"
    >
      reset cart
    </button>
  );
};

export default ResetCart;
