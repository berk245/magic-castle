import { writable } from 'svelte/store';

export const authStore = writable({
	user: null,
	loading: true,
	tricks: []
});

export const setLoading = (val) => {
	authStore.update((curr) => {
		return {
			...curr,
			loading: val
		};
	});
};
