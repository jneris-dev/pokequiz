import classNames from "classnames";

export function BtnSelect({status, a, verify, history, pokemon, i, playVoice, handleSetOption}) {
    const button = classNames(
        "cursor-pointer w-full rounded-full border-2 py-3 text-white font-bold text-lg flex items-center justify-center hover:bg-white hover:text-[#ff4624] transition-colors select-none capitalize",
        {
            "bg-green-500 pointer-events-none focus:bg-green-500": status === a && verify === a,
            "bg-green-500 pointer-events-none opacity-60 focus:bg-green-500": history && verify && pokemon.name === a && verify !== a,
            "bg-red-700 pointer-events-none focus:bg-red-700": status === 'failed' && verify && verify === a && pokemon.name !== a,
            "pointer-events-none opacity-60 bg-transparent": verify && pokemon.name !== a && verify !== a
        }
    )

    return (
        <div className="w-full group-[.loading]:pointer-events-none">
            <input
                type="radio"
                id={'option' + i}
                name="tabs"
                className={"appearance-none hidden peer/option" + i}
            />
            <label
                htmlFor={'option' + i}
                className={button + ` peer-checked/${'option' + i}:bg-white peer-checked/${'option' + i}:text-[#ff4624]`}
                onClick={() => {
                    handleSetOption(a),
                    playVoice()
                }}
            >
                {a}
            </label>
        </div>
    );
}