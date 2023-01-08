<script lang="ts">
	export let columnIndex: number;
	export let dataFieldType: string;

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

<label for="column{columnIndex}fixedCheck" class="form-check-label">Fixed Value?</label>
<input
	type="checkbox"
	class="form-check form-check-sm"
	id="column{columnIndex}fixedCheck"
	bind:checked={useStaticValue}
/>

{#if useStaticValue}
	<label for="column{columnIndex}Type" class="form-label">Column Value</label>
	<input type={dataFieldType} class="form-control form-control-sm" id="column{columnIndex}Type" />
{:else}
	<label for="column{columnIndex}fakerType" class="form-label">Fake Value Type</label>
	<select class="form-select">
		{#each options as fakerOption}
			<option value={fakerOption}>{fakerOption.text}</option>
		{/each}
	</select>
{/if}
