import PropTypes from "prop-types";
import { useContext } from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { PreferencesContext } from '../context/PreferencesContext'
import { Card, CardContent } from './ui/card'
import { cn } from '../lib/utils'

function formatCurrency(value, currency) {
    if (!value && value !== 0) return '—'

    const locale = currency === 'BRL' ? 'pt-BR' : 'pt-PT'

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export default function Summary({ balance, totalBalance, income, expense }) {
    const { userName, currency } = useContext(PreferencesContext)
    const displayBalance = typeof totalBalance === 'number' ? totalBalance : balance

    return (
        <div className="space-y-4 mb-6">
            {userName && (
                <p className="text-sm text-muted-foreground">
                    Olá, bem-vindo de volta, <strong className="text-foreground">{userName}</strong>!
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Saldo */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Saldo Atual
                            </span>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className={cn(
                            "text-2xl font-bold",
                            displayBalance >= 0 ? "text-income" : "text-expense"
                        )}>
                            {formatCurrency(displayBalance, currency)}
                        </p>
                    </CardContent>
                </Card>

                {/* Receitas */}
                <Card className="border-income/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-income">
                                Receitas
                            </span>
                            <TrendingUp className="h-4 w-4 text-income" />
                        </div>
                        <p className="text-2xl font-bold text-income">
                            + {formatCurrency(income, currency)}
                        </p>
                    </CardContent>
                </Card>

                {/* Despesas */}
                <Card className="border-expense/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-expense">
                                Despesas
                            </span>
                            <TrendingDown className="h-4 w-4 text-expense" />
                        </div>
                        <p className="text-2xl font-bold text-expense">
                            - {formatCurrency(expense, currency)}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

Summary.propTypes = {
    balance: PropTypes.number,
    totalBalance: PropTypes.number,
    income: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
}
