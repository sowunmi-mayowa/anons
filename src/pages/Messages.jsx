import { useEffect, useState } from "react";
import { auth, db } from "../config/config";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";

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
    <div>
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
                    <div key={Math.random()}>
                        <p>{message.message}</p>
                    </div>
                ))
            )
        }
    </div>
  )
}

export default Messages