import { faker } from '@faker-js/faker';

interface SelectOption {
    text: string;
    generateFunction: () => string;
}

const fakerOptions: Record<string,SelectOption> = {
    "1": {text: "Email address", generateFunction:faker.internet.email },
    "2": {text: 'First Name', generateFunction: faker.name.firstName }
}

interface DisplayableOption {
    id: string,
    text: string
}

export function getDisplayableOptions(): DisplayableOption[]{
    return Object.entries(fakerOptions).map(([id,option]) => ({id, text: option.text}))
}

export function getAllOptionIds(): string[]{
    return Object.keys(fakerOptions);
}

export function getOptionForId(id: string): SelectOption{
    return fakerOptions[id]
}

