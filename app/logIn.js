import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function LogIn() {

    const [email, setEmail]= useState("")
    const [password, setpassword]= useState("")
    
    const auth = getAuth();
    const logInSubmit=()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
          
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
           
        });
        }

    return(
        <>
       <input type="email" value={email} onChange={setEmail}>
       </input>

       <input type="passowrd" value={password} onChange={setpassword}>
       </input>

       <button onClick={logInSubmit}>
        submit
       </button>

        
        
        
        </>

    );

}

