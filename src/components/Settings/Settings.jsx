import { useEffect, useRef, useState } from 'react'
import styles from './Settings.module.css'

const Settings = ({ onClose }) => {
	const modalRef = useRef(null)
	const [opacity, setOpacity] = useState(100)

	useEffect(() => {
		const loadOpacity = async () => {
			if (window.electronAPI) {
				try {
					const currentOpacity = await window.electronAPI.getOpacity()
					setOpacity(currentOpacity)
				} catch (error) {
					console.error('Failed to get opacity:', error)
				}
			}
		}

		loadOpacity()

		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	const handleOpacityChange = (event) => {
		const newOpacity = parseInt(event.target.value)
		setOpacity(newOpacity)

		if (window.electronAPI) {
			window.electronAPI.setOpacity(newOpacity)
		}
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.modal} ref={modalRef}>
				<div className={styles.modal__header}>
					<h2 className={styles.modal__title}>Настройки</h2>
					<button className={styles.modal__close} onClick={onClose}>
						×
					</button>
				</div>

				<div className={styles.modal__container}>
					<div className={styles.modal__group}>
						<label className={styles.modal__label} htmlFor='api-token'>
							API Token
						</label>
						<input
							type='password'
							id='api-token'
							className={styles.modal__input}
							placeholder='Введите ваш API токен'
						/>
					</div>

					<div className={styles.modal__group}>
						<label className={styles.modal__label} htmlFor='opacity'>
							Прозрачность окна:{' '}
							<span className={styles.modal__value}>{opacity}%</span>
						</label>
						<input
							type='range'
							id='opacity'
							className={styles.modal__slider}
							min='10'
							max='100'
							value={opacity}
							onChange={handleOpacityChange}
						/>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Settings
