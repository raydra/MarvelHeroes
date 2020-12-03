import React from 'react';
import './styles.css';

export interface HeroInfo {
    id: number;
    name: string;
    description: string;
    resourceURI: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    urls: Array<{
        type: string;
        url: string;
    }>;
}

interface HeroItemProps {
    hero: HeroInfo;
}

const HeroMoreInfo: React.FC<HeroItemProps> = ({hero}) => {

    const pathImg = hero.thumbnail.path+'.'+hero.thumbnail.extension;

    return (
        <article className="hero-item">
        <header>
            <img src={pathImg} alt={hero.name}/>
            <div>
                <strong>{hero.name}</strong>
            </div>
        </header>
        { hero.description === '' && (
            <p>Nenhuma descrição disponível.</p>
        ) }
        <p>{hero.description}</p>
        <footer>
            <p>
                Acesse o site da marvel para mais informações deste personagem:       
            </p>
            <a href={hero.urls[0].url}>
                Clique aqui!
            </a>
        </footer>
    </article>
    );
}

export default HeroMoreInfo;