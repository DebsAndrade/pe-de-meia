import { createContext, useState, useEffect, useMemo } from 'react'

export const PreferencesContext = createContext()

export function PreferencesProvider({ children }) {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || 'EUR'
    })

    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || ''
    })

    useEffect(() => {
        localStorage.setItem('currency', currency)
    }, [currency])

    useEffect(() => {
        localStorage.setItem('userName', userName)
    }, [userName])

    const value = useMemo(() => ({ currency, setCurrency, userName, setUserName }), [currency, userName])

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    )
};
