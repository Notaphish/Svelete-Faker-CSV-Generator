<script lang="ts">
	import { faker } from '@faker-js/faker';
	import CsvColumData from './CsvColumData.svelte';
	import type { ColumnDetails } from '$lib/scripts/types';

	let latestId = 1;

	
	let fields: ColumnDetails[] = [{ id: latestId, columnName: '', type: '' }];

	function addNewField() {
		fields = [...fields, { id: ++latestId, columnName: '', type: '' }];
	}

	function removeLast() {
		fields.pop();
		latestId--
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
						bind:value={field.columnName}
						class="form-control form-control-sm"
						id="column{i}Name"
					/>
				</div>
				<div class="col-9">
					<CsvColumData
						bind:columnValue={field.fixedOptionValue}
						bind:columnOptionId={field.optionId}
						columnIndex={i}
						dataFieldType={field.type}
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
	<button on:click={() => console.log(JSON.stringify(fields))} class="btn btn-primary"
		>Generate CSV</button
	>
</div>
