<script lang="ts">
	import { getDisplayableOptions } from '$lib/scripts/faker-wrapper';

	export let columnIndex: number;
	export let dataFieldType: string;
	export let columnValue: undefined | string;
	export let columnOptionId: undefined | string;

	interface SelectOption {
		id: number;
		text: string;
		generateFunction: () => string;
	}

	let useStaticValue = true;
	const displayableOptions = getDisplayableOptions();

	function resetColumnField() {
		const newUseStaticValueState = !useStaticValue;
		if (newUseStaticValueState) {
			columnOptionId = undefined;
		} else {
			columnValue = undefined;
		}
	}
</script>

<label for="column{columnIndex}fixedCheck" class="form-check-label">Column Content</label>
<div class="input-group">
	<div class="input-group-text">
		<input
			value="test"
			id="column{columnIndex}fixedCheck"
			class="form-check-input mt-0"
			type="checkbox"
			on:click={resetColumnField}
			bind:checked={useStaticValue}
		/>
	</div>

	{#if useStaticValue}
		<input
			bind:value={columnValue}
			type="text"
			class="form-control"
			id="column{columnIndex}Type"
			placeholder="Fixed column text"
		/>
	{:else}
		<select bind:value={columnOptionId} class="form-select">
			<option selected>Select fake data type...</option>
			{#each displayableOptions as fakerOption}
				<option value={fakerOption.id}>{fakerOption.text}</option>
			{/each}
		</select>
	{/if}
</div>
