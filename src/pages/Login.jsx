import { auth,provider } from "../config/config"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        console.log({data})
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            navigate("/home")
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
        reset()
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            navigate("/home")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ...
        });
    }

  return (
    <div className="mt-8">
        <div className="flex justify-center items-center w-4/5 md:w-1/2 mx-auto">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit(onSubmitHandler)}>
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
                <div  className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300 cursor-pointer" onClick={signInWithGoogle}>
                    <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="google" />
                    Sign in with Google
                </div>
                <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    <p className="mx-4 text-grey-600">or</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                
                <div className="flex flex-col flex-start">
                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                    <input id="email" type="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-200" {...register("email")}/>
                    <p className="text-red-800 text-xs">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col flex-start">
                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                    <input id="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-200" {...register("password")} />
                    <p className="text-red-800 text-xs">{errors.password?.message}</p>
                </div>
                <div className="flex flex-row justify-between mb-8">
                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    </label>
                    <a className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
                </div>
                <button className="bg-blue-600 h-12 rounded-lg text-white text-lg font-semibold" onClick={handleSubmit(onSubmitHandler)}>Sign In</button>
                <p className="text-sm leading-relaxed text-grey-900">Dont have an account? <Link to="/register"  className="font-bold text-grey-700">Sign up</Link></p>
            </form>
        </div>
    </div>
)
}

export default Login