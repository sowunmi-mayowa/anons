import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import arrowBack from '../assets/arrowBack.png'
import { auth, db } from '../config/config'
import { useQuery } from '@tanstack/react-query'
import { collection, query, where, getDocs  } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";
import {  signOut } from "firebase/auth";

const Profile = () => {
    const navigate = useNavigate();
    const getUserInfo = async() => {
        const queryDb = query(collection(db, "users-info"), where ("uid", '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(queryDb);
        const infoData = []
        
        querySnapshot.forEach(doc => {
            infoData.push(doc.data())
        })

        return infoData;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['info'],
        queryFn: getUserInfo
    }) 
    if (error) {
        console.log(error)
        navigate('/login')
    }
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login")
          }).catch((error) => {
            // An error happened.
            console.log(error.message);
          });
      }

      const deleteAccount = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await user.delete();
                console.log('Account deleted successfully');
                navigate("/login")
            } catch (error) {
                console.error('Error deleting account:', error);
                if (error.code === 'auth/requires-recent-login') {
                    alert("error deleting account go back to login")
                    navigate("/login")
                }
            }
        } else {
            console.log('No user is signed in');
        }
      }
  return (
    <div style={{
        backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
      }} className="h-screen font-raleway" >
        <Navbar />
        <Link to="/home" >
            <img src={arrowBack} alt="back icon" className="w-8 pt-3 ml-4" />
        </Link>
        <div className="bg-white rounded-t-3xl p-8 mt-8 overflow-y-scroll h-[90vh]">
            <h1 className='text-2xl font-bold font-raleway pb-4'>User Info</h1>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-screen flex-col">
                        <InfinitySpin
                            visible={true}
                            width="200"
                            color="#4fa94d"
                            ariaLabel="infinity-spin-loading"
                        />
                        <p className="italic">Loading user info ..</p>
                    </div>
                ) : (
                    data.map(info => (
                        <div key={info.uid} className='font-raleway'>
                            <p className='text-xl'>username: {info.name}</p>
                            <p className='text-xl'>email: {info.email}</p>
                        </div>
                    ))
                )
            }
            <button onClick={logOut} className='bg-anonRed text-white text-lg px-4 py-2 mt-6 rounded-md ' >logout</button>
            <div className='font-raleway mt-8'>
                <p>Delete Account</p>:
                <button onClick={deleteAccount} className='bg-anonRed text-white text-lg px-4 py-2 mt-2 rounded-md ' >Delete</button>
            </div>

        </div>
    </div>
  )
}

export default Profile