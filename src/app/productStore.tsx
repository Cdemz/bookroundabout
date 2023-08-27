// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to
export interface Product {
  img: string;
  title: string;
  category: string;
  rating?: number | string[];
  code: string;
  agerange?: string;
  price: number;
  oldprice?: number;
  id?: number;
  tag?: string[];
  quantity?: number;
}

const productsArray = [
  {
    id: "price_1LnUTFDM1jwCEz8OGoOSXiSM",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1LnUTxDM1jwCEz8OAqHYTwKQ",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1LnUUoDM1jwCEz8OvxIcJ7to",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id: string) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };
