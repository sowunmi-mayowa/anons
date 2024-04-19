import { auth, db } from "../config/config";
import {  signOut } from "firebase/auth";
import {useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs  } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
    const naviagte = useNavigate();
    const [userInfo, setUserInfo] = useState({})
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            naviagte("/login")
          }).catch((error) => {
            // An error happened.
            console.log(error.message);
          });
    }

    //get username 
    useEffect(() => {
      const getUserName = async () => {
        try{
          const queryDb = query(collection(db, 'users-info'), where ("uid", '==', auth.currentUser.uid));
          const querySnapshot = await getDocs(queryDb);

          querySnapshot.forEach(doc => {
            setUserInfo(doc.data())
          })
        }
        catch(error){
          console.log(error.message)
        }
      };
      getUserName();
    }, []);
    console.log(userInfo)
    
   
  return (
    <div>
      <h1>welcome {userInfo.name ? userInfo.name : auth.currentUser.displayName}</h1>
        <button onClick={logOut}>Sign out</button>
    </div>
  )
}

export default Home