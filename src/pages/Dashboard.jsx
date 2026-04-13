// Como usar o useQuery para buscar transações e filtrá-las no frontend
import { useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'
import { getTransactions } from '../api'
import Summary from '../components/Summary'
import TransactionList from '../components/TransactionList'

// Estado inicial dos filtros
const initialState = {
    startDate: null,
    endDate: null,
    activeCategory: null,
};

// Reducer para gerenciar os filtros
const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_START_DATE':
            return { ...state, startDate: action.payload }
        case 'SET_END_DATE':
            return { ...state, endDate: action.payload }
        case 'SET_CATEGORY':
            return { ...state, activeCategory: action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
};

export default function Dashboard() {
    const [filters, dispatch] = useReducer(filtersReducer, initialState)

    // useQuery vai buscar TODAS as transações à API
    const { data: allTransactions = [], isLoading, isError } = useQuery({
        queryKey: ['transactions'], // chave simples - busca tudo
        queryFn: getTransactions,
    })

    // Filtragem no frontend - aplicamos os filtros sobre os dados já em cache
    const transactions = allTransactions.filter(t => {
        const date = new Date(t.date)
        const afterStart = !filters.startDate || date >= new Date(filters.startDate)
        const beforeEnd = !filters.endDate || date <= new Date(filters.endDate)
        const matchesCategory = !filters.activeCategory || t.category === filters.activeCategory
        return afterStart && beforeEnd && matchesCategory
    })

    // Calcular os totais a partir das transações filtradas
    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = income - expenses

    if (isLoading) return <p>A carregar...</p>
    if (isError) return <p>Erro ao carregar transações.</p>

    return (
        <div>
            <Summary totalBalance={balance} income={income} expense={expenses} />
            <TransactionList transactions={transactions.slice(0, 10)} />
        </div>
    )
};
