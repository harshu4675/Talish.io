// Storage utility for managing products in localStorage

const PRODUCTS_KEY = "techvault_products";
const CATEGORIES_KEY = "techvault_categories";

// Default categories
const defaultCategories = [
  {
    id: "headphones",
    name: "Headphones",
    icon: "🎧",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: "💻",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  },
  {
    id: "smartphones",
    name: "Smartphones",
    icon: "📱",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  },
  {
    id: "tablets",
    name: "Tablets",
    icon: "📲",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "⌨️",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
  },
  {
    id: "cameras",
    name: "Cameras",
    icon: "📷",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=200&fit=crop",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: "🎮",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=200&fit=crop",
  },
  {
    id: "audio",
    name: "Audio",
    icon: "🔊",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=200&fit=crop",
  },
];

// Initialize storage with default data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
  }
};

// Products CRUD
export const getProducts = () => {
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find((p) => p.id === id);
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
};

// Categories
export const getCategories = () => {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  return categories ? JSON.parse(categories) : defaultCategories;
};

export const getCategoryProductCount = (categoryId) => {
  const products = getProducts();
  return products.filter((p) => p.category === categoryId).length;
};

// Filter helpers
export const getProductsByCategory = (categoryId) => {
  const products = getProducts();
  return products.filter((p) => p.category === categoryId);
};

export const getFeaturedProducts = () => {
  const products = getProducts();
  return products.filter((p) => p.isFeatured);
};

export const getDealProducts = () => {
  const products = getProducts();
  return products.filter((p) => p.isDeal && p.discount > 0);
};

export const searchProducts = (query) => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  );
};
