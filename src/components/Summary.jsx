import PropTypes from "prop-types";
import { useContext } from 'react'
import { PreferencesContext } from '../context/PreferencesContext'

export default function Summary({ balance, totalBalance, income, expense }) {
    const { currency, userName } = useContext(PreferencesContext)

    // Intl.NumberFormat formata automaticamente consoante a moeda
    const formatted = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: currency, // ← vem do contexto
    }).format(balance)
    return (
        <>
            <div>
                {userName && <p>Olá, {userName}!</p>}
                <p>Saldo actual: {formatted}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-medium text-slate-500 uppercase">Saldo Atual</span>
                    <p className="text-xl font-bold text-slate-800">€ {totalBalance.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-xs font-medium text-emerald-700 uppercase">Receitas</span>
                    <p className="text-xl font-bold text-emerald-600">+ € {income.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <span className="text-xs font-medium text-rose-700 uppercase">Despesas</span>
                    <p className="text-xl font-bold text-rose-600">- € {expense.toFixed(2)}</p>
                </div>
            </div>
        </>
    );
}

Summary.propTypes = {
    balance: PropTypes.number.isRequired,
    totalBalance: PropTypes.number.isRequired,
    income: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
};
