<script lang="ts">
	import CsvColumData from './CsvColumData.svelte';
	import type { ColumnDetails } from '$lib/scripts/types';

	let latestId = 1;

	let fields: ColumnDetails[] = [{ id: latestId, columnName: '', type: '' }];

	function addNewField() {
		fields = [...fields, { id: ++latestId, columnName: '', type: '' }];
	}

	function removeLast() {
		fields.pop();
		latestId--;
		fields = fields;
	}

	async function generateCSV() {
		if (fields.length === 1 && !fields[0].columnName && !fields[0].fixedOptionValue) {
			return;
		}

		const response = await fetch('/csv', {
			method: 'POST',
			body: JSON.stringify({ fields }),
			headers: {
				'content-type': 'application/json'
			}
		});

		triggerCsvDownload(await response.blob());
	}

	function triggerCsvDownload(csvBlob: Blob) {
		const url = window.URL || window.webkitURL;
		const link = url.createObjectURL(csvBlob);

		// generate anchor tag, click it for download and then remove it again
		const a = document.createElement('a');
		a.setAttribute('download', `data.csv`);
		a.setAttribute('href', link);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
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

	<div class="container mt-1">
		<div class="btn-group" role="group">
			<button class="btn btn-success" on:click={addNewField}>Add new entry</button>
			<button class="btn btn-danger" on:click={removeLast}>Remove last</button>
		</div>
	</div>

	<div class="row mt-1">
		<button on:click={generateCSV} class="btn btn-primary">Generate and Download CSV</button>
	</div>
</form>
