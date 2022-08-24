import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Route, Routes } from 'react-router-dom'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import CursorStyles from './elements/CursorStyles'
import MainScreen from './screens/MainScreen/MainScreen'
import Demo from './screens/PIXIL/Demo'
import Game from './screens/RogueEx/Game'
import theme from './Theme'

const muiTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#3b31c2'
		},
		secondary: {
			main: '#f53dbb'
		}
	}
})

const GlobalStyle = createGlobalStyle`
	::selection {
		color: ${theme.palette.thirdary};
		background-color: ${theme.palette.primary};
	}
`

export default function App() {
	return (
		<Routes>
			<Route path="/" element={
				<MuiThemeProvider theme={muiTheme}>
					<ThemeProvider theme={theme}>
						<GlobalStyle />
						<CursorStyles>
							<MainScreen />
						</CursorStyles>
					</ThemeProvider>
				</MuiThemeProvider>
			} />
			<Route path="/RogueEx/*" element={<Game />} />
			<Route path="/PIXIL/*" element={<Demo />} />
		</Routes>
	)
}
