import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer';
import './css/Jury_menu.css';

function JuryMenu() {
    const itemsPerPage = 4;
    const juryData = [
        ["Prof", "Doç", "ArşGör", "YarDoç"],
        ["Mühendis", "Teknisyen", "Danışman", "Analist"]
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = juryData.length;

    const currentItems = juryData[currentPage - 1];

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
                            <span className="spanName"><p>Sayın Batın DİNCER</p></span>
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
                        <h4>Kocaeli Üniversitesi</h4>
                        <span className="line"></span>
                    </div>
                    <h2>Jüri Değerlendirme Formları</h2>
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
                        <button onClick={prevPage} disabled={currentPage === 1}>Önceki</button>
                        <span>Sayfa {currentPage} / {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>Sonraki</button>
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

export default JuryMenu;