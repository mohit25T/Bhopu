import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

// Use relative paths since frontend and backend are unified
// Use the global backend URL defined in .env
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from MongoDB
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Oops, the server didn't send back JSON data!");
      }

      const data = await response.json();
      
      // Map _id to id for frontend compatibility
      const formattedData = data.map(p => ({ ...p, id: p._id }));
      setProducts(formattedData);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this masterpiece?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const toggleStock = async (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSoldOut: !product.isSoldOut }),
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, toggleStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
