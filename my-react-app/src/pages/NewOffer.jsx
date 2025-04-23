import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const NewOffer = () => {
  const [newOffer, setNewOffer] = useState({
    product: '',
    description: '',
    budget: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newOffer.product || !newOffer.description || !newOffer.budget) {
      setError('❗ Lütfen tüm alanları doldurunuz.');
      return;
    }

    try {
      const fullOffer = {
        ...newOffer,
        status: 'Beklemede'
      };

      await axios.post('http://localhost:8000/offers', fullOffer, {
        headers: { 'Content-Type': 'application/json' }
      });

      setSuccess('✅ Teklif başarıyla eklendi!');
      setNewOffer({ product: '', description: '', budget: '' });
      setError('');

      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (err) {
      console.error('Teklif eklenemedi:', err);
      setError('❌ Sunucu hatası: teklif eklenemedi.');
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Yeni Teklif Oluştur</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            name="product"
            placeholder="Ürün Adı"
            value={newOffer.product}
            onChange={handleChange}
            required
            className="input"
          />

          <textarea
            name="description"
            placeholder="Ürün Açıklaması"
            value={newOffer.description}
            onChange={handleChange}
            rows={5}
            required
            className="textarea"
            style={{
              resize: 'none',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '1rem'
            }}
          />

          <input
            name="budget"
            type="number"
            placeholder="Bütçe (₺)"
            value={newOffer.budget}
            onChange={handleChange}
            required
            className="input"
          />

          {error && <p className="error">{error}</p>}
          {success && <p style={{ color: 'limegreen' }}>{success}</p>}

          <button type="submit" className="turuncu-btn">Teklifi Gönder</button>
          <button type="button" className="turuncu-btn" onClick={goToDashboard}>Anasayfaya Dön</button>
        </form>
      </div>
    </div>
  );
};

export default NewOffer;
