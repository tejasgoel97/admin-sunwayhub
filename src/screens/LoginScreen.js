import { useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import useSignIn from "../hooks/useSignIn"


export default function LoginScreen() {
    //BASIC STATE IMPORT
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Use Auth Context Hook
    const authState= useAuthContext();
    console.log(authState)

    //useSignUp CustomHook
    const {signIn, error, isPending, setError} = useSignIn();

    //Handle SignIn Button With Email and Password
    function handleSignIn(){
        if(!email) return setError("Please provide a valid email")
        if(password.length < 6) return setError("Please Choose atleast 6 digit password")
        signIn(email, password)
    }

    return( 
        <div className=" flex justify-center align-middle m-12">
            <div class=" shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full sm:w-3/5 lg:w-2/5 bg-orange-100">
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    type="text" 
                    placeholder="Username"/>
                </div>
                <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        type="password" 
                        placeholder="******************"/>
                    {error && <p class="text-red text-xs italic">{error}</p>}
                </div>
                <div class="flex items-center justify-center">
                {!isPending &&<button 
                    class=" hover:bg-green-800 w-full text-white font-bold py-2 px-4 rounded border-1 border-slate-900 bg-green-600 align-middle" 
                    onClick={handleSignIn}
                    >
                    Sign In
                </button>}
                {isPending &&<button 
                    class=" hover:bg-gray-600 w-full text-white font-bold py-2 px-4 rounded border-1 border-slate-900 bg-green-600 align-middle" 
                    onClick={handleSignIn}
                    disabled
                    >
                    Loading
                </button>}
                </div>
            </div>
        </div>
    )
}