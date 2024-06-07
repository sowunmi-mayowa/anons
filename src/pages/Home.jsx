import { auth, db } from "../config/config";
import {  signOut, onAuthStateChanged } from "firebase/auth";
import {useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs  } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState } from "react";


const Home = () => {

  const naviagte = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        naviagte("/login");
      }
    });
    return () => unsubscribe();
  }, [naviagte])
    

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
      const getUserName = async () => {

        const queryDb = query(collection(db, 'users-info'), where ("uid", '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(queryDb);
        const users = [];

        querySnapshot.forEach(doc => {
          users.push(doc.data())
        })
        return users;
      };
      
    const {data, error, isLoading} = useQuery({
      queryKey: ["user-info"],
      queryFn: getUserName,
      enabled: !currentUser
    })
    if (error) {
      console.log(error)
    }
    
  return (
    <div>
      <Navbar />
      {/* <h1>welcome {userInfo.name ? userInfo.name : auth.currentUser.displayName}</h1> */}
      {
        isLoading ? (
        <div className="flex justify-center items-center h-screen flex-col">
            <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />
            <p className="italic">Loading ..</p>
        </div>
        ) : (
          data && data.map(user => (
            <div key={user.uid}>
              <h1>{user.name}</h1>
              <p>Copy your link: <Link to={"/"+ user.uid}>Link</Link></p>
            </div>
          ))
        )
      }
      
      <p><Link to={"/messages"}>view your messages</Link></p>
        <button className="bg-black text-white px-4 py2" onClick={logOut}>Sign out</button>
    </div>
  )
}

export default Home