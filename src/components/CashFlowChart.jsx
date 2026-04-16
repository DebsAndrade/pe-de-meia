import PropTypes from 'prop-types'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'

function buildChartData(transactions) {
    // Agrupar transações por mês
    const porMes = {}
    
    for (const transacao of transactions) {
        // Extrair o mês e ano da data
        const data = new Date(transacao.date)
        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const chave = `${ano}-${mes}`
        
        // Formatação bonita do mês
        const mesFormatado = data.toLocaleDateString('pt-PT', {
            month: 'short',
            year: '2-digit'
        })
        
        // Cria objeto do mês se não existir
        if (!porMes[chave]) {
            porMes[chave] = {
                month: mesFormatado,
                receitas: 0,
                despesas: 0
            }
        }
        
        // Adicionar o valor à categoria correta
        if (transacao.type === 'income') {
            porMes[chave].receitas += transacao.amount
        } else {
            porMes[chave].despesas += Math.abs(transacao.amount)
        }
    }
    
    // Passo 2: Converter para array e ordenar cronologicamente
    const dados = Object.entries(porMes).map(([chave, valores]) => ({
        ...valores,
        chave
    }))
    
    dados.sort((a, b) => a.chave.localeCompare(b.chave))
    
    // Passo 3: Calcular o saldo de cada mês
    const resultado = dados.map(item => {
        const saldo = Math.round((item.receitas - item.despesas) * 100) / 100
        
        return {
            month: item.month,
            receitas: item.receitas,
            despesas: item.despesas,
            saldo: saldo
        }
    })
    
    return resultado
}

const chartConfig = {
    receitas: { label: "Receitas", color: "var(--income)" },
    despesas: { label: "Despesas", color: "var(--expense)" },
}

export default function CashFlowChart({ transactions }) {
    const data = buildChartData(transactions)

    if (data.length < 2) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Fluxo de Caixa</CardTitle>
                <CardDescription>Receitas vs Despesas por mês</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradReceitas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--income)" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="var(--income)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradDespesas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--expense)" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                            tickFormatter={(v) => `${v}`}
                            width={40}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                            type="monotone"
                            dataKey="receitas"
                            stroke="var(--income)"
                            strokeWidth={2}
                            fill="url(#gradReceitas)"
                        />
                        <Area
                            type="monotone"
                            dataKey="despesas"
                            stroke="var(--expense)"
                            strokeWidth={2}
                            fill="url(#gradDespesas)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

CashFlowChart.propTypes = {
    transactions: PropTypes.array.isRequired,
}
