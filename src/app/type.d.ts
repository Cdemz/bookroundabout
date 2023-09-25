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
  sales?: boolean;
  isNew?: boolean;
  stag: string;
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
  sales?: boolean;
  isNew?: boolean;
  stag: string;
  code: string;
  quantity: number;
}

export interface StateProps {
  productData: [];
  favoriteData: [];
  item: [];
  userInfo: null | string;
  userData: [];
  next: any;
}

interface Request {
  json(): Promise<any>; // Adjust this type as needed
}
