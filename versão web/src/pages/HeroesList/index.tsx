import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import HeroItem, {Hero} from '../../components/HeroItem';
import api from '../../services/api';
import md5 from 'js-md5';

import './styles.css';
import Input from '../../components/Input/Index';


function HeroesList() {

    const [heroes, setHeroes] = useState([]);
    const [name, setName] = useState('');
    const [offset, setOffset] = useState(0);
    const [showDiv, setShowDiv] = useState(false);

    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "development";
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "development";

    function sendingForm(e: FormEvent) {
        e.preventDefault();
        setOffset(0);
        setShowDiv(true);
        searchHeroes();        
    };

    async function searchHeroes(offset2 = 0) {
        setOffset(offset2);
        console.log(offset2);
        const timestamp = Number(new Date());
        const hash = md5.create();
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

        if (name !== '') {
            setShowDiv(false);
            const response = await api.get(`characters?ts=${timestamp}&name=${name}&offset=${offset2}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`);
            setHeroes(response.data.data.results);
            if (response.data.data.total === 0) {
                alert("Nenhum resultado encontrado!");
                setName('');
                setShowDiv(false);    
            }
        } else {
            const response = await api.get(`characters?ts=${timestamp}&offset=${offset2}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`);
            setHeroes(response.data.data.results);
        }
    
    }

    function prevPage() {
        const count = offset - 10;
        setName('');      
        searchHeroes(count);
        window.scrollTo(0, 0);              
    }

    function nextPage() {
        const count = offset + 10;
        setName('');  
        searchHeroes(count);
        window.scrollTo(0, 0);
    }

    return (
        <div id="page-hero-list" className="container">
            <PageHeader title="Busca de heróis." description="Faça uma busca geral ou por herói (nome em inglês) ." url = "/">
                <form id="search-heroes" onSubmit={sendingForm}>
                    <Input type="name" name="name" label="Digite o nome do herói." value={name}
                        onChange={(e) => { setName(e.target.value)}}/>                  
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
            <p>*Se nenhum nome for digitado uma busca geral será realizada.</p>
                {heroes.map((hero: Hero) => {
                    return <HeroItem key={hero.id} hero={hero} />
                })}

                { showDiv &&     
                <div className="actions">
                    <button disabled={offset === 0} onClick={prevPage}>Anterior</button>
                    <button onClick={nextPage}>Próximo</button>
                </div> 
                }   
            </main>

        </div>
    )
}

export default HeroesList;