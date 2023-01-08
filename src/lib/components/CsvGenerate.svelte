<script lang="ts">
	import CsvGenerateData from "./CsvGenerateData.svelte";

	interface FieldDeets {
		id: number,
		name: string,
		value?: string,
		valueFunction?: () => string,
		type: string
	}
	let latestId = 1;

	let fields: FieldDeets[] = [{ id: 1, name: '', value: '', type: 'email' }];

	function addNewField() {
		fields = [...fields, { id: ++latestId, name: '', type: '' }];
	}

	function removeLast() {
		fields.pop();
		fields = fields;
	}

	$: console.log(fields.length);
</script>

<form>
	<div class="container">
		{#each fields as field, i}
			<div class="row">
				<div class="col">
					<label for="column{i}Name" class="form-label">Column Name</label>
					<input type="string" bind:value={field.name} class="form-control form-control-sm" id="column{i}Name" />
				</div>
				<div class="col">
					<CsvGenerateData columnIndex={i} dataFieldType={field.type}/>
				</div>
			</div>
		{/each}
	</div>
</form>
<div class="container mt-1">
	<div class="row">
		<div class="col">
			<button class="btn btn-success" on:click={addNewField}>Add new entry</button>
		</div>
		<div class="col">
			<button class="btn btn-danger" on:click={removeLast}>Remove last</button>
		</div>
	</div>
</div>
