import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() =>{
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const name = localStorage.getItem('name')
        const designation = localStorage.getItem('designation')
        return token ? { token, role, name, designation } : null
    })

    const login = (data) =>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('name', data.name)
        localStorage.setItem('designation', data.designation || '')
        setUser(data)
    }

    const logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        localStorage.removeItem('designation')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}