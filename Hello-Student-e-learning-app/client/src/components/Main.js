import './MainStyles.css';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

import sunImage from './images/sun.png';

import { COURSES_PAGE_ROUTE} from "../utils/consts";

const HomePage = () => {
    // Функция для создания звёзд
    const createStars = () => {
        const container = document.querySelector('body');
        for (let i = 0; i < 1000; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = '.1px';
            star.style.height = '.1px';
            star.style.position = 'absolute'; // Обязательно добавляем позиционирование
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.backgroundColor = 'white'; // Цвет звёзд
            container.appendChild(star);
        }
    };

    const history = useHistory()
    // Хук useEffect для вызова функции после рендера
    useEffect(() => {
        createStars();
    }, []); // Пустой массив зависимостей гарантирует однократный вызов

    const handleGoToCourses = () => {
        history.push(COURSES_PAGE_ROUTE);
    };

    return (


        <div className="container">
            <div className="box">
                <div className="solar-system">
                    <div className="sun">
                        <img src={sunImage} alt="Sun"/>
                    </div>
                    <div className="mercury"></div>
                    <div className="venus"></div>

                    <div className="earth"></div>
                    <div className="mars"></div>
                    <div className="jupiter"></div>
                    <div className="saturn"></div>
                    <div className="uranus"></div>
                    <div className="neptune"></div>
                    <div className="pluto"></div>


                </div>

                <div className="info-panel">
                    <h1>Hello, Student!</h1>
                    <p className="slogan">🚀Грай і код пиши, не гайся,
                        З Hello Student розвивайся!  🌌</p>
                    <button className="cta-button" onClick={handleGoToCourses}>Start Learning Now</button>
                </div>
            </div>
        </div>
    );
};


export default HomePage;