import { createContext, useContext, useState, useEffect } from "react";
import seedrandom from 'seedrandom';

import api from "../services/api";

const AppContext = createContext({})

export function AppContextProvider({ children }) {
    const NUMBER_POKEMONS = 151;

    const tokenLoggedUser = localStorage.getItem("tokenLoggedUser") || undefined;
    const pokeLocation = JSON.parse(localStorage.getItem('pokemonSelected')) || undefined
    const verify = pokeLocation && pokeLocation[convertDate(new Date())] ? pokeLocation[convertDate(new Date())].selected : null

    const [pokemon, setPokemon] = useState({});
    const [alternatives, setAlternative] = useState([])
    const [randomPoke, setRandomPoke] = useState('')

    async function handlePokemonsListDefault() {
        const response = await api.get('/pokemon', {
            params: {
                limit: NUMBER_POKEMONS,
            },
        });

        var alts = [
            response.data.results[randomPoke - 1].name,
            response.data.results[Math.floor(Math.random() * (150 - 0 + 1) + 0)].name,
            response.data.results[Math.floor(Math.random() * (150 - 0 + 1) + 0)].name,
            response.data.results[Math.floor(Math.random() * (150 - 0 + 1) + 0)].name,
        ];

        setAlternative(
            alts.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
        )
    };

    function convertDate(params) {
        const day = params.getDate();
        const month = params.getMonth() + 1;
        const year = params.getFullYear();

        const date = year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        
        return date
    }

    useEffect(() => {
        const dateCurrent = new Date();

        const day = dateCurrent.getDate();
        const month = dateCurrent.getMonth() + 1;
        const year = dateCurrent.getFullYear();

        const dataString = `${day}${month}${year}`;

        const semente = parseInt(dataString);

        seedrandom(semente, { global: true });

        const numeroAleatorio = Math.floor(Math.random() * 152);

        setRandomPoke(numeroAleatorio);
    }, []);

    useEffect(() => {
        if (randomPoke)
            api.get(`/pokemon/${randomPoke}`).then(response => {
                const { id, types, sprites, name, cries } = response.data;

                let typeColor = types[0].type.name;

                if (typeColor === 'normal' && types.length > 1) {
                    typeColor = types[1].type.name;
                }

                setPokemon({
                    name,
                    id,
                    image: sprites.other['official-artwork'].front_default,
                    type: types,
                    voices: cries
                });
            });
    }, [randomPoke]);

    useEffect(() => {
        if(Object.keys(alternatives).length <= 0 && randomPoke)
            handlePokemonsListDefault();
    }, [alternatives, randomPoke]);

    return (
        <AppContext.Provider value={{
            tokenLoggedUser,
            pokeLocation,
            verify,
            pokemon,
            alternatives,
            randomPoke,
            convertDate
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)