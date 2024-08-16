import { Link } from "react-router-dom"
import arrowBack from '../assets/arrowBack.png'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../config/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoverPassword = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async(data) => {
        const { email } = data;

        sendPasswordResetEmail(auth, email)
        try {
            // Send password reset email with Firebase Auth
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent");
            reset(); 
            
           
                toast.success("Email sent!", {
                  position: "bottom-right",
                  type: "success"
                });
                reset();
             
        } catch (error) {
            console.error("Error sending password reset email: ", error.message);
        }
    }
  return (
    <div style={{
        backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
      }} className="h-screen font-raleway" >
        <Link to="/home" >
            <img src={arrowBack} alt="back icon" className="w-8 pt-3 ml-4" />
        </Link>
        <div className="bg-white rounded-t-3xl p-8 mt-8 overflow-y-scroll h-[90vh]">
            <h1 className='text-2xl font-bold font-raleway pb-4'>Enter Email:</h1> 
            <input type="email" name="email" id="email" {...register("email")} placeholder="user@email.com" className="border-anonBlue border-2 px-4 py-2 rounded-lg outline-none" /> 
            <p className="text-red-800 text-xs">{errors.email?.message}</p>
            <button onClick={handleSubmit(onSubmitHandler)} className="bg-anonBlue text-white px-8 py-2 rounded-md mt-2">Send Email</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default RecoverPassword