import { useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'
import { getTransactions, getCategories } from '../api'
import Summary from '../components/Summary'
import TransactionList from '../components/TransactionList'
import DateRangePicker from '../components/DateRangerPicker'
import CategoryFilter from '../components/CategoryFilter'
import CashFlowChart from '../components/CashFlowChart'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'

function startOfMonth() {
    const now = new Date()
    now.setDate(1)
    now.setMonth(now.getMonth() - 6)
    return now.toISOString().split('T')[0]
}

function today() {
    return new Date().toISOString().split('T')[0]
}

const initialState = {
    startDate: startOfMonth(),
    endDate: today(),
    activeCategory: null,
}

const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATE_RANGE':
            return { ...state, startDate: action.start, endDate: action.end }
        case 'SET_CATEGORY':
            return { ...state, activeCategory: action.category }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export default function Dashboard() {
    const [filters, dispatch] = useReducer(filtersReducer, initialState)

    const { data: allTransactions = [], isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    })

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    const transactions = allTransactions.filter(t => {
        const date = new Date(t.date)
        const afterStart = !filters.startDate || date >= new Date(filters.startDate)
        const beforeEnd = !filters.endDate || date <= new Date(filters.endDate)
        const matchesCategory = !filters.activeCategory || t.category === filters.activeCategory
        return afterStart && beforeEnd && matchesCategory
    })

    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = income - expenses

    if (isLoading) return <p className="text-center text-muted-foreground py-8">A carregar...</p>
    if (isError) return <p className="text-center text-expense py-8">Erro ao carregar transações.</p>

    return (
        <div className="space-y-6">
            {/* Resumo financeiro */}
            <Summary balance={balance} totalBalance={balance} income={income} expense={expenses} />

            {/* Gráfico de fluxo de caixa — usa todas as transações, não as filtradas */}
            <CashFlowChart transactions={transactions} />

            <Separator />

            {/* Filtros */}
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Período</p>
                        <DateRangePicker
                            startDate={filters.startDate}
                            endDate={filters.endDate}
                            onDateChange={(start, end) =>
                                dispatch({ type: 'SET_DATE_RANGE', start, end })
                            }
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: 'RESET' })}
                        className="mt-6 text-muted-foreground"
                    >
                        Limpar filtros
                    </Button>
                </div>

                {categories.length > 0 && (
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categorias</p>
                        <CategoryFilter
                            categories={categories}
                            activeCategory={filters.activeCategory}
                            onCategoryChange={(category) =>
                                dispatch({ type: 'SET_CATEGORY', category })
                            }
                        />
                    </div>
                )}
            </div>

            <Separator />

            {/* Transações recentes */}
            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Transações Recentes
                </p>
                {transactions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Nenhuma transação no período selecionado</p>
                ) : (
                    <TransactionList transactions={transactions.slice(0, 10)} categories={categories} />
                )}
            </div>
        </div>
    )
}
