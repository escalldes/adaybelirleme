import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer';
import './css/Jury_menu.css';
import axios from 'axios';

function Applicant_home() {
    const [userName, setUserName] = useState('Kullanıcı'); // Varsayılan değer
    const [error, setError] = useState('');

    useEffect(() => {
        // Token'ı localStorage'dan alıyoruz
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token bulunamadı.');
            return;
        }

        // Kullanıcı bilgilerini almak için API isteği
        axios
            .get('http://localhost:5000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUserName(response.data.ad); // API'den gelen 'ad' değerini set ediyoruz
            })
            .catch(err => {
                console.error('API hatası:', err.response);
                setError(err.response?.data?.error || 'Kullanıcı bilgileri alınamadı');
                setUserName('Bilinmeyen'); // Hata durumunda varsayılan isim
            });
    }, []); // Boş bağımlılık dizisi, sadece bileşen yüklendiğinde çalışır

    const itemsPerPage = 4;
    const LatestAnnouncements = [
        ['Duyuru 1', 'Duyuru 2', 'Duyuru 3', 'Duyuru 4'],
        ['Duyuru 5', 'Duyuru 6', 'Duyuru 7', 'Duyuru 8'],
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = LatestAnnouncements.length;

    const currentItems = LatestAnnouncements[currentPage - 1];

    const itemsPerPage2 = 4;
    const applicationHistory = [
        ['Geçmiş Başvuru 1', 'Geçmiş 2', 'Geçmiş 3', 'Geçmiş 4'],
        ['Geçmiş 5', 'Geçmiş 6', 'Geçmiş 7', 'Geçmiş 8'],
    ];
    const [currentPage2, setCurrentPage2] = useState(1);
    const totalPages2 = applicationHistory.length;

    const currentItems2 = applicationHistory[currentPage2 - 1];

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                            {/* API'den gelen 'ad' değerini burada kullanıyoruz */}
                            <span className="spanName">
                                <p>Sayın {userName}</p>
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
                        {currentItems.map((role, index) => (
                            <div key={index} className="jury-item">
                                <p className="jury-date">27.11.2025</p>
                                <p className="jury-role">TekFak {role} Alımı</p>
                                <button className="evaluate-button">Değerlendir</button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Önceki
                        </button>
                        <span>
                            Sayfa {currentPage} / {totalPages}
                        </span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Sonraki
                        </button>
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
                    <h2>En Son Yüklenen Duyurular</h2>
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
                        <button onClick={prevPage} disabled={currentPage2 === 1}>
                            Önceki
                        </button>
                        <span>
                            Sayfa {currentPage2} / {totalPages2}
                        </span>
                        <button onClick={nextPage} disabled={currentPage2 === totalPages2}>
                            Sonraki
                        </button>
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