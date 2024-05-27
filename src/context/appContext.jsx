import { createContext, useContext, useState, useEffect } from "react";
import { onValue, ref, set } from "firebase/database";
import seedrandom from 'seedrandom';

import { database, signInWithGithubPopup, signInWithGooglePopup, signOutUserApp } from "../utils/firebase.utils"
import api from "../services/api";

const AppContext = createContext({})

export function AppContextProvider({ children }) {
    const NUMBER_POKEMONS = 151;

    const [pokemon, setPokemon] = useState({});
    const [alternatives, setAlternative] = useState([])
    const [randomPoke, setRandomPoke] = useState('')
    const [user, setUser] = useState(null)
    const [baseUser, setBaseUser] = useState({});

    async function handlePokemonsListDefault() {
        const response = await api.get('/pokemon', {
            params: {
                limit: NUMBER_POKEMONS,
            },
        });

        let index = convertDate(new Date())

        if(Object.keys(baseUser).length > 0 && baseUser[index]) {
            var alts = [
                response.data.results[randomPoke - 1].name,
                baseUser[index].selected === response.data.results[randomPoke - 1].name ? response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name && poke.name !== baseUser[index].selected)[Math.floor(Math.random() * (148 - 0 + 1) + 0)].name : baseUser[index].selected,
                response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name && poke.name !== baseUser[index].selected)[Math.floor(Math.random() * (148 - 0 + 1) + 0)].name,
                response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name && poke.name !== baseUser[index].selected)[Math.floor(Math.random() * (148 - 0 + 1) + 0)].name,
            ];

            setAlternative(
                alts.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
            )
        } else {
            var alts = [
                response.data.results[randomPoke - 1].name,
                response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name)[Math.floor(Math.random() * (149 - 0 + 1) + 0)].name,
                response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name)[Math.floor(Math.random() * (149 - 0 + 1) + 0)].name,
                response.data.results.filter(poke => poke.name !== response.data.results[randomPoke - 1].name)[Math.floor(Math.random() * (149 - 0 + 1) + 0)].name,
            ];

            setAlternative(
                alts.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
            )
        }
    };

    function convertDate(params) {
        const day = params.getDate();
        const month = params.getMonth() + 1;
        const year = params.getFullYear();

        const date = year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        
        return date
    }

    async function handleSignIn(params) {
        const response = params === 'google' ? await signInWithGooglePopup() : params === 'github' ? await signInWithGithubPopup() : null;

        setUser(response.user)
        sessionStorage.setItem("@AuthFirebase:token", response.user.accessToken)
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(response.user))
    }

    async function handleSignOut() {
        await signOutUserApp()

        sessionStorage.clear()
        localStorage.clear()
        setUser(null)

        window.location.reload()
    }

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("@AuthFirebase:token")
        const sessionUser = sessionStorage.getItem("@AuthFirebase:user")

        sessionToken && sessionUser ? setUser(JSON.parse(sessionUser)) : setUser(null)
    }, []);

    useEffect(() => {
        if(user)
            set(ref(database, `users/${user.uid}/author`), {
                uid: user.uid,
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL
            });
    }, [user]);

    useEffect(() => {
        if(user) {
            const dateCurrent = new Date();
    
            const day = dateCurrent.getDate();
            const month = dateCurrent.getMonth() + 1;
            const year = dateCurrent.getFullYear();
    
            const dataString = `${day}${month}${year}`;
    
            const semente = parseInt(dataString);
    
            seedrandom(semente, { global: true });
    
            const numeroAleatorio = Math.floor(Math.random() * 152);
    
            setRandomPoke(numeroAleatorio);
        }
    }, [user]);

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

    useEffect(() => {
        if(randomPoke)
            handlePokemonsListDefault();
    }, [randomPoke, baseUser]);

    useEffect(() => {
        if(user) {
            const baseRef = ref(database, `users/${user.uid}/game`);
    
            const handleSetHistoric = onValue(baseRef, data => {
                const dataValues = data.val();
    
                const dataList = [];
                for (let id in dataValues) {
                    dataList.push({ ...dataValues[id] });
                }

                let pokesObj = {};
                dataList.forEach(item => {
                    Object.keys(item).forEach(key => {
                        pokesObj[key] = item[key];
                    });
                });
                
                setBaseUser(pokesObj);
            }, {
                onlyOnce: true
            });
    
            return () => { handleSetHistoric() };
        }
    }, [user])

    return (
        <AppContext.Provider value={{
            pokemon,
            alternatives,
            randomPoke,
            convertDate,

            user,
            signed: !!user,
            handleSignIn,
            handleSignOut
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)