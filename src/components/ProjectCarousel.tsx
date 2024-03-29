import {
	Badge,
	Box,
	Card,
	Group,
	Image,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'preact/hooks';

const CAROUSEL_WIDTH = 350;
const CAROUSEL_HEIGHT = 250;
const GUTTER = 8;

function ProjectCarousel({ projects, offset }) {
	const containerRef = useRef<Element>();

	useEffect(() => {
		const slides = [
			...(containerRef.current?.querySelectorAll('.carouselSlide') ?? []),
		];

		gsap.set(slides, {
			x: (i) => i * (CAROUSEL_WIDTH + 2 * GUTTER) + offset,
		});

		gsap.to(slides, {
			duration: 60,
			ease: 'none',
			x: `+=${(CAROUSEL_WIDTH + 2 * GUTTER) * projects.length}px`,
			modifiers: {
				x: gsap.utils.unitize(
					(x) =>
						parseFloat(x) %
						((CAROUSEL_WIDTH + 2 * GUTTER) * projects.length)
				),
			},
			repeat: -1,
		});
	}, []);

	return (
		<Box
			className='carouselBody'
			h={CAROUSEL_HEIGHT}
			pos='relative'
			ref={containerRef}
		>
			<Box pos='absolute' left={`-${CAROUSEL_WIDTH}px`}>
				{projects.map((project: any) => (
					<motion.div
						variants={{
							hidden: { opacity: 0, y: -50 },
							shown: { opacity: 1, y: 0 },
						}}
					>
						<Box
							pos='absolute'
							h={CAROUSEL_HEIGHT}
							w={CAROUSEL_WIDTH + 2 * GUTTER}
							p={`0 ${GUTTER}px`}
							className='carouselSlide'
						>
							<Card
								h={CAROUSEL_HEIGHT}
								w={CAROUSEL_WIDTH}
								shadow='sm'
								onClick={() => {
									window.open(project.link);
								}}
								style={{ cursor: 'pointer' }}
							>
								<Group noWrap position='apart' align='start'>
									<Stack>
										<Title>{project.displayName}</Title>
										{project.description && (
											<Text>{project.description}</Text>
										)}
										<Group>
											{project.tags.map((tag) => (
												<Badge>{tag}</Badge>
											))}
										</Group>
									</Stack>
									{project.icon && (
										<Image
											src={project.icon}
											width='60px'
											height='60px'
										/>
									)}
								</Group>
							</Card>
						</Box>
					</motion.div>
				))}
			</Box>
		</Box>
	);
}

export default ProjectCarousel;
