import React, { useState } from "react";
import Header from "./components/Header";
import CategoryFilters from "./components/CategoryFilters";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import { Product, CartItem } from "./types";

const PRODUCTS: Product[] = [
  { id: 1, name: "Ceramic Pour-Over Set", price: 78, rating: 4.8, reviews: 124, category: "Kitchen", image: "https://picsum.photos/400/500?random=1", description: "Hand-thrown ceramic pour-over dripper with matching carafe. Each piece carries subtle variations — proof of the maker's hand. Brews 2-4 cups of remarkably clean coffee." },
  { id: 2, name: "Linen Throw Blanket", price: 145, rating: 4.9, reviews: 89, category: "Textile", image: "https://picsum.photos/400/500?random=2", description: "Stonewashed Belgian linen in a generous 150×200cm throw. Gets impossibly softer with every wash. The kind of piece you'll fight over on movie night." },
  { id: 3, name: "Brass Desk Lamp", price: 210, rating: 4.7, reviews: 67, category: "Lighting", image: "https://picsum.photos/400/500?random=3", description: "Solid brass with a matte brushed finish that develops a living patina. Adjustable arm, weighted base, warm LED included. Designed to age with you." },
  { id: 4, name: "Stoneware Mug Set", price: 52, rating: 4.6, reviews: 203, category: "Kitchen", image: "https://picsum.photos/400/500?random=4", description: "Set of two mugs in reactive glaze — meaning no two are exactly alike. 350ml capacity, dishwasher safe, and shaped to fit perfectly in your hands." },
  { id: 5, name: "Wool Cushion Cover", price: 68, rating: 4.5, reviews: 156, category: "Textile", image: "https://picsum.photos/400/500?random=5", description: "New Zealand wool, hand-loomed with a textural bouclé weave. 50×50cm with hidden zip closure. Insert not included — because you're particular about firmness." },
  { id: 6, name: "Pendant Light — Smoke", price: 185, rating: 4.8, reviews: 42, category: "Lighting", image: "https://picsum.photos/400/500?random=6", description: "Mouth-blown smoked glass pendant on a blackened steel canopy. Casts the most flattering ambient glow you've ever seen. 2m adjustable cord." },
  { id: 7, name: "Olive Wood Board", price: 95, rating: 4.9, reviews: 178, category: "Kitchen", image: "https://picsum.photos/400/500?random=7", description: "Carved from a single piece of 80-year-old olive wood. Wild grain patterns, food-safe mineral oil finish. Doubles as a serving piece that starts conversations." },
  { id: 8, name: "Cotton Waffle Towel", price: 38, rating: 4.4, reviews: 312, category: "Textile", image: "https://picsum.photos/400/500?random=8", description: "Japanese waffle-weave cotton. Lightweight, fast-drying, absurdly absorbent. The towel that makes you question why terry cloth was ever the default." },
  { id: 9, name: "Arc Floor Lamp", price: 320, rating: 4.7, reviews: 31, category: "Lighting", image: "https://picsum.photos/400/500?random=9", description: "A sweeping brass arc on a marble base. Reaches over furniture to pool light exactly where you need it. Statement piece that earns its floor space." },
  { id: 10, name: "Hand-Dipped Candles", price: 24, rating: 4.3, reviews: 445, category: "Decor", image: "https://picsum.photos/400/500?random=10", description: "Set of four tapered candles, hand-dipped in natural beeswax. Burn time ~8 hours each. Unscented — because the dinner should be what you smell." },
  { id: 11, name: "Terrazzo Bookends", price: 110, rating: 4.6, reviews: 58, category: "Decor", image: "https://picsum.photos/400/500?random=11", description: "Heavyweight terrazzo with marble and granite aggregate. L-shaped, 15cm tall. Heavy enough to wrangle even your most ambitious shelf arrangements." },
  { id: 12, name: "Blown Glass Vase", price: 135, rating: 4.8, reviews: 73, category: "Decor", image: "https://picsum.photos/400/500?random=12", description: "Organic asymmetric form in amber glass. 25cm tall with a narrow neck that makes even a single stem look intentional. Handmade in Portugal." },
];

const CATEGORIES = ["All", "Kitchen", "Textile", "Lighting", "Decor"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = selectedCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>
      <div className="min-h-screen bg-[#F5F0EB] text-[#2A2420]">
        <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
        
        <main className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="pt-12 pb-8 md:pt-20 md:pb-12">
            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl lg:text-8xl font-300 leading-[0.95] tracking-tight">
              Objects for<br />
              <span className="italic text-[#8B6914]">considered</span> living
            </h1>
            <p className="font-['Jost'] text-sm md:text-base font-300 text-[#6B5E54] mt-6 max-w-md leading-relaxed">
              A curated collection of handcrafted homewares — each piece chosen for
              its materiality, provenance, and ability to make the everyday feel extraordinary.
            </p>
          </div>

          <CategoryFilters
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <ProductGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        </main>

        <footer className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 mt-12 border-t border-[#D4C9BC]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <span className="font-['Cormorant_Garamond'] text-2xl font-600 tracking-wide">MATIÈRE</span>
              <p className="font-['Jost'] text-xs text-[#8B7D72] mt-2 font-300">Objects worth keeping.</p>
            </div>
            <p className="font-['Jost'] text-xs text-[#8B7D72] font-300">© 2024 Matière. All pieces, all rights.</p>
          </div>
        </footer>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}

        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          cartTotal={cartTotal}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </>
  );
}