import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  initializeStorage,
  getProducts,
  addProduct as addProductToStorage,
  updateProduct as updateProductInStorage,
  deleteProduct as deleteProductFromStorage,
  getCategories,
  getCategoryProductCount,
} from "../utils/storage";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    const loadedProducts = getProducts();
    const loadedCategories = getCategories().map((cat) => ({
      ...cat,
      count: getCategoryProductCount(cat.id),
    }));
    setProducts(loadedProducts);
    setCategories(loadedCategories);
    setIsLoading(false);
  };

  const addProduct = useCallback((productData) => {
    const newProduct = addProductToStorage(productData);
    setProducts((prev) => [...prev, newProduct]);
    // Update category count
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === productData.category
          ? { ...cat, count: cat.count + 1 }
          : cat,
      ),
    );
    return newProduct;
  }, []);

  const updateProduct = useCallback((id, productData) => {
    const updated = updateProductInStorage(id, productData);
    if (updated) {
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
    return updated;
  }, []);

  const deleteProduct = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      deleteProductFromStorage(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      // Update category count
      if (product) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === product.category
              ? { ...cat, count: Math.max(0, cat.count - 1) }
              : cat,
          ),
        );
      }
    },
    [products],
  );

  const getProductById = useCallback(
    (id) => {
      return products.find((p) => p.id === id);
    },
    [products],
  );

  const getFeaturedProducts = useCallback(() => {
    return products.filter((p) => p.isFeatured);
  }, [products]);

  const getDealProducts = useCallback(() => {
    return products.filter((p) => p.isDeal && p.discount > 0);
  }, [products]);

  const getProductsByCategory = useCallback(
    (categoryId) => {
      return products.filter((p) => p.category === categoryId);
    },
    [products],
  );

  const searchProducts = useCallback(
    (query) => {
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.brand.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery),
      );
    },
    [products],
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getFeaturedProducts,
        getDealProducts,
        getProductsByCategory,
        searchProducts,
        refreshData: loadData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
