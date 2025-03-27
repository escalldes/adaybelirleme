import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer';
import './css/Jury_menu.css';
import axios from 'axios';

function Admin_home() {
  const [profile, setProfile] = useState(null);

  // API'den kullanıcı verilerini çekmek için useEffect kullanımı
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Örneğin, response.data şu şekilde ol abilir:
        // { ad: "Ahmet", soyad: "Yılmaz", tc: "12345678901", email: "ahmet@example.com", rol: "Akademik Personel", dogumYili: "1970" }
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Profil verisi çekilemedi:", error);
      });
    }
  }, []);

  // Diğer pagination kodlarınız burada mevcut...
  const CurrentActiveListings = [
    ["İlan 1", "İlan 2", "İlan 3", "İlan 4"],
    ["İlan 5", "İlan 6", "İlan 7", "İlan 8"]
  ];
  const [currentPage1, setCurrentPage1] = useState(1);
  const totalPages1 = CurrentActiveListings.length;
  const currentItems1 = CurrentActiveListings[currentPage1 - 1];

  const nextPage1 = () => {
    if (currentPage1 < totalPages1) setCurrentPage1(currentPage1 + 1);
  };

  const prevPage1 = () => {
    if (currentPage1 > 1) setCurrentPage1(currentPage1 - 1);
  };


  return (
    <div>
      <div className="jury-container">
        <div className="jury-container1">
          <div className="title-line">
            <h4>Kocaeli Üniversitesi Bilgi Merkezi</h4>
            <span className="line"></span>
          </div>
          <div className="jury-container1-in">
            <div className="jury-container-content">
              <span className="spanName">
                <p>Sayın {profile?.ad} {profile?.soyad}</p>
              </span>
              <p>Kocaeli Üniversitesi İlan</p>
              <p> Yönetim Paneline</p>
              <p>Hoşgeldiniz</p>
              <br />
              <button type="submit">Hesabım</button>
            </div>
          </div>
        </div>
     
      </div>

      <div className="jury-container3">
        <div className="jury-container3-left">
          <div className="title-line">
            <h4>Kocaeli Üniversitesi</h4>
            <span className="line"></span>
          </div>
          <h2>Güncel Aktif İlanlar</h2>
          <div className="jury-items">
            {currentItems1.map((role, index) => (
              <div key={index} className="jury-item">
                <p className="jury-date">27.11.2025</p>
                <p className="jury-role">TekFak {role} Alımı</p>
                <button className="evaluate-button">İlan İçeriği</button>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={prevPage1} disabled={currentPage1 === 1}>Önceki</button>
            <span>Sayfa {currentPage1} / {totalPages1}</span>
            <button onClick={nextPage1} disabled={currentPage1 === totalPages1}>Sonraki</button>
          </div>
        </div>
        <div className="jury-container3-right">
          <div className="jury-container3-right-container-image"></div>
        </div>
      </div>


   

      <Footer />
    </div>
  );
}

export default Admin_home
