import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Tüm alanları doldurmanız gerekiyor.');
      return;
    }

    if (!email.includes('@')) {
      setError('Geçerli bir e-posta adresi girin.');
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
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Giriş Yap</button>
          <button onClick={() => navigate('/register')}>Kayıt Ol</button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
