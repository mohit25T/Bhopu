import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { Trash2, Plus, CheckCircle, XCircle, Save, Upload, Image as ImageIcon, LogOut } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import AdminLogin from '../components/AdminLogin';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('bhopu_admin_auth') === 'true';
  });

  // Admin UI State
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Rings', desc: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', category: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('File is too large. Please select an image under 1MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setNewProduct({ ...newProduct, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      ...newProduct,
      image: newProduct.image || 'https://via.placeholder.com/400?text=New+Jewelry',
    });
    setNewProduct({ name: '', price: '', category: 'Rings', desc: '', image: '' });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({ name: product.name, price: product.price, category: product.category });
  };

  const saveEdit = (id) => {
    updateProduct(id, editData);
    setEditingId(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bhopu_admin_auth');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem('bhopu_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  // Security Gate
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLoginSuccess} />;
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="gold-text">Store Management</h1>
          <button onClick={handleLogout} className={styles.logoutBtn} title="Log Out">
            <LogOut size={20} />
          </button>
        </div>
        <p>Manage your luxury catalog, update inventory, and stock levels.</p>
      </header>

      <div className={styles.container}>
        {/* Add Product Form */}
        <section className={`glass-card ${styles.addSection}`}>
          <h2>Add New Masterpiece</h2>
          <form onSubmit={handleAdd} className={styles.addForm}>
            <input 
              type="text" 
              placeholder="Product Name" 
              value={newProduct.name} 
              onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Price (e.g. $2,500)" 
              value={newProduct.price} 
              onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
            />
            <select 
              value={newProduct.category} 
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Watches">Watches</option>
              <option value="Brooches">Brooches</option>
            </select>
            <textarea 
              placeholder="Short Description" 
              value={newProduct.desc} 
              onChange={e => setNewProduct({...newProduct, desc: e.target.value})}
            ></textarea>
            
            <div className={styles.imageUploadSection}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              
              {!newProduct.image ? (
                <div className={styles.uploadPlaceholder} onClick={() => fileInputRef.current.click()}>
                  <Upload size={24} />
                  <span>Upload Product Image</span>
                  <small>Max size: 1MB</small>
                </div>
              ) : (
                <div className={styles.imagePreviewContainer}>
                  <img 
                    src={newProduct.image} 
                    alt="Preview" 
                    className={styles.imagePreview} 
                    onClick={() => setSelectedImage({ url: newProduct.image, name: newProduct.name })}
                    style={{ cursor: 'pointer' }}
                  />
                  <button type="button" className={styles.removeImageBtn} onClick={removeImage}>
                    <XCircle size={18} />
                  </button>
                </div>
              )}
            </div>
            
            <button type="submit" className={styles.addBtn}><Plus size={20} /> Add to Catalog</button>
          </form>
        </section>

        {/* Product List */}
        <section className={styles.listSection}>
          <h2>Current Inventory</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className={editingId === p.id ? styles.editingRow : ''}>
                    <td>
                      {editingId === p.id ? (
                        <div className={styles.editProduct}>
                          <input 
                            type="text" 
                            value={editData.name} 
                            onChange={e => setEditData({...editData, name: e.target.value})} 
                          />
                        </div>
                      ) : (
                        <div className={styles.productCell}>
                          <img 
                            src={p.image} 
                            alt="" 
                            className={styles.thumb} 
                            onClick={() => setSelectedImage({ url: p.image, name: p.name })}
                            style={{ cursor: 'pointer' }}
                          />
                          <div>
                            <strong>{p.name}</strong>
                            <span>{p.category}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      {editingId === p.id ? (
                        <input 
                          type="text" 
                          value={editData.price} 
                          onChange={e => setEditData({...editData, price: e.target.value})} 
                        />
                      ) : (
                        <span className={styles.priceView}>{p.price}</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className={`${styles.statusBtn} ${p.isSoldOut ? styles.soldOut : styles.inStock}`}
                        onClick={() => toggleStock(p.id)}
                      >
                        {p.isSoldOut ? 'Sold Out' : 'Available'}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        {editingId === p.id ? (
                          <button className={styles.saveBtn} onClick={() => saveEdit(p.id)}><Save size={18} /></button>
                        ) : (
                          <button className={styles.editBtn} onClick={() => startEdit(p)}>Edit</button>
                        )}
                        <button className={styles.deleteBtn} onClick={() => deleteProduct(p.id)}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        image={selectedImage?.url} 
        title={selectedImage?.name} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default AdminDashboard;
