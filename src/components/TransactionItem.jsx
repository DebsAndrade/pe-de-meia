import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { PreferencesContext } from '../context/PreferencesContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

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

export default function TransactionItem({ transaction, onDelete, categories = [] }) {
    const { currency } = useContext(PreferencesContext);
    const isIncome = transaction.type === 'income';
    const displayValue = isIncome ? transaction.amount : Math.abs(transaction.amount);
    const categoryLabel = transaction.category
        ? (categories.find(c => c.slug === transaction.category)?.label ?? transaction.category)
        : null;

    return (
        <li className={cn(
            "flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm transition-all hover:shadow-md",
            isIncome ? "border-l-4 border-l-income" : "border-l-4 border-l-expense"
        )}>
            <div className="flex flex-col gap-1 min-w-0">
                <span className="font-medium text-foreground truncate">{transaction.description}</span>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    <Badge variant={isIncome ? "income" : "expense"} className="text-[10px] py-0">
                        {isIncome ? "Receita" : "Despesa"}
                    </Badge>
                    {categoryLabel && (
                        <Badge variant="secondary" className="text-[10px] py-0">
                            {categoryLabel}
                        </Badge>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className={cn("font-bold text-sm", isIncome ? "text-income" : "text-expense")}>
                    {isIncome ? '+' : '-'} {formatCurrency(displayValue, currency)}
                </span>
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(transaction.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-expense hover:bg-expense-subtle"
                        aria-label="Deletar transação"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </li>
    );
}

TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        category: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
}
