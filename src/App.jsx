export function App() {
  return (
    <main className="background relative min-h-screen w-full flex flex-col items-center py-8 px-5">
      <div className="w-full max-w-[800px] flex flex-col justify-center items-center">
        <h1 className="text-6xl poke-font">
          Quem é esse pokémon?
        </h1>
        <div className="w-full relative flex flex-col justify-center items-center">
          <figure className="relative flex items-center justify-center w-[650px] max-w-full h-[600px] select-none">
            <img src="/assets/flash.png" className="flash absolute inset-0 max-w-full h-full mx-auto pointer-events-none" alt="" />
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              className="relative max-w-full h-auto w-[400px] ocult pointer-events-none transition-all duration-500"
              alt=""
            />
          </figure>
          <div className="relative -mt-16 w-full max-w-[650px] flex items-center justify-center gap-3 select-none">
            <div>
              <img
                src="https://archives.bulbagarden.net/media/upload/thumb/a/a8/Grass_icon_SwSh.png/64px-Grass_icon_SwSh.png"
                className="max-w-full h-auto ocult pointer-events-none transition-all duration-500"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://archives.bulbagarden.net/media/upload/thumb/8/8d/Poison_icon_SwSh.png/64px-Poison_icon_SwSh.png"
                className="max-w-full h-auto ocult pointer-events-none transition-all duration-500"
                alt=""
              />
            </div>
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