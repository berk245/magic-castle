import { db } from '$lib/firebase/firebase';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { authStore } from '../store/store';

let user;
authStore.subscribe((curr) => {
	user = curr?.user;
});

export const getUserTricks = async (user) => {
	if (!user) return [];
	const userRef = doc(db, 'users', user.uid);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		console.log('No data for this user found in the collection.');
		await createUserDocument(user);
	}
	const tricksCollection = collection(userRef, 'tricks');
	// Get tricks in the collection
	const userTricks = await getDocs(tricksCollection);

	let formattedTricks = [];
	userTricks.forEach((doc) => {
		formattedTricks.push({ ...doc.data(), id: doc.id });
	});
	return formattedTricks;
};

const createUserDocument = async (user) => {
	const newUser = doc(db, 'users', user.uid);
	await setDoc(
		newUser,
		{
			email: user.email
		},
		{ merge: true }
	);
	console.log('User created');
	return;
};


export const deleteTrick = async (trickId) => {
	try {
		const userRef = doc(db, 'users', user.uid);
		const tricksCollection = collection(userRef, 'tricks');
		const trickDoc = doc(tricksCollection, trickId);
		await deleteDoc(trickDoc);
	} catch (err) {
		console.log(err);
	} finally {
		await getUserTricks(user);
	}
};
