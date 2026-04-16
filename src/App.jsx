import AddTransaction from './pages/AddTransaction'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="adicionar" element={<AddTransaction />} />
          <Route path="historico" element={<History />} />
          <Route path="definicoes" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}
