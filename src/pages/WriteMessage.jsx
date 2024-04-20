import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../config/config";
import { useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const WriteMessage = () => {

  const { id } = useParams()

  const schema = yup.object().shape({
    message: yup.string().required(),
})
const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
});

const onSubmitHandler = async (data) => {
  try{
    const docref = await addDoc(collection(db, "messages"), {
      message: data.message,
      uid: id
    })
    alert("message sent")
  }catch(error){
    console.log(error.message )
  }
  reset();
}
  return (
    <div>
      <h1>Send message</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
         <div>
          <p> {errors.message?.message} </p>
            <textarea name="message" id="message" cols="30" rows="10" className='border-2 border-black' {...register("message")}></textarea> <br />
            <input type="submit"  className="bg-blue-500 text-black font-bold text-lg capitalize px-6 py-2 cursor-pointer" onClick={handleSubmit(onSubmitHandler)} />
         </div>
      </form>
    </div>
  )
}

export default WriteMessage