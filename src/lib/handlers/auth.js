import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";

export const authHandlers = {
    signup: async({email, password}) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
}