import styles from './Sidebar.module.css'

const Sidebar = ({ onSettingsClick }) => {
	return (
		<aside className={styles.sidebar}>
			<nav className={styles.sidebar__nav}>
				<ul className={styles.sidebar__list}>
					<li className={styles.sidebar__item}>
						<button className={styles.sidebar__btn} onClick={onSettingsClick}>
							<span className={styles.sidebar__text}>Настройки</span>
						</button>
					</li>
				</ul>
			</nav>
		</aside>
	)
}

export default Sidebar
