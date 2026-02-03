
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import api from "../services/axios";

const Accueil = ({ langue = 'fr' }) => {

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generation, setGeneration] = useState("");
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();
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

  useEffect(() => {
    api.get("")
      .then(res => {
        setPokemons(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [setLoading, loading]);

  const typeSet = new Set();
  const categorieSet = new Set();
  const tailleSet = new Set();
  pokemons.forEach((pokemon, idx) => {
    if (idx === 0) return;
    if (Array.isArray(pokemon.types)) {
      pokemon.types.forEach(t => t.name && typeSet.add(t.name));
    }
    if (pokemon.category) categorieSet.add(pokemon.category);
    if (pokemon.height <= 10) tailleSet.add("petit");
    else if (pokemon.height > 10 && pokemon.height <= 20) tailleSet.add("moyen");
    else if (pokemon.height > 20) tailleSet.add("grand");
  });

  const typeOptions = Array.from(typeSet).sort((a, b) => a.localeCompare(b, 'fr'));
  const categorieOptions = Array.from(categorieSet).sort((a, b) => a.localeCompare(b, 'fr'));

  const filteredPokemons = pokemons.filter((pokemon, idx) => {
    if (idx === 0) return false;
    let ok = true;
    if (generation && String(pokemon.generation) !== generation) ok = false;
    if (categorie && pokemon.category !== categorie) ok = false;
    if (type && !pokemon.types?.some(t => t.name === type)) ok = false;
    if (search && !(pokemon.name?.[langue] || pokemon.name?.fr || "").toLowerCase().includes(search.toLowerCase())) ok = false;
    return ok;
  });

  if (loading) return <div>Chargement des pokémons...</div>;
  if (error) return <div>Erreur lors du chargement des pokémons.</div>;

  return (
    <>
      <h1>VOICI LE POKEDEX</h1>
      <div className="grille-pokemon-div">
        <form className="form-choose-pokemon" onSubmit={e => e.preventDefault()}>
          <input
            type="search"
            id="search-input"
            name="q"
            placeholder="Rechercher un pokémon par nom"
            autoComplete="off"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: 8, padding: 4, fontSize: 16 }}
          />
          <select value={generation} onChange={e => setGeneration(e.target.value)}>
            <option value="">Génération</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          <select value={categorie} onChange={e => setCategorie(e.target.value)}>
            <option value="">Catégorie</option>
            {categorieOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Type</option>
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </form>
        <div className="form-of-grid">
          {filteredPokemons.map((pokemon, idx) => (
            <div
              key={pokemon.pokedex_id || idx}
              className="view-of-grid"
              style={{ position: "relative" }}
              onClick={() => navigate(`/pokemon/${pokemon.pokedex_id}`)}
            >
              <span
                style={{ position: "absolute", top: 8, right: 8, color: isFavorite(pokemon) ? "gold" : "#bbb", fontWeight: "bold", cursor: "pointer", fontSize: 22 }}
                title={isFavorite(pokemon) ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={e => toggleFavorite(pokemon, e)}
              >★</span>
              <img src={pokemon.sprites?.regular} 
                alt={pokemon.name?.[langue] || pokemon.name?.fr}
                className="img-of-pokemon"
              />
              <h3>{pokemon.name?.[langue] || pokemon.name?.fr}</h3>
              {/* Affichage des talents */}
              {pokemon.talents && Array.isArray(pokemon.talents) && pokemon.talents.length > 0 && (
                <div >
                  <strong>Talents :</strong>
                  <ul className="list-of-talents">
                    {pokemon.talents.map((talent, i) => (
                      <li key={i}>{talent.name}{talent.tc ? "" : ""}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accueil;
