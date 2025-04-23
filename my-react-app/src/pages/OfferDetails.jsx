
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyOffers = [
  {
    id: 1,
    title: 'Dizüstü Bilgisayar Alımı',
    description: '50 adet yüksek performanslı laptop alımı için teklif toplanacak.',
    product: 'bilgisayar',
    budget: 250000,
    deadline: '2025-05-15',
  },
  {
    id: 2,
    title: 'Ofis Mobilyaları',
    description: 'Yeni ofisimiz için masa, sandalye, dolap teklifi toplanacak.',
    product: 'mobilya',
    budget: 100000,
    deadline: '2025-05-20',
  },
];

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = dummyOffers.find((offer) => offer.id === parseInt(id));

  if (!offer) {
    return <div style={{ color: '#fff', padding: 20 }}><h2>Teklif Bulunamadı</h2></div>;
  }

  const handleApprove = () => {
    alert('Teklif onaylandı');
    navigate('/offers');
  };

  const handleReject = () => {
    alert('Teklif reddedildi');
    navigate('/offers');
  };

  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h2>{offer.title}</h2>
      <p>{offer.description}</p>
      <p><strong>Toplam Bütçe:</strong> {offer.budget} TL</p>
      <p><strong>Ürün:</strong> {offer.product}</p>
      <p><strong>Son Tarih:</strong> {offer.deadline}</p>

      <button onClick={handleApprove} style={{ marginRight: 10 }}>Onayla</button>
      <button onClick={handleReject}>Reddet</button>
    </div>
  );
};
