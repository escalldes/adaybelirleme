import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer';
import './css/Jury_menu.css';
import axios from 'axios';

function Applicant_home() {
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
        // Örneğin, response.data şu şekilde olabilir:
        // { ad: "Ahmet", soyad: "Yılmaz", tc: "12345678901", email: "ahmet@example.com", rol: "Akademik Personel", dogumYili: "1970" }
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Profil verisi çekilemedi:", error);
      });
    }
  }, []);

  // Diğer pagination kodlarınız burada mevcut...
  const LatestAnnouncements = [
    ["Duyuru 1", "Duyuru 2", "Duyuru 3", "Duyuru 4"],
    ["Duyuru 5", "Duyuru 6", "Duyuru 7", "Duyuru 8"]
  ];
  const [currentPage1, setCurrentPage1] = useState(1);
  const totalPages1 = LatestAnnouncements.length;
  const currentItems1 = LatestAnnouncements[currentPage1 - 1];

  const nextPage1 = () => {
    if (currentPage1 < totalPages1) setCurrentPage1(currentPage1 + 1);
  };

  const prevPage1 = () => {
    if (currentPage1 > 1) setCurrentPage1(currentPage1 - 1);
  };

  const applicationHistory = [
    ["Geçmiş Başvuru 1", "Geçmiş 2", "Geçmiş 3", "Geçmiş 4"],
    ["Geçmiş 5", "Geçmiş 6", "Geçmiş 7", "Geçmiş 8"]
  ];
  const [currentPage2, setCurrentPage2] = useState(1);
  const totalPages2 = applicationHistory.length;
  const currentItems2 = applicationHistory[currentPage2 - 1];

  const nextPage2 = () => {
    if (currentPage2 < totalPages2) setCurrentPage2(currentPage2 + 1);
  };

  const prevPage2 = () => {
    if (currentPage2 > 1) setCurrentPage2(currentPage2 - 1);
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
              <p>Kocaeli Üniversitesi</p>
              <p>Akademik Personel</p>
              <p>Başvuru Sistemine</p>
              <p>Hoşgeldiniz</p>
              <br />
              <button type="submit">Hesabım</button>
            </div>
          </div>
        </div>
        <div className="jury-container2">
          <div className="announcement-card">
            <div className="announcement-image">
              <div className="announcement-image-left"></div>
              <div className="announcement-image-right"></div>
            </div>
            <p className="date">27.11.2025</p>
            <h3 className="announcement-title">Duyuru Başlık Alanı</h3>
          </div>
        </div>
      </div>

      <div className="jury-container3">
        <div className="jury-container3-left">
          <div className="title-line">
            <h4>Güncel Bilgilere Hızlı Erişin</h4>
            <span className="line"></span>
          </div>
          <h2>En Son Yüklenen Duyurular</h2>
          <div className="jury-items">
            {currentItems1.map((role, index) => (
              <div key={index} className="jury-item">
                <p className="jury-date">27.11.2025</p>
                <p className="jury-role">TekFak {role} Alımı</p>
                <button className="evaluate-button">Değerlendir</button>
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

      <div className="jury-container3">
        <div className="jury-container3-left">
          <div className="title-line">
            <h4>Güncel Bilgilere Hızlı Erişin</h4>
            <span className="line"></span>
          </div>
          <h2>Başvuru Geçmişi</h2>
          <div className="jury-items">
            {currentItems2.map((role, index) => (
              <div key={index} className="jury-item">
                <p className="jury-date">27.11.2025</p>
                <p className="jury-role">TekFak {role}</p>
                <button className="evaluate-button">Değerlendir</button>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={prevPage2} disabled={currentPage2 === 1}>Önceki</button>
            <span>Sayfa {currentPage2} / {totalPages2}</span>
            <button onClick={nextPage2} disabled={currentPage2 === totalPages2}>Sonraki</button>
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

export default Applicant_home;