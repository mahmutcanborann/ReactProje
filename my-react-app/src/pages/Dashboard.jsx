
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Hoş Geldiniz, {user?.name || 'Kullanıcı'}!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#eee' }}>
          Alım kalemleri ekleyebilir, teklif oluşturabilir veya gelen tekliflerinizi inceleyebilirsiniz.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/purchase-items')} className="turuncu-btn">
            Alım Kalemleri
          </button>
          <button onClick={() => navigate('/new-offer')} className="turuncu-btn">
            Yeni Teklif Oluştur
          </button>
          <button onClick={() => navigate('/offers')} className="turuncu-btn">
            Gelen Teklifler
          </button>
        </div>

        <button
          onClick={logout}
          style={{
            marginTop: '2rem',
            backgroundColor: '#ff4d4d',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}