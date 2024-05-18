import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

export function Login() {
    const { handleSignIn, signed } = useAppContext();

    if(signed)
        return <Navigate to="/game" />

    return (
        <main className="background relative min-h-screen w-full flex flex-col items-center py-6 px-5">  
            <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
                <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex items-center xl:p-10">
                            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-neutral-900">Sign In</h3>
                                <p className="mb-4 text-neutral-700">
                                    Enter your email and password
                                </p>
                                <button
                                    type="button"
                                    onClick={handleSignIn}
                                    className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-lg text-neutral-900 bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                                >
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    Sign in with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}