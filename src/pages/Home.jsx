import { auth } from "../config/config";
import {  signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const naviagte = useNavigate();
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            naviagte("/login")
          }).catch((error) => {
            // An error happened.
            console.log(error.message);
          });
    }
  return (
    <div>
        <button onClick={logOut}>Sign out</button>
    </div>
  )
}

export default Home