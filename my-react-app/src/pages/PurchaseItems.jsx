import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const PurchaseItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8000/items');
      setItems(res.data);
    } catch (error) {
      console.error('GET hatası:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    if (!newItem.trim()) return;

    const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const newItemObj = { id: newId, name: newItem };

    try {
      await axios.post('http://localhost:8000/items', newItemObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setNewItem('');
      fetchItems();
    } catch (error) {
      console.error('POST hatası:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Alım Kalemleri</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Yeni Kalem Ekle"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none' }}
          />
          <button className="turuncu-btn" onClick={handleAdd}>
            Ekle
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.name}</span>
              <button
                style={{
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 10px'
                }}
                onClick={() => alert('Silme işlemi yakında!')}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>

        {}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#ff7f00',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItems;
