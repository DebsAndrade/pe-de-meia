import PropTypes from "prop-types";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, onDelete, categories = [] }) {
    return (
        <ul className="space-y-3 max-h-105 overflow-y-auto pr-1">
            {transactions.map((t) => (
                <TransactionItem key={t.id} transaction={t} onDelete={onDelete} categories={categories} />
            ))}
        </ul>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    categories: PropTypes.array,
}
