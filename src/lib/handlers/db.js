import { db } from '$lib/firebase/firebase';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { authStore, setLoading } from '../store/store';

let user;
authStore.subscribe((curr) => {
	user = curr?.user;
});

export const getUserRef = async (user) => {
	const userRef = doc(db, 'users', user.uid);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		console.log('No data for this user found in the collection.');
		await createUserDocument(user);
	}
	return userRef;
};

export const getUserTricks = async (user) => {
	if (!user) return [];
	const userRef = await getUserRef(user);
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
		const isConfirm = confirm('Are you sure?');
		if (!isConfirm) return;
		setLoading(true);
		const userRef = doc(db, 'users', user.uid);
		const tricksCollection = collection(userRef, 'tricks');
		const trickDoc = doc(tricksCollection, trickId);
		await deleteDoc(trickDoc);
	} catch (err) {
		console.log(err);
		alert('Something went wrong while deleting the trick. Please try again.');
	} finally {
		getUpdatedTricks(user);
	}
};

export const createNewTrick = async (user, trick) => {
	const userRef = await getUserRef(user);
	const tricksCollection = collection(userRef, 'tricks');

	addDoc(tricksCollection, trick);
	return;
};

export const getUpdatedTricks = async (user) => {
	setLoading(true);
	let updatedTricksList = await getUserTricks(user);
	authStore.update((curr) => {
		return {
			...curr,
			tricks: updatedTricksList
		};
	});
	setLoading(false);
};
