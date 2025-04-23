import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // context'e dikkat et
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth(); // login fonksiyonu context'ten alınır
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Tüm alanları doldurmanız gerekiyor.');
      return;
    }

    if (!email.includes('@')) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setError('');
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}

          <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <button type="submit" className="turuncu-btn">Giriş Yap</button>
            <button type="button" onClick={() => navigate('/register')} className="turuncu-btn">Kayıt Ol</button>
            <button type="button" onClick={() => navigate('/forgot-password')} className="turuncu-btn">Şifremi Unuttum</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
