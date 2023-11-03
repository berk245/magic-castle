<script>
	export let trick;
</script>

<div class="bg-slate-400 text-white rounded-md p-2">
	<p class="text-lg font-bold truncate">{trick.title}</p>
	<p>{trick.standing ? 'Standing' : 'Sitting'}</p>
	<p>{trick.minutes} mins</p>
	<p class="capitalize truncate">{trick.mix} deck</p>
</div>
