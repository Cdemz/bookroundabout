import { CartContext } from "../CartContent";
import { useContext } from "react";
import Data from "../BooksData.json"; // Import your JSON data here
interface CartProductProps {
  id: number;
  quantity: number;
}

function CartProduct(props: CartProductProps) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;

  // Find the product data based on the ID
  const productData = Data.find((item) => item.id === id);

  if (!productData) {
    // Handle the case where productData is not found
    return null;
  }

  return (
    <div className="border p-4 my-2 rounded-lg">
      <h3 className="text-lg font-semibold">{productData.title}</h3>
      <p className="text-gray-600">{quantity} total</p>
      <p className="text-green-600 font-semibold">
        $ {(quantity * productData.price).toFixed(2)}
      </p>
      <button
        className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => cart.deleteFromCart(id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartProduct;
