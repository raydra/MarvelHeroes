import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import HeroMoreInfo, { HeroInfo } from '../../components/HeroMoreInfo';
import api from '../../services/api';
import md5 from 'js-md5';

import './styles.css';


function HeroDetails() {

    const [heroes, setHeroes] = useState([]);
    const [controler, setControler] = useState(1);

    const params: {
        id: string
    } = useParams();

    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "development";
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "development";

    async function searchHeroes() {

        const timestamp = Number(new Date());
        const hash = md5.create();
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

        console.log(params);
    
        const response = await api.get(`characters/${params.id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`);

        console.log(response.data.data.results);
        setHeroes(response.data.data.results);
    };

    function handleCard() {

        if(controler === 1) {
            searchHeroes();
            setControler(0);
        }
        return;
    }

    handleCard();

    return (
        <div id="page-hero-list" className="container">
            <PageHeader title="Detalhes do Herói." url = "/v1/public/characters">
            </PageHeader>

            <main>
                {heroes.map((hero: HeroInfo) => {
                    return <HeroMoreInfo key={hero.id} hero={hero} />
                })}    
            </main>
        </div>
    )
}

export default HeroDetails;