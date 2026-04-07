import PropTypes from 'prop-types';

export default function TransactionItem({ transaction, onDelete }) {
    const isIncome = transaction.type === 'income';

    return (
        <li className={`flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm transition-all hover:shadow-md ${isIncome ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500'}`}>
            <div className="flex flex-col">
                <span className="font-medium text-slate-700">{transaction.description}</span>
                <span className="text-xs text-slate-400">{transaction.date}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className={`font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isIncome ? '+' : '-'} € {transaction.amount.toFixed(2)}
                </span>
                <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                >Deletar Transação
                </button>
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
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};
