import productData from "./BooksData.json";
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
  category: string;
  agerange: string;
  code: string;
  oldprice: number;
  quantity: number;
  isNew: boolean;
}
export interface StoreProduct {
  cart: {
    cartItems: CartItem[]; // Define the structure of your cart items
    cartCount: number; // Define the cart count
    // Other cart-related properties
  };

  id: number; // Example property
  title: string;
  category: string;
  description: string;
  img: string;
  oldprice: number;
  price: number;
  isNew: boolean;
  // Add any missing properties here, e.g., brand, image, oldPrice, _id
  brand: string;
  img: string;
  oldPrice: number;
  _id: number;
  quantity: number;
}

export interface StateProps {
  productData: [];
  favoriteData: [];
  item: [];
  userInfo: null | string;
  next: any;
}
