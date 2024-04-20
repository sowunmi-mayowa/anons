import { useEffect, useState } from "react";
import { auth, db } from "../config/config";
import { collection, query, where, getDocs  } from "firebase/firestore";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const getMessages = async() => {
            try{
                const queryDb = query(collection(db, "messages"), where ("uid", '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(queryDb);
                const messageData = []
      
                querySnapshot.forEach(doc => {
                  messageData.push(doc.data())
                })
                setMessages(messageData)
              }
              catch(error){
                console.log(error.message)
            }
        };
        getMessages();
        
    }, [])
    console.log(messages)

  return (
    <div>
        <div>
            {
                messages.map(message => (
                    <div key={Math.random()}>
                        <p>  {message.message} </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Messages