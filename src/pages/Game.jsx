import { useEffect, useRef, useState } from "react";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppContext } from "../context/appContext";

export function Game() {

    const player = useRef();
    const toastRef = useRef(null);

    const { pokeLocation, pokemon, convertDate, verify, alternatives, randomPoke } = useAppContext();

    const [select, setSelect] = useState('')
    const [status, setStatus] = useState('')

    function playVoice() {
        var audio = player.current
        audio.volume = 0.2;
        audio.play()
    }

    useEffect(() => {
        if(select && select !== '') {
            if(!pokeLocation) {  
                localStorage.setItem('pokemonSelected', JSON.stringify({
                    [convertDate(new Date())]: {
                        selected: select,
                        pokemon_of_day: pokemon,
                        answer: select === pokemon.name ? true : false
                    }
                }));
            } else {
                var newLocalStorage = {
                    ...pokeLocation, 
                    [convertDate(new Date())]: {
                        selected: select,
                        pokemon_of_day: pokemon,
                        answer: select === pokemon.name ? true : false
                    }
                }

                localStorage.setItem('pokemonSelected', JSON.stringify(newLocalStorage));
            }

            if(select === pokemon.name) {
                setStatus(select)

                if(!toast.isActive(toastRef.current)) {
                    toast('🎉 ' + select.charAt(0).toUpperCase() + select.slice(1) + ' 🎉', {
                        position: "top-center",
                        icon: false,
                        transition: Flip,
                        hideProgressBar: true,
                        toastId: select,
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
                        toastId: select,
                        autoClose: 3000,
                    });
                }
            }
        }
    }, [select, pokeLocation]);

    useEffect(() => {
        if(verify && select === '') {
            setSelect(verify)

            if(verify === pokemon.name)
                setStatus(select)
            else
                setStatus('failed')
        }
    }, [verify, select]);

    return (
        <main className="background relative min-h-screen w-full flex flex-col items-center py-6 px-5">
            <div className="w-full max-w-[800px] flex flex-col justify-center items-center">
                <h1 className="md:text-6xl text-4xl poke-font">
                    Quem é esse pokémon?
                </h1>
                <div className="w-full relative flex flex-col justify-center items-center">
                    <figure className="relative flex items-center justify-center w-[650px] max-w-full md:h-[600px] h-[500px] select-none">
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
                    <div className="relative -mt-16 w-full max-w-[650px] flex items-center justify-center gap-3 select-none">
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
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full mt-8 relative">
                    {alternatives.map((a, i) => {        
                        return (
                            <div className="w-full" key={i}>
                                <input
                                    type="radio"
                                    id={'option' + i}
                                    name="tabs"
                                    className={"appearance-none hidden peer/option" + i}
                                />
                                <label
                                    htmlFor={'option' + i}
                                    className={`cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center hover:bg-white hover:text-[#ff4624] transition-colors select-none capitalize${status === a && verify === a ? ' bg-green-500 pointer-events-none' : pokeLocation && verify && pokemon.name === a && verify !== a ? ' bg-green-500 pointer-events-none opacity-60' : status === 'failed' && verify && verify === a ? ' bg-red-700 pointer-events-none' : verify ? ' pointer-events-none opacity-60 bg-transparent' : ` bg-transparent peer-checked/${'option' + i}:bg-white peer-checked/${'option' + i}:text-[#ff4624]`}`}
                                    onClick={() => {
                                        setSelect(a),
                                        playVoice()
                                    }}
                                >
                                    {a}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}