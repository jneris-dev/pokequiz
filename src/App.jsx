import { useEffect, useState } from "react";

import api from '../src/service/api';

export function App() {
  const NUMBER_POKEMONS = 151;

  const [pokemons, setPokemons] = useState([]);
  const [randomPoke, setRandomPoke] = useState({});
  const [pokemon, setPokemon] = useState({});

  async function handlePokemonsListDefault() {
    const response = await api.get('/pokemon', {
        params: {
            limit: NUMBER_POKEMONS,
        },
    });

    setPokemons(response.data.results);
  };

  function handlePokemonRandom() {
    const number = Math.floor(Math.random() * (150 - 0 + 1) + 0)

    setRandomPoke(pokemons[number])
  };

  useEffect(() => {
    if(Object.keys(pokemons).length <= 0)
      handlePokemonsListDefault();
    else if(Object.keys(randomPoke).length <= 0)
      handlePokemonRandom()
  }, [pokemons]);

  useEffect(() => {
    	if (Object.keys(randomPoke).length > 0)
        api.get(`/pokemon/${randomPoke.name}`).then(response => {
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

  return (
    <main className="background relative min-h-screen w-full flex flex-col items-center py-8 px-5">
      <div className="w-full max-w-[800px] flex flex-col justify-center items-center">
        <h1 className="text-6xl poke-font">
          Quem é esse pokémon?
        </h1>
        <div className="w-full relative flex flex-col justify-center items-center">
          <figure className="relative flex items-center justify-center w-[650px] max-w-full h-[600px] select-none">
            <img src="/assets/flash.png" className="flash absolute inset-0 max-w-full h-full mx-auto pointer-events-none" alt="" />
            {pokemon ?
              <img
                src={pokemon.image}
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
          <div className="w-full">
            <input type="radio" id="option0" name="tabs" className="appearance-none hidden peer/option0" />
            <label
              htmlFor="option0"
              className="cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center bg-transparent hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/option0:bg-white peer-checked/option0:text-[#ff4624]"
            >
              Charizard
            </label>
          </div>
          <div className="w-full">
            <input type="radio" id="option1" name="tabs" className="appearance-none hidden peer/option1" />
            <label
              htmlFor="option1"
              className="cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center bg-transparent hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/option1:bg-white peer-checked/option1:text-[#ff4624]"
            >
              Bulbasaur
            </label>
          </div>
          <div className="w-full">
            <input type="radio" id="option2" name="tabs" className="appearance-none hidden peer/option2" />
            <label
              htmlFor="option2"
              className="cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center bg-transparent hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/option2:bg-white peer-checked/option2:text-[#ff4624]"
            >
              Ivysaur
            </label>
          </div>
          <div className="w-full">
            <input type="radio" id="option3" name="tabs" className="appearance-none hidden peer/option3" />
            <label
              htmlFor="option3"
              className="cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center bg-transparent hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/option3:bg-white peer-checked/option3:text-[#ff4624]"
            >
              Dialga
            </label>
          </div>
        </div>
      </div>
    </main>
  )
}