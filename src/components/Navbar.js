import { Link } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () =>{

  const {authDone, user}= useAuthContext();
  const {Logout} = useLogout();

    return (
        <nav className="bg-green-400">
            <div className="mx-2 py-2">
                <div className="flex justify-between ">
                    <div className="flex-1 flex  space-x-4 items-center justify-start">
                        <img className="h-8 w-auto"  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'/>
                        <Link to="/" className ="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</Link>

                        <Link to="/login" className ="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</Link>

                        <Link to="/signup" className ="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</Link>

                        <Link to="#" className ="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</Link>
                    </div>
                    <div className=" flex-1 items-center">
                        <div className="flex justify-end px-5">
                        {!authDone ? 
                            <Link to="/login" className =" text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Login</Link>
                            :
                            <div className ="btn text-white block px-3 py-2 rounded-md text-base font-medium hover:cursor-pointer" aria-current="page" onClick={()=> Logout()}>Logout</div>
                        }                    
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar