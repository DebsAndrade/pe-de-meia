import { useContext } from 'react'
import { Sun, Moon, Coins, User } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { PreferencesContext } from '../context/PreferencesContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Settings() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { currency, setCurrency, userName, setUserName } = useContext(PreferencesContext)

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-foreground">Definições</h2>

            {/* Tema */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        {theme === 'dark' ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
                        <CardTitle className="text-base">Aparência</CardTitle>
                    </div>
                    <CardDescription>
                        Tema atual: <strong>{theme === 'light' ? 'Claro' : 'Escuro'}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" onClick={toggleTheme} className="gap-2">
                        {theme === 'light'
                            ? <><Moon className="h-4 w-4" /> Mudar para Escuro</>
                            : <><Sun className="h-4 w-4" /> Mudar para Claro</>
                        }
                    </Button>
                </CardContent>
            </Card>

            {/* Moeda */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">Moeda Preferida</CardTitle>
                    </div>
                    <CardDescription>
                        Selecionada: <strong>{currency}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value="EUR">EUR — Euro (€)</option>
                        <option value="USD">USD — Dólar ($)</option>
                        <option value="GBP">GBP — Libra (£)</option>
                        <option value="BRL">BRL — Real (R$)</option>
                    </select>
                </CardContent>
            </Card>

            {/* Nome */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">O teu nome</CardTitle>
                    </div>
                    {userName && (
                        <CardDescription>
                            Olá, bem-vindo de volta, <strong>{userName}</strong>!
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label htmlFor="username">Nome</Label>
                        <Input
                            id="username"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Como te chamas?"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
