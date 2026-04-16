import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getTransactions, deleteTransaction } from '../api';
import TransactionList from '../components/TransactionList';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export default function History() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const { data: allTransactions = [], isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error('Erro ao apagar transação:', error);
        },
    });

    const filteredTransactions = allTransactions
        .filter(t => {
            if (typeFilter === 'income' && t.type !== 'income') return false;
            if (typeFilter === 'expense' && t.type !== 'expense') return false;
            if (searchTerm && !t.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <p className="text-center text-muted-foreground py-8">A carregar...</p>;
    if (isError) return <p className="text-center text-expense py-8">Erro ao carregar transações.</p>;

    const filterButtons = [
        { key: 'all', label: 'Todas' },
        { key: 'income', label: 'Receitas' },
        { key: 'expense', label: 'Despesas' },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Histórico de Transações</h2>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Pesquisar por descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Filtros de tipo */}
            <div className="flex items-center gap-2 flex-wrap">
                {filterButtons.map(({ key, label }) => (
                    <Button
                        key={key}
                        size="sm"
                        variant={typeFilter === key ? "default" : "outline"}
                        onClick={() => setTypeFilter(key)}
                        className={cn(
                            typeFilter === key && key === 'income' && "bg-income text-income-foreground hover:bg-income/90 border-income",
                            typeFilter === key && key === 'expense' && "bg-expense text-expense-foreground hover:bg-expense/90 border-expense",
                        )}
                    >
                        {label}
                    </Button>
                ))}

                <Badge variant="secondary" className="ml-auto">
                    {filteredTransactions.length}{' '}
                    {filteredTransactions.length === 1 ? 'transação' : 'transações'}
                </Badge>
            </div>

            {/* Lista de transações */}
            {filteredTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">Nenhuma transação encontrada</p>
            ) : (
                <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
            )}
        </div>
    );
}
