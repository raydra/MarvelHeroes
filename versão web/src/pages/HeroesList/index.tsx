import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import HeroItem, {Hero} from '../../components/HeroItem';
import api from '../../services/api';
import md5 from 'js-md5';

import './styles.css';


function HeroesList() {

    const [heroes, setHeroes] = useState([]);

    const PRIVATE_KEY = 'e1bd40240ba5d0437d272bb8c93dee3a36d586f8';
    const PUBLIC_KEY = '34be0d81e8dd2694ad5acd0370da91ba';

    async function searchHeroes(e: FormEvent) {
        e.preventDefault();

        const timestamp = Number(new Date());
        const hash = md5.create();
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    
        const response = await api.get(`characters?ts=${timestamp}&limit=20&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`);

        setHeroes(response.data.data.results);
        console.log(response.data.data.results);
         
    };

    return (
        <div id="page-hero-list" className="container">
            <PageHeader title="Busque e descubra os heróis disponíveis no momento." url = "/">
                <form id="search-heroes" onSubmit={searchHeroes}>                  
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {heroes.map((hero: Hero) => {
                    return <HeroItem key={hero.id} hero={hero} />
                })}    
            </main>

        </div>
    )
}

export default HeroesList;