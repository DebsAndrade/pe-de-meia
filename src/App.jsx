import { useState } from 'react'
import logo from './assets/logo.png'
import AddTransaction from './components/AddTransaction'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import { initialTransactions } from './mockData'

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income - expense;

  const handleAdd = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img className='w-40 h-38' src={logo} alt="Pé de Meia" />
          </div>
          <h1 className="text-slate-500 text-xl">O aplicativo que ajuda você a economizar para o futuro!</h1>
        </header>
      </div>
      <br />
      <Summary totalBalance={total} income={income} expense={expense} />
      <br />
      <AddTransaction onAdd={handleAdd} />
      <br />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  )
};
