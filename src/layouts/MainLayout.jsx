import { NavLink, Outlet } from "react-router";
import logo from '../assets/logo.png';

export default function MainLayout() {
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
            </nav>
            <div className="mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <header className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <img className='w-40 h-38' src={logo} alt="Pé de Meia" />
                    </div>
                    <h1 className="text-slate-500 text-xl">O aplicativo que ajuda você a economizar para o futuro!</h1>
                </header>
            </div>
            <Outlet />
        </div>
    );
};
