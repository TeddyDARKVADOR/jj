import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/axios";
import bowserData from "../../bowser.json";
import herobrineData from "../../bowser.json"

function Test() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemons] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id === "1026" || id === 1026) {
            const bowser = bowserData.find(p => p.pokedex_id === 1026);
            if (bowser) {
                setPokemons(bowser);
            } else {
                setError(new Error("Bowser introuvable"));
            }
            setLoaded(true);
        } else if (id === "1027" || id === 1027) {
            const herobrine = herobrineData.find(p => p.pokedex_id === 1027);
            if (herobrine) {
                setPokemons(herobrine);
            } else {
                setError(new Error("Herobrine introuvable"));
            }
            setLoaded(true);
        } else {
            api.get(id)
                .then(res => {
                    setPokemons(res.data);
                    setLoaded(true);
                })
                .catch(error => {
                    setError(error);
                    console.error(error);
                    setLoaded(true);
                });
        }
    }, [id, setLoaded, setError]);
    const [favorites, setFavorites] = useState(() => {
        try {
          return JSON.parse(localStorage.getItem("favorites") || "[]");
        } catch {
          return [];
        }
    });
    const isFavorite = (pokemon) => favorites.some(f => f.pokedex_id === pokemon.pokedex_id);
    const toggleFavorite = (pokemon, e) => {
        e.stopPropagation();
        let newFavs;
        if (isFavorite(pokemon)) {
            newFavs = favorites.filter(f => f.pokedex_id !== pokemon.pokedex_id);
        } else {
            newFavs = [...favorites, pokemon];
        }
        setFavorites(newFavs);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
    };
    const calculateWidth = (val) => {
        const max = 255;
        const percent = (val / max) * 100;
        return percent > 100 ? 100 : percent;
    };

    const previousPokemonId = pokemon?.pokedex_id > 1 ? pokemon.pokedex_id - 1 : 1;
    const nextPokemonId= pokemon?.pokedex_id >= 1 ? pokemon.pokedex_id + 1 : 1;



    if (!loaded) {
        return <div className="loading" >En cours de chargement...</div>;
    } else if (error) {
        return <div className="ErrorLoading">Erreur lors du chargement ou Pokémon introuvable.</div>;
    } else {
        return (
            <>
                <h1 className="pokemon-title">
                    <span className="jp-gradient">{pokemon.name?.jp}</span>
                    <span className="flag-separator">🍣 / 🥖</span>
                    <span className="fr-gradient">{pokemon.name?.fr}</span>
                    <span
                        style={{  top: 8, right: 8, color: isFavorite(pokemon) ? "gold" : "#bbb", fontWeight: "bold", cursor: "pointer", fontSize: 22 }}
                       title={isFavorite(pokemon) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        onClick={e => toggleFavorite(pokemon, e)}>★
                    </span>
                </h1>

                {pokemon.pokedex_id < 1026  && (
                    <button 
                        onClick={() => navigate(`/pokemon/${pokemon.pokedex_id}/evolution`)}
                        className="button-voir-evolution">
                        Voir son évolution
                    </button>
                )}
                
                <div className="pokemon-details-container">
                    <div className="left-column">
                        <div className="pokemon-display">
                            {pokemon.sprites?.regular ? (
                                <img 
                                    src={pokemon.sprites.regular} 
                                    alt={pokemon.name?.fr} 
                                    title="Apparence Normale"
                                />
                                
                            ) : (
                                
                                <p className="Nogmax">Ce Pokémon n'a pas d'image normale</p>
                            )}

                            {pokemon.sprites?.shiny ? (
                                <img 
                                    src={pokemon.sprites.shiny} 
                                    alt={`${pokemon.name?.fr} Shiny`} 
                                    title="Apparence Shiny"
                                />
                            ) : (
                                <p className="Nogmax">Ce Pokémon n'a pas de shiny</p>
                            )}

                            {pokemon.sprites?.gmax && pokemon.sprites.gmax.regular ? (
                                <img 
                                    src={pokemon.sprites.gmax.regular} 
                                    alt={`${pokemon.name?.fr} gmax normal`} 
                                    title="Apparence gmax normal"
                                />
                            ) : (
                                <p className="Nogmax">Ce Pokémon n'a pas de Gmax Normal</p>
                            )}

                            {pokemon.sprites?.gmax && pokemon.sprites.gmax.shiny ? (
                                <img 
                                    src={pokemon.sprites.gmax.shiny} 
                                    alt={`${pokemon.name?.fr} gmax shiny`} 
                                    title="Apparence gmax shiny"
                                />
                            ) : (
                                <p className="Nogmax">Ce Pokémon n'a pas de Gmax Shiny</p>
                            )}
                        </div>
                        <p className="pokemon-desc">
                            {pokemon.name?.fr} est un pokémon de type <strong>{pokemon.types ? pokemon.types.map(t => t.name).join('/') : 'Inconnu'}</strong> venant de la génération {pokemon.generation}.
                        </p>
                    </div>



                    <div className="right-column">
                        <h3 className="stats-title">Base Stats</h3>
                        <div className="stats-grid">
                            {/* PV */}
                            <div className="stat-row">
                                <span className="stat-label">PV</span>
                                <span className="stat-value">{pokemon.stats.hp}</span>
                                <div className="stat-bar-bg">
                                    <div 
                                        className="stat-bar-fill hp" 
                                        style={{ width: `${calculateWidth(pokemon.stats.hp)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* ATTAQUE */}
                            <div className="stat-row">
                                <span className="stat-label">Att</span>
                                <span className="stat-value">{pokemon.stats.atk}</span>
                                <div className="stat-bar-bg">
                                    <div 
                                        className="stat-bar-fill atk" 
                                        style={{ width: `${calculateWidth(pokemon.stats.atk)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* DÉFENSE */}
                            <div className="stat-row">
                                <span className="stat-label">Def</span>
                                <span className="stat-value">{pokemon.stats.def}</span>
                                <div className="stat-bar-bg">
                                    <div 
                                        className="stat-bar-fill def" 
                                        style={{ width: `${calculateWidth(pokemon.stats.def)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Taille */}
                            <div className="stat-row">
                                <span className="stat-label">Taille</span>
                                <span className="stat-value">{pokemon.height}</span>
                                
                            </div>

                            {/* Poids */}
                            <div className="stat-row">
                                <span className="stat-label">Poids</span>
                                <span className="stat-value">{pokemon.weight}</span>
                                
                            </div>

                            {/* VITESSE */}
                            <div className="stat-row">
                                <span className="stat-label">Vit</span>
                                <span className="stat-value">{pokemon.stats.vit}</span>
                                <div className="stat-bar-bg">
                                    <div 
                                        className="stat-bar-fill vit" 
                                        style={{ width: `${calculateWidth(pokemon.stats.vit)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="pokemon-nav-container">
                    <button 
                        className="pokemon-btn prev"
                        onClick={() => navigate(`/pokemon/${previousPokemonId}`)}
                        disabled={pokemon?.pokedex_id <= 1}
                    >
                        Last Pokemon
                    </button>
                    <span className="pokeball-separator"></span>
                    <button 
                    className="pokemon-btn next" 
                    onClick={() => navigate(`/pokemon/${nextPokemonId}`)}
                    >
                        Next Pokemon
                    </button>
                </div>
            </>
        );
    }
}

export default Test;
    // const [pokemons, setPokemons] = useState([]);
    
    // useEffect(() => {
    //     api.get("")
    //     .then((res) => setPokemons(res.data))
    //     .catch((err) => console.log(err))
    // }, []);

    // const pokemonsSansPremier = pokemons.slice(1);
    // return (
    //     <>
    //         <h1>LISTE DES POKEMONS</h1>
    //         <div>
    //                 
    //                 {pokemonsSansPremier.map((pokemon) => (
    //                     <li key={pokemon.pokedex_id}>
    //                         <img src={pokemon.sprites?.regular} alt={pokemon.name?.fr} width={200} />
    //                         {pokemon.name?.fr}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </>
    // );
