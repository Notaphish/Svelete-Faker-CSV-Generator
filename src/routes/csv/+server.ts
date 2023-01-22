import { generateCSV } from '$lib/scripts/generate-csv';
import { Parser } from '@json2csv/plainjs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const parser = new Parser({ withBOM: true });

	const { fields, rowsToGenerate } = await request.json();
	const rowColumns = generateCSV(rowsToGenerate, fields);
	const response = new Response();
	return new Response(parser.parse(rowColumns), {
		headers: {
			'Content-Type': 'text/csv',
		}
	});
}
