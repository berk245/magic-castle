import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { auth } from '$lib/firebase/firebase';

export const authHandlers = {
	signup: async ({ email, password }) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async ({ email, password }) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	resetPassword: async ({ email }) => {
		await sendPasswordResetEmail(auth, email);
	},
	signout: async () => {
		await signOut(auth);
	}
};
