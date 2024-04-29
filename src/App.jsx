import { useEffect, useState } from "react";
import seedrandom from 'seedrandom';

import api from '../src/service/api';

export function App() {
  const NUMBER_POKEMONS = 151;

  const [pokemon, setPokemon] = useState({});
  const [alternatives, setAlternative] = useState([])
  const [randomPoke, setRandomPoke] = useState('')
  const [select, setSelect] = useState('')
  const [status, setStatus] = useState('')

  const pokeLocation = localStorage.getItem('pokemonSelected')

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

  useEffect(() => {
    const dataAtual = new Date();

    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    const dataString = `${dia}${mes}${ano}`;

    const semente = parseInt(dataString);

    seedrandom(semente, { global: true });

    const numeroAleatorio = Math.floor(Math.random() * 152);

    setRandomPoke(numeroAleatorio);
  }, []);

  useEffect(() => {
    	if (randomPoke)
        api.get(`/pokemon/${randomPoke}`).then(response => {
          const { id, types, sprites, name } = response.data;

          let typeColor = types[0].type.name;

          if (typeColor === 'normal' && types.length > 1) {
            typeColor = types[1].type.name;
          }

          setPokemon({
            name,
            id,
            image: sprites.other['official-artwork'].front_default,
            type: types
          });
        });
	}, [randomPoke]);

  useEffect(() => {
    if(Object.keys(alternatives).length <= 0 && randomPoke)
      handlePokemonsListDefault();
  }, [alternatives, randomPoke]);

  useEffect(() => {
    if(select !== '') {
      localStorage.setItem('pokemonSelected', select);

      if(select === pokemon.name) {
        setStatus(select)
      } else {
        setStatus('failed')
      }
    }
  }, [select]);

  useEffect(() => {
    if(pokeLocation) {
      setSelect(pokeLocation)

      if(pokeLocation === pokemon.name) {
        setStatus(select)
      } else {
        setStatus('failed')
      }
    }
  }, [pokeLocation]);

  return (
    <main className="background relative min-h-screen w-full flex flex-col items-center py-6 px-5">
      <div className="w-full max-w-[800px] flex flex-col justify-center items-center">
        <h1 className="text-6xl poke-font">
          Quem é esse pokémon?
        </h1>
        <div className="w-full relative flex flex-col justify-center items-center">
          <figure className="relative flex items-center justify-center w-[650px] max-w-full h-[600px] select-none">
            <img src="/assets/flash.png" className="flash absolute inset-0 max-w-full h-full mx-auto pointer-events-none" alt="" />
            {pokemon ?
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPoke}.png`}
                className="relative max-w-full h-auto w-[400px] ocult pointer-events-none transition-all duration-500"
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
                      className="max-w-full w-20 h-auto ocult pointer-events-none transition-all duration-500"
                      alt=""
                    />
                  </div>
                )
              })
              :
              null
            }
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full mt-8">
          {alternatives.map((a, i) => {            
            return (
              <div className="w-full" key={i}>
                <input type="radio" id={'option' + i} name="tabs" className={"appearance-none hidden peer/option" + i} />
                <label
                  htmlFor={'option' + i}
                  className={`cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/${'option' + i}:bg-white peer-checked/${'option' + i}:text-[#ff4624] capitalize${status === a || pokeLocation === a ? ' bg-green-300 pointer-events-none opacity-80' : status === 'failed' ? ' pointer-events-none opacity-80 bg-transparent' : ' bg-transparent'}`}
                  onClick={() => setSelect(a)}
                >
                  {a}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}