import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate(); 

  const login = (email, password) => {
    const matched = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matched) {
      setUser(matched);
      navigate('/dashboard'); 
    } else {
      alert('Geçersiz kullanıcı bilgileri!');
    }
  };

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    setUsers((prev) => [...prev, newUser]);
   
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
