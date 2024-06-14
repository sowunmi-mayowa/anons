import { useRef } from "react";
import { auth, db } from "../config/config";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import arrowBack from "../assets/arrowBack.png"
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import html2canvas from "html2canvas";

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
    
    const dialogRef = useRef();
    const handleSaveImg = async () => {
        if (dialogRef.current) {
          const canvas = await html2canvas(dialogRef.current, {
            useCORS: true,
            backgroundColor: null,
          });
          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "dialog-image.jpg";
          link.click();
        }
      };

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
                        <Dialog.Root >
                            <Dialog.Trigger className="w-screen" >
                            <div className="flex gap-4 justify-start items-start bg-anonLightBlue my-2 w-full p-6 rounded-2xl">
                              <div className="w-12 h-12 rounded-full bg-anonBlue"></div>
                            <div className="flex flex-col items-start">
                                <h1 className="text-lg font-bold capitalize">Anon</h1>
                                <p className="text-sm text-anonBlue">{message.message}</p>
                            </div>
                        </div>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-anonLightBlue text-gray-500 p-4 rounded-lg w-3/4" ref={dialogRef}  >
                                <p> {message.message} </p>
                                <button className="bg-anonBlue text-white px-4 py-2 mt-4 rounded-lg" onClick={handleSaveImg}>Save IMG</button>
                            </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                        
                    </div>
                ))
            )
        }
        </div>
    </div>
  )
}

export default Messages