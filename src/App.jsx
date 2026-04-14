import { useContext } from 'react'
import AddTransaction from './pages/AddTransaction'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import { ThemeContext } from './context/ThemeContext'

export default function App() {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`app ${theme} mx-auto p-4 shadow-sm border ${theme === 'light' ? 'bg-white border-gray-100 text-gray-900' : 'bg-gray-900 border-gray-700 text-gray-100'}`}
    >
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<AddTransaction />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
};
