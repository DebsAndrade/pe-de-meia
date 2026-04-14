import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { PreferencesContext } from '../context/PreferencesContext'
import '../index.css'

export default function Settings() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { currency, setCurrency, userName, setUserName } = useContext(PreferencesContext)

    return (
        <div>
            <h2>Definições</h2>

            {/* Tema */}
            <section>
                <h3>Tema</h3>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Mudar para Dark' : 'Mudar para Light'}
                </button>
            </section>

            {/* Moeda */}
            <section>
                <h3>Moeda</h3>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - Dólar</option>
                    <option value="GBP">GBP - Libra</option>
                </select>
            </section>

            {/* Nome */}
            <section>
                <h3>O teu nome</h3>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Como te chamas?"
                />
            </section>
        </div>
    )
};
