import { auth } from "../config/config"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
  return (
    <div>
        <h1>LOgin here</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}> 
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" {...register("email")} />
                    <p>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" {...register("password")} />
                    <p>{errors.password?.message}</p>
                </div>
                <div>
                <input type="submit" value="Login" onClick={handleSubmit(onSubmitHandler)} />
            </div>
            </form>
        <div>
            <p>Don't have an account? <Link to="/register">register</Link></p>
        </div>
    </div>
  )
}

export default Login