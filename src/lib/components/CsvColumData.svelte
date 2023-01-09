<script lang="ts">
	export let columnIndex: number;
	export let dataFieldType: string;
	export let columnValue: undefined | string;
	export let columnValueFunction: undefined | (() => string);

	import { faker } from '@faker-js/faker';
	interface SelectOption {
		id: number;
		text: string;
		generateFunction: () => string;
	}

	let useStaticValue = true;

	const options: SelectOption[] = [
		{ id: 1, text: 'Email address', generateFunction: faker.internet.email },
		{ id: 2, text: 'First Name', generateFunction: faker.name.firstName }
	];

</script>

<label for="column{columnIndex}fixedCheck" class="form-check-label">Column Content</label>
<div class="input-group">
    <div class="input-group-text">
        <input value="test" id="column{columnIndex}fixedCheck" class="form-check-input mt-0" type="checkbox" bind:checked={useStaticValue}>
      </div>

	{#if useStaticValue}
		<input type="text" class="form-control" id="column{columnIndex}Type" placeholder="Fixed column text" />
	{:else}
		<select bind:value={columnValueFunction} class="form-select">
            <option selected>Select fake data type...</option>
			{#each options as fakerOption}
				<option value={fakerOption.generateFunction}>{fakerOption.text}</option>
			{/each}
		</select>
	{/if}
</div>
