import { MantineProvider } from '@mantine/core';
import { useState } from 'preact/hooks';
import { Hero } from './components/Hero';
import Projects from './components/Projects';
import Skillset from './components/Skillset';

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
		</MantineProvider>
	);
}
