import { MantineProvider } from '@mantine/core';
import { useState } from 'preact/hooks';
import Contact from './components/Contact';
import { Hero } from './components/Hero';
import Projects from './components/Projects';
import Skillset from './components/Skillset';
import Wave from './components/Wave';

export function App() {
	const [count, setCount] = useState(0);

	return (
		<MantineProvider
			theme={{ colorScheme: 'dark' }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Hero />
			<Projects />
			<Skillset />
			<Wave />
			<Contact />
		</MantineProvider>
	);
}
