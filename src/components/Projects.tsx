import { Container, Stack, Title, Transition } from '@mantine/core';
import axios from 'axios';
import { useMemo, useState } from 'preact/hooks';
import useSWRImmutable from 'swr/immutable';
import ProjectCarousel from './ProjectCarousel';

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
		<Transition
			mounted={Boolean(data)}
			transition='fade'
			duration={400}
			timingFunction='ease'
		>
			{(styles) => (
				<>
					<Container size={700} style={styles}>
						<Title order={1} style={{ fontSize: 50 }} mb='xs'>
							Projects
						</Title>
					</Container>
					<Stack style={styles}>
						{chunks.map((chunk, i) => (
							<ProjectCarousel
								projects={chunk}
								offset={(i + 1) * 1000}
							/>
						))}
					</Stack>
				</>
			)}
		</Transition>
	);
}

export default Projects;
