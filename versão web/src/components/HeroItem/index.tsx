import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export interface Hero {
    id: number;
    name: string;
    description: string;
    resourceURI: string;
    thumbnail: {
        path: string,
        extension: string;
    };
}

interface HeroItemProps {
    hero: Hero;
}

const HeroItem: React.FC<HeroItemProps> = ({hero}) => {

    const pathImg = hero.thumbnail.path+'.'+hero.thumbnail.extension;

    return (
        <article className="hero-item">
        <header>
            <img src={pathImg} alt={hero.name}/>
            <div>
                <strong>{hero.name}</strong>
            </div>
        </header>
        <footer>
            <p>
                Acesse a descrição do herói:       
            </p>
            <Link to={`/v1/public/characters/${hero.id}`}>
                Vamos nessa!
            </Link>
        </footer>
    </article>
    );
}

export default HeroItem;