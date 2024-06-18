import { Link, useRouteError } from "react-router-dom";
import errorImg from "../assets/error.svg";
import arrowBack from "../assets/arrowBack.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <div style={{
        backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
      }} className="h-screen font-raleway" >
       
            <img src={arrowBack} alt="back icon" className="w-8 pt-3 ml-4" />
        
        <div className="bg-white rounded-t-3xl p-8 mt-8 overflow-y-scroll h-[90vh]">
        <p className="text-lg text-anonRed">Sorry, an unexpected error has occurred.</p>
          <img src={errorImg} alt="error page" className="p-4 mt-12" />
           
          <button className='bg-anonRed text-white text-lg px-4 py-2 mt-6 rounded-md ' ><Link to="/login">Go back to login</Link></button>
            

        </div>
    </div>
  );
}