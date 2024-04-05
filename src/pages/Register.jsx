import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, provider } from "../config/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required()
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmitHandler = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error.message)
        })
        reset()
    }

    //sign in with google
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
            // ...
        });
    }
  return (
    <div>
        <h1>register here</h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" {...register("username")} />
                <p>{errors.username?.message}</p>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" {...register("email")} />
                <p>{errors.email?.message}</p>
            </div>
            
            <div>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" {...register("password")} />
                <p>{errors.password?.message}</p>
            </div>
            <div>
                <input type="submit" value="Sign up" onClick={handleSubmit(onSubmitHandler)}/>
            </div>
        </form>
        <div>
            <p>Do you have an account? <Link to="/login">login</Link></p>
        </div>
        <div>
            <p  className="cursor-pointer" onClick={signInWithGoogle}>Sign up with google</p>
        </div>
    </div>
  )
}

export default Register