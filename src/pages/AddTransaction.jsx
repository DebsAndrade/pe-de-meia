import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from 'lucide-react';
import Summary from '../components/Summary'
import TransactionList from '../components/TransactionList'
import { createTransaction, deleteTransaction, getTransactions, getCategories } from '../api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { cn } from '../lib/utils'

export default function AddTransaction() {
    const queryClient = useQueryClient();

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState(null);
    const [localTransactions, setLocalTransactions] = useState([]);
    const [formError, setFormError] = useState('');

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    useEffect(() => {
        getTransactions().then(data => {
            setLocalTransactions(Array.isArray(data) ? data : []);
        });
    }, []);

    const createMutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: (newTransaction) => {
            setLocalTransactions((prev) => [newTransaction, ...prev]);
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            setAmount('');
            setDescription('');
            setType('income');
            setCategory(null);
            setFormError('');
        },
        onError: (error) => {
            console.error('Erro ao criar transação:', error);
            setFormError('Não foi possível salvar a transação. Tente novamente.');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: (_, id) => {
            setLocalTransactions((prev) => prev.filter((t) => t.id !== id));
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error('Erro ao apagar transação:', error);
        },
    });

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!description.trim() || !amount || Number.parseFloat(amount) <= 0) {
            setFormError('Por favor, preencha a descrição e o valor da transação.');
            return;
        }

        const newTransaction = {
            amount: Number.parseFloat(amount),
            description: description,
            type: type,
            category: category,
            date: new Date().toISOString().split('T')[0],
        };

        createMutation.mutate(newTransaction);
    };

    const income = localTransactions
        .filter((t) => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = localTransactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const total = income - expense;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Nova Transação</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Detalhes da transação</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Tipo de transação */}
                        <div className="space-y-1.5">
                            <Label>Tipo</Label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setType('income')}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 text-sm font-semibold transition-colors",
                                        type === 'income'
                                            ? "border-income bg-income-subtle text-income"
                                            : "border-border text-muted-foreground hover:border-income/50"
                                    )}
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    Receita
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('expense')}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 text-sm font-semibold transition-colors",
                                        type === 'expense'
                                            ? "border-expense bg-expense-subtle text-expense"
                                            : "border-border text-muted-foreground hover:border-expense/50"
                                    )}
                                >
                                    <TrendingDown className="h-4 w-4" />
                                    Despesa
                                </button>
                            </div>
                        </div>

                        {/* Categoria */}
                        {categories.length > 0 && (
                            <div className="space-y-1.5">
                                <Label>Categoria <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.slug}
                                            type="button"
                                            onClick={() => setCategory(category === cat.slug ? null : cat.slug)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                                                category === cat.slug
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                            )}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Descrição e valor */}
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 space-y-1.5">
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Ex: Compras no supermercado"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="amount">Valor</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    placeholder="0,00"
                                    className="w-full md:w-36"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Erro de validação */}
                        {formError && (
                            <p className="text-sm text-expense font-medium">{formError}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={createMutation.isPending}
                            className={cn(
                                "w-full font-semibold",
                                type === 'income'
                                    ? "bg-income hover:bg-income/90 text-income-foreground"
                                    : "bg-expense hover:bg-expense/90 text-expense-foreground"
                            )}
                        >
                            {createMutation.isPending ? 'A guardar...' : 'Adicionar Transação'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Summary totalBalance={total} income={income} expense={expense} />

            {localTransactions.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Transações
                    </h3>
                    <TransactionList transactions={localTransactions} onDelete={handleDelete} categories={categories} />
                </div>
            )}
        </div>
    );
}
