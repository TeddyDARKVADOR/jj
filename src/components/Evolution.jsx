import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/axios";

function Evolution() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(id)
            .then(res => {
                setPokemon(res.data);
                setLoaded(true);
            })
            .catch(error => {
                setError(error);
                console.error(error);
                setLoaded(true);
            });
    }, [id, setLoaded]);

    const hasEvolution = () => {
        if (!pokemon?.evolution) return false;
        const { pre, next, mega } = pokemon.evolution;
        return (pre && pre.length > 0) || (next && next.length > 0) || (mega && mega.length > 0);
    };

    const goToPokemon = (pokedexId) => {
        navigate(`/pokemon/${pokedexId}`);
    };

    const goToEvolution = (pokedexId) => {
        navigate(`/pokemon/${pokedexId}/evolution`);
    };

    if (!loaded) {
        return <div className="loading">En cours de chargement...</div>;
    } else if (error) {
        return <div className="ErrorLoading">Erreur lors du chargement ou Pokémon introuvable.</div>;
    } else {
        return (
            <>
                <h1 className="pokemon-title">
                    Évolutions de <span className="fr-gradient">{pokemon.name?.fr}</span>
                </h1>

                <button 
                    onClick={() => goToPokemon(pokemon.pokedex_id)}
                    >
                    ← Retour à {pokemon.name?.fr}
                </button>

                <div className="evolution-container">
                    {!hasEvolution() ? (
                        <div className="no-evolution">
                            <p> {pokemon.name?.fr} n'a pas d'évolution connue.</p>
                        </div>
                    ) : (
                        <>
                            {/* Pré-évolutions */}
                            {pokemon.evolution?.pre && pokemon.evolution.pre.length > 0 && (
                                <div className="evolution-section">
                                    <h2 className="evolution-section-title"> Pré-évolution(s)</h2>
                                    <div className="evolution-cards">
                                        {pokemon.evolution.pre.map((evo) => (
                                            <div key={evo.pokedex_id} className="evolution-card">
                                                <img 
                                                    src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${evo.pokedex_id}/regular.png`}
                                                    alt={evo.name}
                                                    className="evolution-sprite"
                                                />
                                                <h3 className="evolution-name">{evo.name}</h3>
                                                <div className="evolution-buttons">
                                                    <button onClick={() => goToPokemon(evo.pokedex_id)}>
                                                        Voir détails
                                                    </button>
                                                    <button onClick={() => goToEvolution(evo.pokedex_id)}>
                                                        Ses évolutions
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pokémon actuel */}
                            <div className="evolution-section current">
                                <h2 className="evolution-section-title"> Pokémon actuel</h2>
                                <div className="evolution-cards">
                                    <div className="evolution-card current-pokemon">
                                        <img 
                                            src={pokemon.sprites?.regular}
                                            alt={pokemon.name?.fr}
                                            className="evolution-sprite"
                                        />
                                        <h3 className="evolution-name">{pokemon.name?.fr}</h3>
                                        <p className="pokemon-id">#{pokemon.pokedex_id}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Évolutions suivantes */}
                            {pokemon.evolution?.next && pokemon.evolution.next.length > 0 && (
                                <div className="evolution-section">
                                    <h2 className="evolution-section-title"> Évolution(s) suivante(s)</h2>
                                    <div className="evolution-cards">
                                        {pokemon.evolution.next.map((evo) => (
                                            <div key={evo.pokedex_id} className="evolution-card">
                                                <img 
                                                    src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${evo.pokedex_id}/regular.png`}
                                                    alt={evo.name}
                                                    className="evolution-sprite"
                                                />
                                                <h3 className="evolution-name">{evo.name}</h3>
                                                <p className="evolution-condition"> {evo.condition}</p>
                                                <div className="evolution-buttons">
                                                    <button onClick={() => goToPokemon(evo.pokedex_id)}>
                                                        Voir détails
                                                    </button>
                                                    <button onClick={() => goToEvolution(evo.pokedex_id)}>
                                                        Ses évolutions
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Méga-évolutions */}
                            {pokemon.evolution?.mega && pokemon.evolution.mega.length > 0 && (
                                <div className="evolution-section mega">
                                    <h2 className="evolution-section-title"> Méga-évolution(s)</h2>
                                    <div className="evolution-cards">
                                        {pokemon.evolution.mega.map((mega, index) => (
                                            <div key={index} className="evolution-card mega-card">
                                                <div className="mega-sprites">
                                                    <img 
                                                        src={mega.sprites?.regular}
                                                        alt={`Méga ${pokemon.name?.fr}`}
                                                        className="evolution-sprite"
                                                        title="Normal"
                                                    />
                                                    <img 
                                                        src={mega.sprites?.shiny}
                                                        alt={`Méga ${pokemon.name?.fr} Shiny`}
                                                        className="evolution-sprite shiny"
                                                        title="Shiny"
                                                    />
                                                </div>
                                                <h3 className="evolution-name">Méga {pokemon.name?.fr}</h3>
                                                <p className="evolution-condition"> Orbe: {mega.orbe}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
}

export default Evolution;
