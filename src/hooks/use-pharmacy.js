// src/hooks/use-pharmacy.js
// Custom React Hooks for Pharmacy Management
import { useMemo, useState, useEffect, useCallback } from 'react';

import { pharmacyApi } from '../_mock/pharmacy';

// Generic API hook for loading states and error handling
const useApiState = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    reset
  };
};

// Hook for pharmacy configuration management
export const usePharmacyConfig = () => {
  const { data: config, setData: setConfig, loading, setLoading, error, setError } = useApiState(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const configData = await pharmacyApi.config.get();
      setConfig(configData);
      return configData;
    } catch (err) {
      setError(err.message || 'Failed to fetch pharmacy configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setConfig, setLoading, setError]);

  const updateConfig = useCallback(async (configData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedConfig = await pharmacyApi.config.update(configData);
      setConfig(updatedConfig);
      return updatedConfig;
    } catch (err) {
      setError(err.message || 'Failed to update pharmacy configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setConfig, setLoading, setError]);

  const createConfig = useCallback(async (configData) => {
    try {
      setLoading(true);
      setError(null);
      const newConfig = await pharmacyApi.config.create(configData);
      setConfig(newConfig);
      return newConfig;
    } catch (err) {
      setError(err.message || 'Failed to create pharmacy configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setConfig, setLoading, setError]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchConfig().catch(() => {
      // Error is already handled in fetchConfig
    });
  }, [fetchConfig]);

  return {
    config,
    loading,
    error,
    fetchConfig,
    updateConfig,
    createConfig,
    setConfig,
    setError
  };
};

// Hook for pharmacy categories management
export const usePharmacyCategories = (params = {}) => {
  const {
    data: categories,
    setData: setCategories,
    loading,
    setLoading,
    error,
    setError
  } = useApiState([]);

  const [filters, setFilters] = useState(params);

  const fetchCategories = useCallback(async (queryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const mergedParams = { ...filters, ...queryParams };
      const categoriesData = await pharmacyApi.categories.getAll(mergedParams);
      setCategories(categoriesData);
      return categoriesData;
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters, setCategories, setLoading, setError]);

  const fetchFeaturedCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const featuredData = await pharmacyApi.categories.getFeatured();
      setCategories(featuredData);
      return featuredData;
    } catch (err) {
      setError(err.message || 'Failed to fetch featured categories');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCategories, setLoading, setError]);

  const getCategoryById = useCallback(async (id) => {
    try {
      setError(null);
      const categoryData = await pharmacyApi.categories.getById(id);
      return categoryData;
    } catch (err) {
      setError(err.message || 'Failed to fetch category details');
      throw err;
    }
  }, [setError]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Auto-fetch on mount and filter changes
  useEffect(() => {
    fetchCategories().catch(() => {
      // Error is already handled in fetchCategories
    });
  }, [fetchCategories]);

  // Computed values
  const featuredCategories = useMemo(() =>
    categories.filter(cat => cat.is_featured),
    [categories]
  );

  const categoriesStats = useMemo(() => ({
    total: categories.length,
    featured: featuredCategories.length,
    totalProducts: categories.reduce((sum, cat) => sum + cat.product_count, 0),
    totalSubcategories: categories.reduce((sum, cat) => sum + cat.subcategory_count, 0)
  }), [categories, featuredCategories]);

  return {
    categories,
    featuredCategories,
    categoriesStats,
    loading,
    error,
    filters,
    fetchCategories,
    fetchFeaturedCategories,
    getCategoryById,
    updateFilters,
    setCategories,
    setError
  };
};

// Hook for pharmacy subcategories management
export const usePharmacySubcategories = (params = {}) => {
  const {
    data: subcategories,
    setData: setSubcategories,
    loading,
    setLoading,
    error,
    setError
  } = useApiState([]);

  const [filters, setFilters] = useState(params);

  const fetchSubcategories = useCallback(async (queryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const mergedParams = { ...filters, ...queryParams };
      const subcategoriesData = await pharmacyApi.subcategories.getAll(mergedParams);
      setSubcategories(subcategoriesData);
      return subcategoriesData;
    } catch (err) {
      setError(err.message || 'Failed to fetch subcategories');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters, setSubcategories, setLoading, setError]);

  const getSubcategoryById = useCallback(async (id) => {
    try {
      setError(null);
      const subcategoryData = await pharmacyApi.subcategories.getById(id);
      return subcategoryData;
    } catch (err) {
      setError(err.message || 'Failed to fetch subcategory details');
      throw err;
    }
  }, [setError]);

  const fetchSubcategoriesByCategory = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const subcategoriesData = await pharmacyApi.subcategories.getByCategory(categoryId);
      setSubcategories(subcategoriesData);
      return subcategoriesData;
    } catch (err) {
      setError(err.message || 'Failed to fetch subcategories by category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setSubcategories, setLoading, setError]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Auto-fetch on mount and filter changes
  useEffect(() => {
    fetchSubcategories().catch(() => {
      // Error is already handled in fetchSubcategories
    });
  }, [fetchSubcategories]);

  return {
    subcategories,
    loading,
    error,
    filters,
    fetchSubcategories,
    getSubcategoryById,
    fetchSubcategoriesByCategory,
    updateFilters,
    setSubcategories,
    setError
  };
};

// Hook for pharmacy products management
export const usePharmacyProducts = (params = {}) => {
  const {
    data: productsData,
    setData: setProductsData,
    loading,
    setLoading,
    error,
    setError
  } = useApiState({ results: [], count: 0, next: null, previous: null });

  const [filters, setFilters] = useState(params);
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });

  const fetchProducts = useCallback(async (queryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const mergedParams = { ...filters, ...pagination, ...queryParams };
      const productsResponse = await pharmacyApi.products.getAll(mergedParams);
      setProductsData(productsResponse);
      return productsResponse;
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters, pagination, setProductsData, setLoading, setError]);

  const getProductById = useCallback(async (id) => {
    try {
      setError(null);
      const productData = await pharmacyApi.products.getById(id);
      return productData;
    } catch (err) {
      setError(err.message || 'Failed to fetch product details');
      throw err;
    }
  }, [setError]);

  const fetchBestsellers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const bestsellers = await pharmacyApi.products.getBestsellers();
      setProductsData({ results: bestsellers, count: bestsellers.length, next: null, previous: null });
      return bestsellers;
    } catch (err) {
      setError(err.message || 'Failed to fetch bestsellers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProductsData, setLoading, setError]);

  const fetchProductsByCategory = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const products = await pharmacyApi.products.getByCategory(categoryId);
      setProductsData({ results: products, count: products.length, next: null, previous: null });
      return products;
    } catch (err) {
      setError(err.message || 'Failed to fetch products by category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProductsData, setLoading, setError]);

  const fetchProductsBySubcategory = useCallback(async (subcategoryId) => {
    try {
      setLoading(true);
      setError(null);
      const products = await pharmacyApi.products.getBySubcategory(subcategoryId);
      setProductsData({ results: products, count: products.length, next: null, previous: null });
      return products;
    } catch (err) {
      setError(err.message || 'Failed to fetch products by subcategory');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProductsData, setLoading, setError]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const updatePagination = useCallback((newPagination) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  // Auto-fetch on mount and filter/pagination changes
  useEffect(() => {
    fetchProducts().catch(() => {
      // Error is already handled in fetchProducts
    });
  }, [fetchProducts]);

  // Computed values
  const products = useMemo(() => productsData.results || [], [productsData]);

  const hasMore = useMemo(() => Boolean(productsData.next), [productsData]);

  const totalPages = useMemo(() =>
    Math.ceil(productsData.count / pagination.limit),
    [productsData.count, pagination.limit]
  );

  return {
    products,
    productsData,
    loading,
    error,
    filters,
    pagination,
    hasMore,
    totalPages,
    fetchProducts,
    getProductById,
    fetchBestsellers,
    fetchProductsByCategory,
    fetchProductsBySubcategory,
    updateFilters,
    updatePagination,
    setProductsData,
    setError
  };
};

// Hook for pharmacy cart management
export const usePharmacyCart = () => {
  const {
    data: cart,
    setData: setCart,
    loading,
    setLoading,
    error,
    setError
  } = useApiState(null);

  const [cartSummary, setCartSummary] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await pharmacyApi.cart.get();
      setCart(cartData);
      return cartData;
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCart, setLoading, setError]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      const updatedCart = await pharmacyApi.cart.addItem(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCart, setLoading, setError]);

  const updateCartQuantity = useCallback(async (productId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const updatedCart = await pharmacyApi.cart.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message || 'Failed to update cart quantity');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCart, setLoading, setError]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      setLoading(true);
      setError(null);
      const updatedCart = await pharmacyApi.cart.removeItem(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCart, setLoading, setError]);

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const clearedCart = await pharmacyApi.cart.clear();
      setCart(clearedCart);
      return clearedCart;
    } catch (err) {
      setError(err.message || 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setCart, setLoading, setError]);

  const fetchCartSummary = useCallback(async () => {
    try {
      const summary = await pharmacyApi.cart.getSummary();
      setCartSummary(summary);
      return summary;
    } catch (err) {
      setError(err.message || 'Failed to fetch cart summary');
      throw err;
    }
  }, [setError]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchCart().catch(() => {
      // Error is already handled in fetchCart
    });
  }, [fetchCart]);

  // Auto-fetch summary when cart changes
  useEffect(() => {
    if (cart) {
      fetchCartSummary().catch(() => {
        // Error is already handled in fetchCartSummary
      });
    }
  }, [cart, fetchCartSummary]);

  // Computed values
  const isEmpty = useMemo(() => !cart || cart.total_items === 0, [cart]);

  const itemCount = useMemo(() => cart?.total_items || 0, [cart]);

  const uniqueItemCount = useMemo(() => cart?.unique_items_count || 0, [cart]);

  const totalAmount = useMemo(() => cart?.total_amount || '0.00', [cart]);

  const totalSavings = useMemo(() => cart?.total_savings || '0.00', [cart]);

  const prescriptionRequired = useMemo(() =>
    cart?.items?.some(item => item.product.is_prescription_required) || false,
    [cart]
  );

  // Helper functions
  const getItemQuantity = useCallback((productId) => {
    const matchedItem = cart?.items?.find(cartItem => cartItem.product.id === parseInt(productId, 10));
    return matchedItem ? matchedItem.quantity : 0;
  }, [cart]);

  const isInCart = useCallback((productId) => cart?.items?.some(item => item.product.id === parseInt(productId, 10)) || false, [cart]);

  return {
    cart,
    cartSummary,
    loading,
    error,
    isEmpty,
    itemCount,
    uniqueItemCount,
    totalAmount,
    totalSavings,
    prescriptionRequired,
    fetchCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    fetchCartSummary,
    getItemQuantity,
    isInCart,
    setCart,
    setError
  };
};

// Hook for category details with products and subcategories
export const useCategoryDetails = (categoryId) => {
  const {
    data: categoryDetails,
    setData: setCategoryDetails,
    loading,
    setLoading,
    error,
    setError
  } = useApiState(null);

  const fetchCategoryDetails = useCallback(async (id = categoryId) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const details = await pharmacyApi.categories.getById(id);
      setCategoryDetails(details);
    } catch (err) {
      setError(err.message || 'Failed to fetch category details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [categoryId, setCategoryDetails, setLoading, setError]);

  // Auto-fetch on mount and categoryId change
  useEffect(() => {
    if (categoryId) {
      fetchCategoryDetails().catch(() => {
        // Error is already handled in fetchCategoryDetails
      });
    }
  }, [categoryId, fetchCategoryDetails]);

  return {
    categoryDetails,
    loading,
    error,
    fetchCategoryDetails,
    setCategoryDetails,
    setError
  };
};

// Hook for subcategory details with products
export const useSubcategoryDetails = (subcategoryId) => {
  const {
    data: subcategoryDetails,
    setData: setSubcategoryDetails,
    loading,
    setLoading,
    error,
    setError
  } = useApiState(null);

  const fetchSubcategoryDetails = useCallback(async (id = subcategoryId) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const details = await pharmacyApi.subcategories.getById(id);
      setSubcategoryDetails(details);
    } catch (err) {
      setError(err.message || 'Failed to fetch subcategory details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [subcategoryId, setSubcategoryDetails, setLoading, setError]);

  // Auto-fetch on mount and subcategoryId change
  useEffect(() => {
    if (subcategoryId) {
      fetchSubcategoryDetails().catch(() => {
        // Error is already handled in fetchSubcategoryDetails
      });
    }
  }, [subcategoryId, fetchSubcategoryDetails]);

  return {
    subcategoryDetails,
    loading,
    error,
    fetchSubcategoryDetails,
    setSubcategoryDetails,
    setError
  };
};

// Hook for search functionality across products and categories
export const usePharmacySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ products: [], categories: [], subcategories: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults({ products: [], categories: [], subcategories: [] });
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);

      const [productsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
        pharmacyApi.products.getAll({ search: query, limit: 20 }),
        pharmacyApi.categories.getAll({ search: query }),
        pharmacyApi.subcategories.getAll({ search: query })
      ]);

      setSearchResults({
        products: productsResponse.results,
        categories: categoriesResponse,
        subcategories: subcategoriesResponse
      });
// eslint-disable-next-line consistent-return
      return {
        products: productsResponse.results,
        categories: categoriesResponse,
        subcategories: subcategoriesResponse
      };
    } catch (err) {
      setSearchError(err.message || 'Search failed');
      throw err;

    } finally {
      setSearchLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults({ products: [], categories: [], subcategories: [] });
    setSearchError(null);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery).catch(() => {
          // Error is already handled in performSearch
        });
      } else {
        clearSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch, clearSearch]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    searchError,
    performSearch,
    clearSearch
  };
};

// Hook for orders management
export const usePharmacyOrders = () => {
  const {
    data: orders,
    setData: setOrders,
    loading,
    setLoading,
    error,
    setError
  } = useApiState([]);

  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const newOrder = await pharmacyApi.orders.create(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setOrders, setLoading, setError]);

  const getOrderById = useCallback(async (id) => {
    try {
      setError(null);
      const orderData = await pharmacyApi.orders.getById(id);
      return orderData;
    } catch (err) {
      setError(err.message || 'Failed to fetch order details');
      throw err;
    }
  }, [setError]);

  return {
    orders,
    loading,
    error,
    createOrder,
    getOrderById,
    setOrders,
    setError
  };
};

