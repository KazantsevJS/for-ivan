import styles from './Header.module.css'

const Header = ({ theme, toggleTheme }) => {
	const handleMinimize = () => {
		if (window.electronAPI) {
			window.electronAPI.minimizeWindow()
		}
	}

	const handleMaximize = () => {
		if (window.electronAPI) {
			window.electronAPI.maximizeWindow()
		}
	}

	const handleClose = () => {
		if (window.electronAPI) {
			window.electronAPI.closeWindow()
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.header__left}>
				<label className={styles.theme__switch}>
					<input
						type='checkbox'
						checked={theme === 'dark'}
						onChange={toggleTheme}
					/>
					<span className={styles.slider}></span>
				</label>
			</div>

			<div className={styles.header__container}>
				<button
					className={`${styles.control__btn} ${styles.minimize__btn}`}
					aria-label='Minimize'
					onClick={handleMinimize}
				>
					<svg
						className={styles.icon}
						width='12'
						height='12'
						viewBox='0 0 12 12'
					>
						<rect x='2' y='5' width='8' height='2' fill='currentColor' />
					</svg>
				</button>

				<button
					className={`${styles.control__btn} ${styles.maximize__btn}`}
					aria-label='Maximize'
					onClick={handleMaximize}
				>
					<svg
						className={styles.icon}
						width='12'
						height='12'
						viewBox='0 0 12 12'
					>
						<rect
							x='2'
							y='2'
							width='8'
							height='8'
							fill='none'
							stroke='currentColor'
							strokeWidth='1'
						/>
					</svg>
				</button>

				<button
					className={`${styles.control__btn} ${styles.close__btn}`}
					aria-label='Close'
					onClick={handleClose}
				>
					<svg
						className={styles.icon}
						width='12'
						height='12'
						viewBox='0 0 12 12'
					>
						<line
							x1='2'
							y1='2'
							x2='10'
							y2='10'
							stroke='currentColor'
							strokeWidth='1.2'
						/>
						<line
							x1='10'
							y1='2'
							x2='2'
							y2='10'
							stroke='currentColor'
							strokeWidth='1.2'
						/>
					</svg>
				</button>
			</div>
		</header>
	)
}

export default Header
