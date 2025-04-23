import React, { createContext, useContext, useState } from 'react';

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  const addOffer = (offer) => {
    setOffers((prev) => [...prev, offer]);
  };

  const updateOfferStatus = (index, status) => {
    setOffers((prev) => {
      const updated = [...prev];
      updated[index].status = status;
      return updated;
    });
  };

  return (
    <OfferContext.Provider value={{ offers, addOffer, updateOfferStatus }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
