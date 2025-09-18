import { useState } from 'react'
import Header from './components/Header/Header'
import Settings from './components/Settings/Settings'
import Sidebar from './components/Sidebar/Sidebar'
import { useTheme } from './hooks/useTheme'
import './styles/index.css'

function App() {
	const [theme, toggleTheme] = useTheme()
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const openSettings = () => {
		setIsSettingsOpen(true)
	}

	const closeSettings = () => {
		setIsSettingsOpen(false)
	}

	return (
		<div className='app' data-theme={theme}>
			<Header />
			<div className='app__body'>
				<Sidebar onSettingsClick={openSettings} />
				<div className='main-content'></div>
			</div>

			{isSettingsOpen && (
				<Settings
					onClose={closeSettings}
					theme={theme}
					toggleTheme={toggleTheme}
				/>
			)}
		</div>
	)
}

export default App
