import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../config/config";
import { Link, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import arrowBack from "../assets/arrowBack.png"

const WriteMessage = () => {

  const { id } = useParams();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    message: yup.string().required(),
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
  });


  const {mutate, error, isPending } = useMutation({
    mutationFn: async(newMessage) => {
      await addDoc(collection(db, "messages"), newMessage);
    },
    onSuccess: () => {
      toast.success("Message sent!", {
        position: "bottom-right",
        type: "success"
      });
      reset();
    },
    onError: () => {
      toast.error("Some error occured", {
        position: "bottom-right",
        type: "error"
      })
      console.log(error);
    }
  })
  if (error) {
    console.log(error)
  }
 
  
  const onSubmitHandler = async (data) => {
   mutate({
      message: data.message,
      uid: id,
      createdAt: new Date()
    })
  }
  return (
    <div style={{
      backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
    }} className="h-screen font-raleway" >
      <Navbar />
      <Link to="/home" >
            <img src={arrowBack} alt="back icon" className="w-8 pt-3 ml-4" />
        </Link>
      <div className="bg-white rounded-t-3xl p-8 mt-8 absolute bottom-0 w-full  h-[90vh]">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="flex items-center justify-center">
         <div className="mt-4">
            <p className="font-semibold pb-2">Enter your message:</p>
            <textarea name="message" id="message" cols="30" rows="10" className='border-[1px] p-4 rounded-lg border-black placeholder:p-2' placeholder="Your message here " {...register("message")}></textarea>
            <p className="text-anonRed font-bold italic"> {errors.message?.message} </p>
             <br />
            <button className="bg-anonBlue font-semibold text-lg capitalize px-6 py-2 cursor-pointer rounded-lg text-white" onClick={handleSubmit(onSubmitHandler)}> {
              !isPending ? ("send message") : ("message sent")
            } </button>
         </div>
      </form>

      </div>
      <ToastContainer />
    </div>
  )
}

export default WriteMessage