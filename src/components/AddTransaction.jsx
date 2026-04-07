import { useState } from "react";
import PropTypes from "prop-types";

export default function AddTransaction({ onAdd }) {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('income');

    const handleSubmit = (event) => { // "" undefined null 0 false
        event.preventDefault();
        if (!description.trim() || !amount.trim() || Number.parseFloat(amount) <= 0) {
            alert('Por favor, preencha a descrição e o valor da transação.');
            return;
        }
        onAdd({
            id: Date.now(),
            amount: Number.parseFloat(amount),
            description: description,
            type: type,
            date: new Date().toISOString().split('T')[0],
        });

        setAmount('');
        setDescription('');
        setType('income');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Descrição (ex: Compras)"
                    className="flex-1 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <input
                    type="number"
                    min={0}
                    placeholder="0.00"
                    className="w-full md:w-32 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                />
                <select
                    className="p-2.5 rounded-lg border border-gray-300 bg-white text-sm outline-none"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                >
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
                Adicionar Transação
            </button>
        </form>
    );
};

AddTransaction.propTypes = {
    onAdd: PropTypes.func.isRequired,
};
