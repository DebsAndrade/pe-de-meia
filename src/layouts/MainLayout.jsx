import { NavLink, Outlet } from "react-router";
import { useContext } from 'react';
import logo from '../assets/logo.png';
import { ThemeContext } from '../context/ThemeContext';

export default function MainLayout() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div>
            <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                <NavLink
                    to="/"
                    end
                    style={({ isActive }) => ({ color: isActive ? "blue" : "#333", fontWeight: isActive ? 700 : 400 })}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/History"
                    style={({ isActive }) => ({ color: isActive ? "blue" : "#333", fontWeight: isActive ? 700 : 400 })}
                >
                    History
                </NavLink>
                <NavLink
                    to="/Settings"
                    style={({ isActive }) => ({ color: isActive ? "blue" : "#333", fontWeight: isActive ? 700 : 400 })}
                >
                    Settings
                </NavLink>
                <NavLink
                    to="/transactions"
                    style={({ isActive }) => ({ color: isActive ? "blue" : "#333", fontWeight: isActive ? 700 : 400 })}
                >
                    Transactions
                </NavLink>
                <button onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </nav>
            <div className={`mx-auto rounded-2xl shadow-sm p-8 border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
                <header className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <img className='w-40 h-38' src={logo} alt="Pé de Meia" />
                    </div>
                    <h1 className={`text-xl ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>O aplicativo que ajuda você a economizar para o futuro!</h1>
                </header>
            </div>
            <Outlet />
        </div>
    );
};