// Hook for managing pharmacy business logic and derived state
export const usePharmacyManager = () => {
  const config = usePharmacyConfig();
  const categories = usePharmacyCategories();
  const subcategories = usePharmacySubcategories();
  const products = usePharmacyProducts();
  const cart = usePharmacyCart();
  const search = usePharmacySearch();
  const orders = usePharmacyOrders();

  // Combined loading state
  const isLoading = useMemo(() =>
    config.loading || categories.loading || products.loading || cart.loading,
    [config.loading, categories.loading, products.loading, cart.loading]
  );

  // Combined error state
  const hasError = useMemo(() =>
    Boolean(config.error || categories.error || products.error || cart.error),
    [config.error, categories.error, products.error, cart.error]
  );

  // Pharmacy readiness check
  const isPharmacyReady = useMemo(() =>
    Boolean(config.config && categories.categories.length > 0),
    [config.config, categories.categories.length]
  );

  // Dashboard statistics
  const dashboardStats = useMemo(() => ({
    totalCategories: categories.categoriesStats.total,
    featuredCategories: categories.categoriesStats.featured,
    totalProducts: categories.categoriesStats.totalProducts,
    cartItems: cart.itemCount,
    cartValue: cart.totalAmount,
    isConfigured: Boolean(config.config)
  }), [categories.categoriesStats, cart.itemCount, cart.totalAmount, config.config]);

  return {
    config,
    categories,
    subcategories,
    products,
    cart,
    search,
    orders,
    isLoading,
    hasError,
    isPharmacyReady,
    dashboardStats
  };
};

// Export all hooks
export default {
  usePharmacyConfig,
  usePharmacyCategories,
  usePharmacySubcategories,
  usePharmacyProducts,
  usePharmacyCart,
  useCategoryDetails,
  useSubcategoryDetails,
  usePharmacySearch,
  usePharmacyOrders,
  usePharmacyManager
};
