import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../config/config";
import { useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    <div>
      <h1>Send message</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
         <div>
          <p> {errors.message?.message} </p>
            <textarea name="message" id="message" cols="30" rows="10" className='border-2 border-black' {...register("message")}></textarea> <br />
            <button className="bg-blue-500 text-black font-bold text-lg capitalize px-6 py-2 cursor-pointer" onClick={handleSubmit(onSubmitHandler)}> {
              !isPending ? ("send message") : ("message sent")
            } </button>
         </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default WriteMessage