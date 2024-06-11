import { auth, db } from "../config/config";
import {  signOut, onAuthStateChanged } from "firebase/auth";
import {useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs  } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import copy from "../assets/copy.png"
import avatar from "../assets/avatar.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  const naviagte = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid);
    }
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
    const link = `https://anons-five.vercel.app/${auth.currentUser.uid}`;
    const copyToClipboard = () => {
      if(uid){
        navigator.clipboard.writeText(link)
          .then(() => {
            toast.success("link copied to clipboard", {
              type: "success",
              position: "top-right",
              autoClose: "2000",
              
            })
          })
          .catch((err) => {
            toast.error("link copied to clipboard", {
              type: "error",
              position: "top-right",
              autoClose: "2000",
              
            })
          });
      }else{
        toast.error("User not authenticated", {
          position: "top-right",
          autoClose: 3000,
        });
        naviagte("/login")
      }
    };
  

  return (
    <div style={{
      backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
    }} className="h-screen pt-20 px-6 ">
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
            <div key={user.uid} className="flex justify-center items-center flex-col">
              <div className="max-w-[80px] py-4">
                <img src={avatar}  className="w-full h-full " />
              </div>
              <div className="mb-6 flex flex-col items-center px-6 ">
                <h1 className="capitalize font-raleway text-2xl text-center text-[#009CBB] font-bold">{user.name}'s Profile</h1>
                <div className="max-w-[310px]"> 
                  <p className="text-anonRed font-semibold text-[16px] text-center font-raleway break-words px-8">https://anons-five.vercel.app/{user.uid}</p>
                </div>
                <img src={copy} alt="icon" className="w-5 cursor-pointer" onClick={copyToClipboard} />
                <p className="text-anonBlue font-raleway text-center pt-6 text-sm font-semibold">Share your link and get responses from your friend, you cannot know who send it.</p>
              </div>
            </div>
          ))
        )
      }
      
      
      <Link to={"/messages"} className="flex w-full">
        <button className='w-full capitalize py-4 px-2 text-white bg-anonRed mx-6 font-raleway text-lg text-center my-4 rounded-lg font-semibold'>view messages</button>
      </Link>
      <Link to={"/profile"} className="flex w-full">
        <button className='w-full capitalize py-4 px-2 text-white bg-anonBlue mx-6 font-raleway text-lg text-center my-2 rounded-lg font-semibold'>profile</button>
      </Link>
        {/* <button className="bg-black text-white px-4 py2" onClick={logOut}>Sign out</button> */}
        < ToastContainer />
    </div>
  )
}

export default Home