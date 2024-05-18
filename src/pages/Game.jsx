import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { push, ref, onValue } from "firebase/database";

import { useAppContext } from "../context/appContext";
import { database } from "../utils/firebase.utils";
import { BtnSelect } from "../components/Button";

export function Game() {
    let location = useLocation();

    const player = useRef();
    const toastRef = useRef(null);

    const { pokemon, convertDate, alternatives, randomPoke, handleSignOut, user } = useAppContext();

    const [select, setSelect] = useState('')
    const [status, setStatus] = useState('')
    const [userMenu, setUserMenu] = useState('')
    const [verify, setVerify] = useState('');
    const [baseUser, setBaseUser] = useState([]);
    const [history, setHistory] = useState({})
    const [loading, setLoading] = useState(false)

    function playVoice() {
        var audio = player.current
        audio.volume = 0.2;
        audio.play()
    }

    async function registerPokeSelect(data) {
        const dataRef = ref(database, `users/${user.uid}/game`);

        await push(dataRef, data);
    }

    function handleSetOption(params) {
        setSelect(params)

        const data = {
            [convertDate(new Date())]: {
                selected: params,
                pokemon_of_day: pokemon,
                answer: params === pokemon.name ? true : false
            }
        }

        registerPokeSelect(data)

        if(params === pokemon.name) {
            setStatus(params)

            if(!toast.isActive(toastRef.current)) {
                toast('🎉 ' + params.charAt(0).toUpperCase() + params.slice(1) + ' 🎉', {
                    position: "top-center",
                    icon: false,
                    transition: Flip,
                    hideProgressBar: true,
                    toastId: params,
                    autoClose: 3000,
                });
            }
        } else {
            setStatus('failed')

            if(!toast.isActive(toastRef.current) && pokemon && pokemon.name) {
                toast('😓 ' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ' 😓', {
                    position: "top-center",
                    icon: false,
                    transition: Flip,
                    hideProgressBar: true,
                    toastId: params,
                    autoClose: 3000,
                });
            }
        }
    }

    useEffect(() => {
        const baseRef = ref(database, `users/${user.uid}/game`);

        setLoading(true)

        const handleSetHistoric = onValue(baseRef, data => {
            const dataValues = data.val();

            const dataList = [];
            for (let id in dataValues) {
                dataList.push({ ...dataValues[id] });
            }
            setBaseUser(dataList);

            setLoading(false)
        }, {
            onlyOnce: true
        });

        return () => { handleSetHistoric() };
    }, [location, select])

    useEffect(() => {
        let pokesObj = {};

        baseUser.forEach(item => {
            Object.keys(item).forEach(key => {
                pokesObj[key] = item[key];
            });
        });

        localStorage.setItem("@PokesUser", JSON.stringify(pokesObj))
    }, [baseUser])

    useEffect(() => {
        let pokesUser = localStorage.getItem('@PokesUser');

        if (pokesUser)
            setHistory(JSON.parse(pokesUser))
    }, [baseUser])

    useEffect(() => {
        let index = convertDate(new Date())

        if(Object.keys(history).length > 0) {
            setVerify(history[index].selected)

            setSelect(history[index].selected)

            if(history[index].selected === pokemon.name)
                setStatus(select)
            else
                setStatus('failed')
        }
    }, [history])

    useEffect(() => {
        const dropdownButton = document.getElementById('dropdown-button');
        const dropdownMenu = document.getElementById('dropdown-menu');

        window.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                setUserMenu(false);
            }
        });
    }, [])

    return (
        <main className="background relative min-h-screen w-full flex flex-col items-center md:py-6 py-5 px-5">
            <div className="absolute z-10 right-5 top-6">
                <button
                    id="dropdown-button"
                    type="button"
                    onClick={() => setUserMenu(!userMenu)}
                    className="p-1 bg-neutral-50/30 rounded-full overflow-hidden hover:bg-neutral-50/40 transition-all md:w-16 md:h-16 w-12 h-12"
                >
                    {user.photoURL ?
                        <img src={user.photoURL} className="max-w-full h-auto rounded-full" alt="" />
                    :
                        <div className="w-full h-full bg-neutral-50/30 rounded-full flex items-center justify-center">
                            <span className="font-bold text-4xl leading-none text-white">
                                {user.displayName.substring(0, 1)}
                            </span>
                        </div>
                    }
                </button>
                <div
                    id="dropdown-menu"
                    className={`${userMenu ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                >
                    <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <Link
                            to={''}
                            onClick={() => setUserMenu(false)}
                            className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem"
                        >
                            Perfil
                        </Link>
                        <Link
                            to={''}
                            onClick={() => setUserMenu(false)}
                            className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem"
                        >
                            Loja
                        </Link>
                        <Link
                            to={''}
                            onClick={() => setUserMenu(false)}
                            className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem"
                        >
                            Sobre
                        </Link>
                        <hr className="my-1" />
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[800px] flex flex-col justify-center items-center">
                <h1 className="md:text-6xl text-3xl poke-font">
                    Quem é esse pokémon?
                </h1>
                <div className="w-full relative flex flex-col justify-center items-center">
                    <figure className="relative flex items-center justify-center w-[650px] max-w-full md:h-[600px] h-[400px] select-none">
                        <img src="/assets/flash.png" className="flash absolute inset-0 max-w-full h-full mx-auto pointer-events-none" alt="" />
                        {pokemon ?
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPoke}.png`}
                                className={`relative max-w-full h-auto w-[400px] pointer-events-none transition-all duration-500${select ? '' : ' ocult'}`}
                                alt=""
                            />
                        :
                            null
                        }
                    </figure>
                    <div className="relative md:-mt-16 -mt-8 w-full max-w-[650px] flex items-center justify-center gap-3 select-none">
                        {pokemon && pokemon.type ? 
                            pokemon.type.map((t, i) => {
                                return (
                                    <div key={i}>
                                        <img
                                            src={'/assets/types/' + t.type.name + '.png'}
                                            className={`max-w-full lg:w-20 md:w-16 w-12 h-auto pointer-events-none transition-all duration-500${select ? '' : ' ocult'}`}
                                            alt=""
                                        />
                                    </div>
                                )
                            })
                        :
                            null
                        }
                    </div>
                    <audio id="voice" ref={player} className="hidden invisible">
                        <source
                            src={"https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/" + randomPoke +".ogg"}
                            type="audio/ogg"
                        />
                    </audio>
                </div>
                <div className={`grid md:grid-cols-2 grid-cols-1 gap-4 w-full md:mt-8 mt-5 relative group${loading ? ' loading' : ''}`}>
                    {alternatives.map((a, i) => {                
                        return (
                            <BtnSelect
                                key={i}
                                i={i}
                                a={a}
                                status={status}
                                verify={verify}
                                history={history}
                                baseUser={baseUser}
                                pokemon={pokemon}
                                handleSetOption={handleSetOption}
                                playVoice={playVoice}
                            />
                        )
                    })}
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}