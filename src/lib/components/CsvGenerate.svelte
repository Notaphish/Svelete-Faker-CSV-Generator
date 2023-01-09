<script lang="ts">
	import { faker } from '@faker-js/faker';
	import CsvColumData from './CsvColumData.svelte';

	interface FieldDeets {
		id: number;
		name: string;
		value?: string;
		valueFunction?: () => string;
		type: string;
	}
	let latestId = 1;

	let fields: FieldDeets[] = [{ id: 1, name: '', value: "", type: '', valueFunction: undefined }];

	function addNewField() {
		fields = [...fields, { id: ++latestId, name: '', type: '', value: "", valueFunction: undefined }];
	}

	function removeLast() {
		fields.pop();
		fields = fields;
	}

	$: console.log(JSON.stringify(fields));
</script>

<form>
	<div class="container">
		{#each fields as field, i}
			<div class="row">
				<div class="col">
					<label for="column{i}Name" class="form-label">Column Name</label>
					<input
						type="string"
						bind:value={field.name}
						class="form-control form-control-sm"
						id="column{i}Name"
					/>
				</div>
				<div class="col-9">
					<CsvColumData
						columnIndex={i}
						dataFieldType={field.type}
						columnValue={field.value}
						columnValueFunction={field.valueFunction}
					/>
				</div>
			</div>
		{/each}
	</div>
</form>
<div class="container mt-1">
	<div class="btn-group" role="group">
		<button class="btn btn-success" on:click={addNewField}>Add new entry</button>
		<button class="btn btn-danger" on:click={removeLast}>Remove last</button>
	</div>
</div>

<div class="row mt-1">
	<button on:click={() => console.log(JSON.stringify(fields))} class="btn btn-primary">Generate CSV</button>
</div>
