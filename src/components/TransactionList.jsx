import PropTypes from "prop-types";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, onDelete }) {
    return (
        <ul className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            {transactions.map((t) => (
                <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
            ))}
        </ul>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};
