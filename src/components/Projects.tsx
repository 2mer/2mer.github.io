import { Container, Stack, Title } from '@mantine/core';
import axios from 'axios';
import { useMemo } from 'preact/hooks';
import useSWRImmutable from 'swr/immutable';
import ProjectCarousel from './ProjectCarousel';
import { motion } from 'framer-motion';

const fetcher = async () =>
	axios
		.get<any>(
			'https://raw.githubusercontent.com/2mer/cms/main/portfolio/repos.json'
		)
		.then((data) => data.data);

const chunkArray = <T,>(arr: T[], chunkSize, lengthThreshold) => {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		const ent: T[] = [];

		while (ent.length < lengthThreshold) {
			ent.push(...chunk);
		}
		chunks.push(ent);
	}

	return chunks;
};

const container = {
	hidden: { opacity: 0 },
	shown: {
		opacity: 1,
		transition: { delay: 0, staggerChildren: 0.01 },
	},
};

function Projects() {
	const { data, isValidating, error } = useSWRImmutable('repos', fetcher);

	const chunks = useMemo(() => {
		if (isValidating) return [];
		if (error) return [];

		return chunkArray(data.items, 7, 12);
	}, [data, isValidating, error]);

	if (isValidating) return null;
	if (error) return null;

	return (
		<motion.div variants={container} initial='hidden' whileInView='shown'>
			<Container size={700}>
				<Title order={1} style={{ fontSize: 50 }} mb='xs'>
					Projects
				</Title>
			</Container>
			<Stack style={{ overflow: 'hidden' }}>
				{chunks.map((chunk, i) => (
					<ProjectCarousel projects={chunk} offset={(i + 1) * 1000} />
				))}
			</Stack>
		</motion.div>
	);
}

export default Projects;
