
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(favs);
    }, []);

    const removeFavorite = (id) => {
        const newFavs = favorites.filter((p) => p.pokedex_id !== id);
        setFavorites(newFavs);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
    };

    if (favorites.length === 0) {
        return <div style={{padding:20}}>Aucun Pokémon en favori.</div>;
    }

    return (
        <div style={{padding:20}}>
            <h2>Mes Pokémon favoris</h2>
            <div className="form-of-grid">
                {favorites.map((pokemon) => (
                    <div
                        key={pokemon.pokedex_id}
                        className="view-of-grid"
                        style={{ position: "relative", cursor: "pointer" }}
                    >
                        <span
                            style={{ position: "absolute", top: 8, right: 8, color: "red", fontWeight: "bold", cursor: "pointer", fontSize: 22 }}
                            title="Retirer des favoris"
                            onClick={e => { e.stopPropagation(); removeFavorite(pokemon.pokedex_id); }}
                        >✖</span>
                        <img
                            src={pokemon.sprites?.regular}
                            alt={pokemon.name?.fr}
                            className="img-of-pokemon"
                            onClick={() => navigate(`/pokemon/${pokemon.pokedex_id}`)}
                        />
                        <h3 onClick={() => navigate(`/pokemon/${pokemon.pokedex_id}`)}>{pokemon.name?.fr}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorite;