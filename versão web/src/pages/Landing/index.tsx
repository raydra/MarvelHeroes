import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.png';
import marvel from '../../assets/images/marvel.jpg'

import searchIcon from '../../assets/images/icons/search.svg';

import './styles.css';


function Landing() {

    return (
        <div id="page-landing">
            <div id="page-landing-content">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Bem-vindo a listagem de heróis v1</h2>
                </div>
                <img 
                    src={marvel} 
                    alt="Ihero" 
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to="/v1/public/characters" className="heroes">
                        <img src={searchIcon} alt="Listar heróis"/>
                        Listar heróis
                    </Link>
                </div>
            </div>
        </div>
    
    )
}

export default Landing;