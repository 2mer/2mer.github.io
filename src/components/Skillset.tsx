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
import { motion } from 'framer-motion';
import { useMemo, useState } from 'preact/hooks';
import useSWRImmutable from 'swr/immutable';
import { Search } from 'tabler-icons-react';

const fetcher = () =>
	axios.get(
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

const MotionContainer = motion(Container);

const container = {
	hidden: { opacity: 0 },
	shown: {
		opacity: 1,
		transition: { delay: 0, staggerChildren: 0.01 },
	},
};

function Skillset() {
	const { data, isValidating, error } = useSWRImmutable(
		'experience',
		fetcher
	);
	const [filter, setFilter] = useState('');
	const [selectedCategories, setSelectedCategories] = useState({});
	const filteredKnowledge = useMemo(() => {
		if (!data) return [];

		const entries = data.data.knowledge.sort(
			(a, b) => b.confidence - a.confidence
		);

		const categoryArray = getCategoriesArray(selectedCategories);

		if (!filter && !categoryArray.length) return entries;

		return entries.filter(
			(entry) =>
				(filter
					? entry.name.toLowerCase().includes(filter.toLowerCase())
					: true) &&
				(categoryArray.length
					? categoryArray.some((category) =>
							entry?.tags?.includes(category)
					  )
					: true)
		);
	}, [data, filter, selectedCategories]);

	if (isValidating) return null;
	if (error) return null;

	return (
		<MotionContainer
			size={700}
			style={{
				background: 'transparent',
				minHeight: '400px',
				marginTop: '200px',
			}}
			variants={container}
			initial='hidden'
			whileInView='shown'
		>
			<Title order={1} style={{ fontSize: 50 }} mb='xs'>
				Skill-set
			</Title>

			<Card withBorder>
				{/* filters */}
				<Group noWrap position='apart' align='center' mb='xl'>
					<Group noWrap>
						{['frontend', 'backend', 'design'].map((t) => {
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
								<motion.td
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									style={{ width: '250px' }}
								>
									<Box
										h='8px'
										bg={confidenceToColor(entry.confidence)}
										style={{
											width: `${entry.confidence * 100}%`,
											borderRadius: '50px',
										}}
									/>
								</motion.td>
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
		</MotionContainer>
	);
}

export default Skillset;
