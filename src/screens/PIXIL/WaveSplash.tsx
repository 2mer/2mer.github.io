import { Box, Stack } from '@mantine/core'
import React from 'react'

export default function WaveSplash({ children }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '-200px' }}>
			<Box sx={{ background: '#5000ca', color: 'white', padding: '20vh 30vw' }}>
				{children}
			</Box>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5000ca" fillOpacity="1" d="M0,288L48,256C96,224,192,160,288,133.3C384,107,480,117,576,117.3C672,117,768,107,864,85.3C960,64,1056,32,1152,42.7C1248,53,1344,107,1392,133.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
		</Box >
	)
}
