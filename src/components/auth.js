import { auth, googleAuthProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInHandle = async() =>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.error(err);
        }   
    };

    const signInWithGoogleHandle = async() =>{
        try{
            await signInWithPopup(auth, googleAuthProvider);
        }catch(err){
            console.error(err);
        }   
    };

    const logOutHandle = async() =>{
        try{
            await signOut(auth);
        }catch(err){
            console.error(err);
        }   
    };

    return(
        <div>
            <input placeholder='email...'
                   onChange={(e) => setEmail(e.target.value)}
            >
            </input>
            <input placeholder='password...'
                   type='password'
                   onChange={(e) => setPassword(e.target.value)}
            >
            </input>
            <button onClick={signInHandle}>SignIn</button>
            <button onClick={signInWithGoogleHandle}>SignIn with google</button>
            <button onClick={logOutHandle}>SignOut</button>
        </div>
    );
}