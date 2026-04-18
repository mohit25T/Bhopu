import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { Trash2, Plus, CheckCircle, XCircle, Save } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Rings', desc: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', category: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const productToAdd = {
      ...newProduct,
      image: newProduct.image || 'https://via.placeholder.com/400?text=New+Jewelry',
    };
    addProduct(productToAdd);
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

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1 className="gold-text">Store Management</h1>
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
            <input 
              type="text" 
              placeholder="Image URL (optional)" 
              value={newProduct.image} 
              onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
            />
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
                            placeholder="Name"
                          />
                          <select 
                            value={editData.category}
                            onChange={e => setEditData({...editData, category: e.target.value})}
                          >
                            <option value="Rings">Rings</option>
                            <option value="Necklaces">Necklaces</option>
                            <option value="Earrings">Earrings</option>
                            <option value="Bracelets">Bracelets</option>
                            <option value="Watches">Watches</option>
                            <option value="Brooches">Brooches</option>
                          </select>
                        </div>
                      ) : (
                        <div className={styles.productCell}>
                          <img src={p.image} alt="" className={styles.thumb} />
                          <div>
                            <strong>{p.name}</strong>
                            <span>{p.category}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      {editingId === p.id ? (
                        <div className={styles.editPrice}>
                          <input 
                            type="text" 
                            value={editData.price} 
                            onChange={e => setEditData({...editData, price: e.target.value})} 
                          />
                        </div>
                      ) : (
                        <div className={styles.priceView} onClick={() => startEdit(p)}>
                          {p.price}
                        </div>
                      )}
                    </td>
                    <td>
                      <button 
                        className={`${styles.statusBtn} ${p.isSoldOut ? styles.soldOut : styles.inStock}`}
                        onClick={() => toggleStock(p.id)}
                      >
                        {p.isSoldOut ? <XCircle size={16}/> : <CheckCircle size={16}/>}
                        {p.isSoldOut ? 'Sold Out' : 'Available'}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        {editingId === p.id ? (
                          <>
                            <button className={styles.saveBtn} onClick={() => saveEdit(p.id)}>
                              <Save size={18} />
                            </button>
                            <button className={styles.cancelBtn} onClick={cancelEdit}>
                              <XCircle size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className={styles.editBtn} onClick={() => startEdit(p)}>
                              Edit
                            </button>
                            <button className={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
