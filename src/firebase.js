
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { addDoc, 
         collection, 
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAG94TMw6liZjVvZ_Y3Gc7aC8JLOfea8eo",
  authDomain: "netflix-clone-f2c79.firebaseapp.com",
  projectId: "netflix-clone-f2c79",
  storageBucket: "netflix-clone-f2c79.appspot.com",
  messagingSenderId: "672457580031",
  appId: "1:672457580031:web:b6e83eecee5799b02a9bca"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name , email ,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);

        const user = res.user;

        await addDoc(collection(db,"user"), {
            uid: user.uid,
            name,
            authProvider : "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email , password)=>{
     try {
       await signInWithEmailAndPassword(auth,email,password);
     } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const logout = ()=>{
    signOut(auth);
}


export {auth, db , login ,signup ,logout}