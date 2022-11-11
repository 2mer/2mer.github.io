import {
	createStyles,
	Container,
	Text,
	Button,
	Group,
	List,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { BrandGithub, BrandLinkedin } from 'tabler-icons-react';
import CaretComplete from './CaretComplete';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		boxSizing: 'border-box',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

	inner: {
		position: 'relative',
		paddingTop: 200,
		paddingBottom: 200,

		[BREAKPOINT]: {
			paddingBottom: 80,
			paddingTop: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 62,
		fontWeight: 900,
		lineHeight: 1.1,
		margin: 0,
		padding: 0,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,

		[BREAKPOINT]: {
			fontSize: 42,
			lineHeight: 1.2,
		},
	},

	description: {
		marginTop: theme.spacing.xl,
		fontSize: 24,

		[BREAKPOINT]: {
			fontSize: 18,
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 2,

		[BREAKPOINT]: {
			marginTop: theme.spacing.xl,
		},
	},

	control: {
		height: 54,
		paddingLeft: 38,
		paddingRight: 38,

		[BREAKPOINT]: {
			height: 54,
			paddingLeft: 18,
			paddingRight: 18,
			flex: 1,
		},
	},
}));

const MotionGroup = motion(Group);

const aliases = ['2mer', 'Tomer', 'Atar'];

export function Hero() {
	const { classes } = useStyles();

	return (
		<motion.div
			className={classes.wrapper}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
		>
			<Container size={700} className={classes.inner}>
				<h1 className={classes.title}>
					Hi I'm&nbsp;
					<Text
						component='span'
						variant='gradient'
						gradient={{ from: 'orange', to: 'pink', deg: 45 }}
						inherit
					>
						Tomer Atar
					</Text>
					<Text size={40}>
						but you can call me&nbsp;
						<CaretComplete texts={aliases} />
					</Text>
				</h1>

				<Text className={classes.description} color='dimmed'></Text>
				<List className={classes.description}>
					<List.Item icon={'⚡️'}>Batteries included</List.Item>
					<List.Item icon={'🔥'}>Blazingly fast</List.Item>
					<List.Item icon={'🎭'}>
						Jack of all trades - and master of quite!
					</List.Item>
				</List>

				<MotionGroup
					className={classes.controls}
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ ease: 'easeOut', duration: 1 }}
				>
					<Button
						component='a'
						href='https://il.linkedin.com/in/tomer-atar-9881b215b'
						size='xl'
						variant='default'
						className={classes.control}
						leftIcon={<BrandLinkedin size={20} />}
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ ease: 'easeOut', duration: 1 }}
					>
						LinkedIn
					</Button>
					<Button
						component='a'
						href='https://github.com/2mer'
						size='xl'
						variant='default'
						className={classes.control}
						leftIcon={<BrandGithub size={20} />}
					>
						GitHub
					</Button>
				</MotionGroup>
			</Container>
		</motion.div>
	);
}
