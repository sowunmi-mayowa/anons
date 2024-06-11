import { useEffect, useState } from "react";
import { auth, db } from "../config/config";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import arrowBack from "../assets/arrowBack.png"
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png"

const Messages = () => {
    
    const getMessages = async() => {
           
        const queryDb = query(collection(db, "messages"), where ("uid", '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(queryDb);
        const messageData = []

        querySnapshot.forEach(doc => {
            messageData.push(doc.data())
        })

        return messageData;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: getMessages
    }) 
    if (error) return <div>sorry an error occured..... try again later</div>;

  return (
    <div style={{
        backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
      }} className="h-screen font-raleway" >
        <Navbar />
        <Link to="/home" >
            <img src={arrowBack} alt="back icon" className="w-8 pt-3 ml-4" />
        </Link>
        <div className="bg-white rounded-t-3xl p-8 mt-8 overflow-y-scroll h-[90vh]">
        {
            isLoading ? (
                <div className="flex justify-center items-center h-screen flex-col">
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                    <p className="italic">Loading messaegs ..</p>
                </div>
            ) : (
                data.map(message => (
                    <div key={Math.random()} className="flex justify-center items-center">
                        <div className="flex gap-4 justify-start items-start bg-anonLightBlue my-2 w-full p-6 rounded-2xl">
                           <div className="w-12 h-12 rounded-full bg-anonBlue"></div>
                            <div>
                                <h1 className="text-lg font-bold capitalize">Anon</h1>
                                <p className="text-sm text-anonBlue">{message.message}</p>
                            </div>
                        </div>
                    </div>
                ))
            )
        }
        </div>
    </div>
  )
}

export default Messages