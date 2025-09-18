import styles from './Header.module.css'

const Header = () => {
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
			</div>

			<div className={styles.header__container}>
				<button
					className={`${styles.control__btn} ${styles.minimize__btn}`}
					aria-label='Minimize'
					onClick={handleMinimize}
				>
					<span className={styles.icon__btn}>−</span>
				</button>

				<button
					className={`${styles.control__btn} ${styles.maximize__btn}`}
					aria-label='Maximize'
					onClick={handleMaximize}
				>
					<span className={styles.icon__btn}>□</span>
				</button>

				<button
					className={`${styles.control__btn} ${styles.close__btn}`}
					aria-label='Close'
					onClick={handleClose}
				>
					<span className={styles.icon__btn}>×</span>
				</button>
			</div>
		</header>
	)
}

export default Header
