import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('pwa-counter')
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('pwa-counter', count.toString())
  }, [count])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-16 w-16 hover:opacity-80 transition-opacity" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-16 w-16 hover:opacity-80 transition-opacity animate-spin" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Vite PWA + React</h1>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            count is {count}
          </button>
          <p className="text-gray-600 mt-4">
            Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          Click on the Vite and React logos to learn more
        </p>
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 font-semibold">PWA Ready!</p>
          <p className="text-green-600 text-sm">This app works offline and can be installed</p>
          <p className="text-green-600 text-sm">Counter persists when you close and reopen the app</p>
        </div>
      </div>
    </div>
  )
}

export default App
