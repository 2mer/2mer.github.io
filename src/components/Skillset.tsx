import {
	ActionIcon,
	Box,
	Button,
	Card,
	Container,
	Group,
	Highlight,
	Table,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import axios from 'axios';
import { useMemo, useState } from 'preact/hooks';
import useSWR from 'swr';
import { Search } from 'tabler-icons-react';

const fetcher = () =>
	axios.get(
		// 'https://raw.githubusercontent.com/2mer/cms/main/portfolio/experience.json'
		'https://raw.githubusercontent.com/2mer/cms/main/portfolio/experience.json'
	);

function getCategoriesArray(categories) {
	return Object.entries(categories)
		.filter(([, v]) => v)
		.map(([k]) => k);
}

function confidenceToColor(confidence) {
	if (confidence >= 0.9) return 'green';
	if (confidence >= 0.8) return 'lime';
	if (confidence >= 0.7) return 'yellow';
	if (confidence >= 0.6) return 'orange';
	return 'red';
}

function Skillset() {
	const { data, isValidating, error } = useSWR('experience', fetcher);
	const [filter, setFilter] = useState('');
	const [selectedCategories, setSelectedCategories] = useState({});
	const filteredKnowledge = useMemo(() => {
		if (!data) return [];

		const entries = data.data.knowledge.sort(
			(a, b) => b.confidence - a.confidence
		);

		const categoryArray = getCategoriesArray(selectedCategories);
		console.log(selectedCategories, categoryArray);

		if (!filter && !categoryArray.length) return entries;

		return entries.filter(
			(entry) =>
				entry.name.toLowerCase().includes(filter.toLowerCase()) &&
				categoryArray.some((category) =>
					entry?.tags?.contains(category)
				)
		);
	}, [data, filter, selectedCategories]);

	if (isValidating) return null;
	if (error) return null;

	return (
		<Container
			size={700}
			style={{ background: 'transparent', minHeight: '400px' }}
		>
			<Title order={1} style={{ fontSize: 50 }} mb='xs'>
				Skill-set
			</Title>

			<Card withBorder>
				{/* filters */}
				<Group noWrap position='apart' align='center' mb='xl'>
					<Group noWrap>
						{['web', 'backend', 'design'].map((t) => {
							const isSelected = selectedCategories[t];

							return (
								<Button
									variant={isSelected ? 'filled' : 'subtle'}
									onClick={() =>
										setSelectedCategories((prev) => ({
											...prev,
											[t]: !prev[t],
										}))
									}
								>
									{t}
								</Button>
							);
						})}
					</Group>
					<TextInput
						placeholder='search...'
						variant='filled'
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						rightSection={
							<ActionIcon
								size='md'
								variant='subtle'
								color='primary'
							>
								<Search size={14} />
							</ActionIcon>
						}
					/>
				</Group>
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
								<td>
									<Highlight highlight={filter}>
										{entry.name}
									</Highlight>
								</td>
								<td>
									<Box
										h='8px'
										bg={confidenceToColor(entry.confidence)}
										style={{
											width: `${entry.confidence * 100}%`,
											borderRadius: '50px',
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				{!filteredKnowledge.length && (
					<Text color='dimmed' m='sm' mt='xs' size='sm'>
						No results
					</Text>
				)}
			</Card>
		</Container>
	);
}

export default Skillset;
