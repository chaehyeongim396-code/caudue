import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string; // unique item id (can incorporate timestamp and customization parameters to prevent collision)
  productId?: number; // referenced product id if from gallery
  title: string;
  price: string;
  img: string; // standard display thumbnail image or custom image
  customImage?: string | null; // custom pattern upload image if from gallery customize
  printFit?: 'cover' | 'contain';
  printAreaClass?: string;
  colors?: string[]; // pattern colors if from design page
  story?: string; // AI story if from design page
  quantity: number;
  type: 'custom' | 'gallery';
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cadeau_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cadeau_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCart((prevCart) => {
      // Find if item with same properties already exists to increment quantity
      const existingItemIndex = prevCart.findIndex((item) => {
        // If type is different, they are different items
        if (item.type !== newItem.type) return false;
        
        if (item.type === 'gallery') {
          return (
            item.productId === newItem.productId &&
            item.customImage === newItem.customImage &&
            item.printFit === newItem.printFit
          );
        } else {
          // If custom AI pattern, compare colors & title
          return (
            item.title === newItem.title &&
            JSON.stringify(item.colors) === JSON.stringify(newItem.colors)
          );
        }
      });

      const qtyToAdd = newItem.quantity ?? 1;

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + qtyToAdd,
        };
        return updatedCart;
      }

      return [...prevCart, { ...newItem, quantity: qtyToAdd }];
    });
    
    // Automatically slide open the cart drawer for great UX input feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function parsePrice(priceStr: string): number {
  const cleanStr = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleanStr, 10) || 0;
}
