import { auth,provider, db } from "../config/config"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const login = async (data) => {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        return userCredential;
    };

    const {mutate, error} = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login successful", {
                position: "top-right",
                type: "success"
            })
            navigate("/home")
            
        },
        onError: () => {
            if (error.code === 'auth/user-not-found') {
                setCustomError("User does not exist");
            } else if (error.code === "auth/invalid-credential") {
                setCustomError("Incorrect username or password");
            } else {
                setCustomError(error.message);
            }
        }
    })
    const onSubmitHandler = async(data, event) => {
      event.preventDefault();
        mutate(data);
        reset();
    }
    // const signInWithGoogle = () => {
    //   // Start the sign-in process using redirect instead of popup
    //   signInWithRedirect(auth, provider);
    // };
  
    // useEffect(() => {
    //   // Handle the redirect result after the user is redirected back to the app
    //   getRedirectResult(auth)
    //     .then(async (result) => {
    //       if (result) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         console.log(user);
  
    //         // Check if the user already exists in Firestore
    //         const userDocRef = doc(db, "users-info", user.uid);
    //         const userDocSnap = await getDoc(userDocRef);
  
    //         // If user exists, navigate to home
    //         if (userDocSnap.exists()) {
    //           navigate("/home");
    //         } else {
    //           // If user does not exist, add the user to Firestore
    //           try {
    //             await addDoc(collection(db, "users-info"), {
    //               name: user.displayName,
    //               uid: user.uid
    //             });
    //             navigate("/home");
    //           } catch (error) {
    //             console.log(error.message);
    //           }
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       // Handle Errors here.
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       console.log(errorMessage);
    //     });
    // }, [navigate]);

  return (
    <div className="mt-8">
        <div className="flex justify-center items-center w-4/5 md:w-1/2 mx-auto">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit(onSubmitHandler)}>
                <h3 className="mb-12 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
                {/* <div  className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300 cursor-pointer" onClick={signInWithGoogle}>
                    <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="google" />
                    Sign in with Google
                </div> */}
                {/* <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <p className="mx-4 text-grey-600">or</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div> */}
                <p>{error && error}</p>
                <div className="flex flex-col flex-start">
                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                    <input id="email" type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-200" {...register("email")}/>
                    <p className="text-red-800 text-xs">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col flex-start">
                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                    <div className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-200 justify-between">
                      <input id="password" type={visible ? "text" : "password"} placeholder="Enter a password"  {...register("password")} className="bg-gray-200 outline-none h-full" />
                      <span onClick={() => setVisible(!visible)} className="cursor-pointer">{visible ? <IoEyeSharp /> : <FaEyeSlash />}</span>
                    </div>
                    <p className="text-red-800 text-xs">{errors.password?.message}</p>
                </div>
                <div className="flex flex-row justify-between mb-8">
                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    </label>
                    <Link to={"/reset-password"} className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</Link>
                </div>
                <button className="bg-blue-600 h-12 rounded-lg text-white text-lg font-semibold" type="submit">Sign In</button>
                <p className="text-sm leading-relaxed text-grey-900">Dont have an account? <Link to="/register"  className="font-bold text-grey-700">Sign up</Link></p>
            </form>
        </div>
        <ToastContainer />
    </div>
)
}

export default Login