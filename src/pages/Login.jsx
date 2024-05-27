import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

export function Login() {
    let location = useLocation()

    const { handleSignIn, signed } = useAppContext();

    useEffect(() => {
        if(!signed)
            localStorage.clear()
    }, [location, signed])

    return (
        <main className="background relative h-full min-h-screen w-full flex flex-col items-center px-3">  
            <div className="w-full flex-1 max-w-3xl flex flex-col mx-auto bg-white h-full pt-12">
                <div className="flex items-center justify-center w-full lg:p-12">
                    <div className="flex items-center xl:p-10">
                        <form className="flex flex-col w-full h-full pb-6 px-4 text-center bg-white rounded-3xl">
                            <img src="/assets/logo.png" className="max-w-[450px] w-full h-auto mb-10" alt="PokéQuiz" title="PokéQuiz" />
                            <p className="mb-4 text-neutral-700 font-medium">
                                Sign in with
                            </p>
                            <div className="flex flex-col gap-3 justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => handleSignIn('google')}
                                    className="flex max-w-sm items-center justify-center w-full py-4 text-sm font-medium transition duration-300 rounded-lg text-neutral-900 bg-neutral-100 hover:bg-neutral-200 cursor-pointer border"
                                >
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    GOOGLE
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSignIn('github')}
                                    className="bg-neutral-900 max-w-sm rounded-lg text-white text-center self-center px-3 flex items-center justify-center w-full py-4 text-sm font-medium transition duration-300 hover:bg-neutral-800 cursor-pointer border"
                                >
                                    <img
                                        className="h-5 mr-2 invert"
                                        src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/github.svg"
                                        alt=""
                                    />
                                    GITHUB
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}