import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "../context/appContext";

export function UserMenu({userMenu, setUserMenu}) {
    const { handleSignOut, user, baseUser, setLoadingDataUser } = useAppContext();

    useEffect(() => {
        const dropdownButton = document.getElementById('dropdown-button');
        const dropdownMenu = document.getElementById('dropdown-menu');

        window.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                setUserMenu(false);
            }
        });
    }, [])

    useEffect(() => {
        if(user)
            setLoadingDataUser(true)
    }, [user])

    return (
        <div className="absolute z-20 right-5 top-6">
            <button
                id="dropdown-button"
                type="button"
                onClick={() => setUserMenu(!userMenu)}
                className="p-1 bg-neutral-50/30 rounded-full overflow-hidden hover:bg-neutral-50/40 transition-all md:w-16 md:h-16 w-14 h-14"
            >
                {user && user.photoURL ?
                    <img src={user.photoURL} className="max-w-full h-auto rounded-full" alt="" />
                : user ?
                    <div className="w-full h-full bg-neutral-50/30 rounded-full flex items-center justify-center">
                        <span className="font-bold text-4xl leading-none text-white">
                            {user.displayName.substring(0, 1)}
                        </span>
                    </div>
                :
                null
                }
            </button>
            <div
                id="dropdown-menu"
                className={`${userMenu ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
            >
                <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                    <div className="flex rounded-md px-4 py-2 text-sm text-gray-700 font-medium">
                        Moedas: {Object.values(baseUser).filter(a => a.answer === true).length}
                    </div>
                    <hr className="my-1" />
                    <Link
                        to={'/'}
                        onClick={() => setUserMenu(false)}
                        className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem"
                    >
                        Jogar
                    </Link>
                    <Link
                        to={'/profile'}
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
    );
}