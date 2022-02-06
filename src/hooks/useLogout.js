import { getAuth } from "@firebase/auth"
import useAuthContext from "./useAuthContext"



const useLogout = () =>{
    const [error, setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const authState= useAuthContext();

    const auth =  getAuth()

    function Logout(){
        setError(null);
        setIsPending(true)

        signOut(auth).then(() => {
            // Sign-out successful.
            setIsPending(false);
            setError(null)
        }).catch((error) => {
            // An error happened.
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        });
      
    }
}

export default useLogout