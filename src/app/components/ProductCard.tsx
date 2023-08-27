import { useContext } from "react";
import { CartContext } from "../CartContent";
import Image from "next/image";

function ProductCard(props: { product: any }) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg text-black">
      <Image
        {...srcset(product.img, 12)}
        width={300}
        height={300}
        alt={product.title}
        loading="lazy"
        className="w-[120px] h-[170px] object-cover  "
      />
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      {productQuantity > 0 ? (
        <div className="mt-4">
          <div className="flex items-center">
            <p className="mr-2">In Cart: {productQuantity}</p>
            <button
              onClick={() => cart.addOneToCart(product.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              +
            </button>
            <button
              onClick={() => cart.removeOneFromCart(product.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
            >
              -
            </button>
          </div>
          <button
            onClick={() => cart.deleteFromCart(product.id)}
            className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
          >
            Remove from cart
          </button>
        </div>
      ) : (
        <button
          onClick={() => cart.addOneToCart(product.id)}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
