import AddTransaction from './pages/AddTransaction'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'

export default function App() {

  return (
    <div className="mx-auto p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="transactions" element={<AddTransaction />} />
        </Route>
      </Routes>
    </div>
  )
};
