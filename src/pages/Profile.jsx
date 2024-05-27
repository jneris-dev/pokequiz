import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { UserMenu } from "../components/UserMenu";
import { useAppContext } from "../context/appContext";

export function Profile() {
    const { baseUser } = useAppContext()
    const [userMenu, setUserMenu] = useState(false)

    return (
        <main className="background relative min-h-screen w-full flex flex-col items-center md:py-6 py-5 px-5">
            <UserMenu userMenu={userMenu} setUserMenu={setUserMenu} />
            <div className="bg-white w-full max-w-screen-lg min-h-96 rounded-lg mt-20 lg:p-10 py-10 px-5 flex flex-col gap-10">
                <h1 className="text-xl font-medium">
                    Seu Histórico
                </h1>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-8">
                    {Object.values(baseUser).length > 0 ?
                        Object.values(baseUser).slice(0).reverse().map((poke, key) => {
                            return (
                                <div key={key} className="text-center gap-2 flex flex-col items-center justify-center">
                                    <figure className="relative">
                                        <div className="w-full h-full flex items-center justify-center absolute z-10">
                                            {poke.answer ?
                                                <svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"/></svg>
                                            :
                                                <svg className="fill-red-500" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"/></svg>
                                            }
                                        </div>
                                        <img src={poke.pokemon_of_day.image} className="max-w-full h-auto opacity-80" alt={poke.pokemon_of_day.name} />
                                    </figure>
                                    <div className="bg-neutral-100 border rounded-full py-1 px-4 font-medium text-sm">
                                        {moment(Object.keys(baseUser)[key]).format('DD.MM.YYYY')}
                                    </div>
                                </div>
                            )
                        })
                    : Object.values(baseUser).length === 0 ?
                        <div className="w-full col-span-4 text-center bg-neutral-100 py-10 px-5 flex flex-col gap-5 items-center">
                            <p>
                                Nenhum Pokémon registrado, volte no jogo e tente acertar o pokémon do dia!
                            </p>
                            <Link
                                to={'/'}
                                className="w-full max-w-60 py-4 border font-medium background rounded-full text-white hover:opacity-80"
                            >
                                Jogar Agora!
                            </Link>
                        </div>
                    :
                        [...Array(4)].map((poke, key) => {
                            return (
                                <div key={key} className="text-center gap-2 flex flex-col items-center justify-center">
                                    <figure className="relative">
                                        <div className="w-full h-full flex items-center justify-center absolute z-10">
                                            <svg className="fill-neutral-200 animate-spin" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path d="M13 23c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm4.084-.834c0-.483-.393-.875-.875-.875s-.875.392-.875.875.393.875.875.875.875-.392.875-.875zm3.443-2.387c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm2.343-3.568c0-.391-.317-.708-.708-.708s-.708.317-.708.708.317.708.708.708.708-.317.708-.708zm.796-4.209c0-.368-.298-.667-.666-.667s-.666.298-.666.667.298.667.666.667.666-.298.666-.667zm-.879-4.209c0-.345-.28-.625-.625-.625s-.625.28-.625.625.28.625.625.625.625-.279.625-.625zm-2.427-3.568c0-.322-.262-.583-.583-.583s-.583.261-.583.583.262.583.583.583.583-.261.583-.583zm-3.609-2.385c0-.299-.242-.542-.541-.542s-.541.242-.541.542.242.542.541.542.541-.243.541-.542zm-3.751-.84c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-4.21.838c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-3.569 2.385c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-2.384 3.57c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm-.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm2.384 3.569c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm3.571 2.383c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z"/></svg>
                                        </div>
                                        <div className="w-[212px] h-[212px]"></div>
                                    </figure>
                                    <div className="bg-neutral-100 border rounded-full py-1 px-4 font-medium text-sm">
                                        00.00.0000
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}