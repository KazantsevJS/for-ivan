const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow
let currentOpacity = 1.0

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 500,
		minWidth: 400,
		minHeight: 250,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		backgroundColor: '#1e1e1e',
		show: false,
		opacity: currentOpacity,
	})

	if (isDev) {
		mainWindow.loadURL('http://localhost:3000')
	} else {
		try {
			mainWindow.loadFile(path.join(__dirname, '../dist-react/index.html'))
		} catch (error) {
			console.error('Failed to load index.html:', error)
		}
	}

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.on('did-fail-load', () => {
		console.log('Failed to load page')
		if (isDev) {
			mainWindow.loadURL('http://localhost:3000')
		}
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

ipcMain.on('minimize-window', () => {
	mainWindow.minimize()
})

ipcMain.on('maximize-window', () => {
	if (mainWindow.isMaximized()) {
		mainWindow.unmaximize()
	} else {
		mainWindow.maximize()
	}
})

ipcMain.on('close-window', () => {
	mainWindow.close()
})

ipcMain.on('set-opacity', (_, opacity) => {
	currentOpacity = opacity / 100
	if (mainWindow) {
		mainWindow.setOpacity(currentOpacity)
	}
})

ipcMain.handle('get-opacity', () => {
	return currentOpacity * 100
})
