import { Table } from '@mantine/core';
import axios from 'axios';
import { useMemo, useState } from 'preact/hooks';
import useSWR from 'swr';

const fetcher = () =>
	axios.get(
		'https://raw.githubusercontent.com/2mer/cms/main/portfolio/experience.json'
	);

function Skillset() {
	const { data, isValidating, error } = useSWR('experience', fetcher);
	const [filter, setFilter] = useState('');
	const filteredKnowledge = useMemo(() => {
		if (!data) return [];

		const entries = data.data.knowledge;

		if (!filter) return entries;

		return entries.filter((entry) => entry.name.includes(filter));
	}, [data]);

	if (isValidating) return null;
	if (error) return null;

	return (
		<Table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Confidence</th>
				</tr>
			</thead>
			<tbody>
				{filteredKnowledge.map((entry) => (
					<tr>
						<td>{entry.name}</td>
						<td>{entry.confidence}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default Skillset;
