import { useEffect, useState } from "react";
import seedrandom from 'seedrandom';

import api from '../src/service/api';

export function App() {
  const NUMBER_POKEMONS = 151;

  const [lastDate, setLastDate] = useState(new Date());
  const [pokemon, setPokemon] = useState({});
  const [alternatives, setAlternative] = useState([])
  const [randomPoke, setRandomPoke] = useState('')
  const [select, setSelect] = useState('')
  const [status, setStatus] = useState('')

  const pokeLocation = JSON.parse(localStorage.getItem('pokemonSelected')) || undefined

  const verify = pokeLocation && pokeLocation[convertDate(new Date())] ? pokeLocation[convertDate(new Date())].name : null

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
    if(select && select !== '') {
      if(!pokeLocation) {  
        localStorage.setItem('pokemonSelected', JSON.stringify({
          [convertDate(new Date())]: {
            name: select
          }
        }));
      } else {
        var newLocalStorage = {
          ...pokeLocation, 
          [convertDate(new Date())]: {
            name: select
          }
        }

        localStorage.setItem('pokemonSelected', JSON.stringify(newLocalStorage));
      }

      if(select === pokemon.name) {
        setStatus(select)
      } else {
        setStatus('failed')
      }
    }
  }, [select, pokeLocation]);

  useEffect(() => {
    if(verify && select === '') {
      setSelect(verify)

      if(verify === pokemon.name) {
        setStatus(select)
      } else {
        setStatus('failed')
      }
    }
  }, [verify, select]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getDate() !== lastDate.getDate()) {
        window.location.reload()
        setLastDate(currentDate);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lastDate]);

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
                      className={`max-w-full md:w-20 w-12 h-auto pointer-events-none transition-all duration-500${select ? '' : ' ocult'}`}
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
                  className={`cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center hover:bg-white hover:text-[#ff4624] transition-colors select-none peer-checked/${'option' + i}:bg-white peer-checked/${'option' + i}:text-[#ff4624] capitalize${status === a && verify === a ? ' bg-green-500 pointer-events-none' : pokeLocation && verify && pokemon.name === a && verify !== a ? ' bg-green-500 pointer-events-none opacity-60' : status === 'failed' && verify === a ? ' bg-red-500 pointer-events-none' : verify ? ' pointer-events-none opacity-60 bg-transparent' : ' bg-transparent'}`}
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