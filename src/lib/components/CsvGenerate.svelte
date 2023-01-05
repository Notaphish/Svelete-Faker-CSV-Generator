<script lang="ts">
	let latestId = 1;

	let fields = [{ id: 1, name: 'testing', value: '', type: 'email' }];

	function addNewField() {
		fields = [...fields, { id: ++latestId, name: '', value: '', type: '' }];
	}

	function removeLast() {
		fields.pop();
        fields = fields
	}

	$: console.log(fields.length);
</script>

<form>
	{#each fields as field, i}
		<label for="testField{i}" class="form-label">{field.name}</label>
		<input type={field.type} class="form-control form-control-sm" id="testField{i}" />
	{/each}
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

