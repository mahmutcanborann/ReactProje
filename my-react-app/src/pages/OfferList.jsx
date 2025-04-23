import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './LoginPage.css';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');
  const [visibleButtons, setVisibleButtons] = useState([]);
  const navigate = useNavigate(); 

  const fetchOffers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/offers');
      setOffers(res.data);
      setVisibleButtons(res.data.map(() => true));
    } catch (err) {
      console.error('Veriler alınamadı:', err);
      setError('❌ Teklifler alınamadı.');
    }
  };

  const updateStatus = async (index, status) => {
    try {
      const updatedOffer = { ...offers[index], status };
      await axios.put(`http://localhost:8000/offers/${index}`, updatedOffer, {
        headers: { 'Content-Type': 'application/json' }
      });
      const newOffers = [...offers];
      newOffers[index] = updatedOffer;
      setOffers(newOffers);

      const updatedVisibility = [...visibleButtons];
      updatedVisibility[index] = false;
      setVisibleButtons(updatedVisibility);

      setTimeout(() => {
        const updated = [...visibleButtons];
        updated[index] = false;
        setVisibleButtons(updated);
      }, 3000);
    } catch (err) {
      console.error('Durum güncellenemedi:', err);
      setError('❌ Durum güncellemesi başarısız.');
    }
  };

  const showButtonsAgain = (index) => {
    const updated = [...visibleButtons];
    updated[index] = true;
    setVisibleButtons(updated);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Teklif Listesi</h2>
        {error && <p className="error">{error}</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {offers.map((offer, index) => (
            <li
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px',
                color: '#fff',
              }}
            >
              <p><strong>Ürün:</strong> {offer.product}</p>
              <p><strong>Açıklama:</strong> {offer.description}</p>
              <p><strong>Bütçe:</strong> ₺{offer.budget}</p>
              <p><strong>Durum:</strong> {offer.status}</p>

              {visibleButtons[index] ? (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="turuncu-btn" onClick={() => updateStatus(index, 'Onaylandı')}>
                    Onayla
                  </button>
                  <button
                    style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px' }}
                    onClick={() => updateStatus(index, 'Reddedildi')}
                  >
                    Reddet
                  </button>
                </div>
              ) : (
                <button
                  style={{ marginTop: '10px', backgroundColor: '#34495e', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px' }}
                  onClick={() => showButtonsAgain(index)}
                >
                  Değiştir
                </button>
              )}
            </li>
          ))}
        </ul>

        {}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '20px',
            backgroundColor: 'orange',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Anasayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default OfferList;
