<script>
	export let alertType; //currently danger and success
	export let title;
	export let alertMessage;
	export let backToRoute;

	const classes = {
		danger: {
			container:
				'p-4 mb-4 text-red-800 align-middle border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
			backButton:
				'text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800'
		},
		success: {
			container:
				'p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800',
			backButton:
				'text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800'
		}
	};
</script>

<div
	class="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center"
>
	<div id="alert-additional-content-2" class={classes[alertType].container} role="alert">
		<div class="flex items-center">
			<svg
				class="flex-shrink-0 w-4 h-4 mr-2"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
				/>
			</svg>
			<span class="sr-only">Info</span>
			<h3 class="text-lg font-medium">{title}</h3>
		</div>
		<div class="mt-2 mb-4 text-sm">
			{alertMessage}
		</div>
		<div class="flex">
			<a href={backToRoute}>
				<button
					type="button"
					class={classes[alertType].backButton}
					data-dismiss-target="#alert-additional-content-2"
					aria-label="Close"
					>Go back
				</button>
			</a>
		</div>
	</div>
</div>
