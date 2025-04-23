import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (!code || !newPassword || !confirmPassword) {
      setError('Tüm alanları doldurmanız gerekiyor.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler uyuşmuyor.');
      return;
    }

    setError('');
    setSuccess('Şifre sıfırlama başarılı!');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="glass-card">
        <h2>Şifrenizi mi Unuttunuz?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-posta Adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Onay Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Yeni Şifre"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Yeni Şifre (Tekrar)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          {success && <p style={{ color: '#00e676' }}>{success}</p>}
          <button type="submit">Şifreyi Sıfırla</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
