import { createContext, useCallback, useState } from "react";
import { fetchSinToken } from "../helpers/fetch";


export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
}

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(initialState)

  const login = async (email, password) => {
    const resp = await fetchSinToken('api/login', { email, password }, 'POST')

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { usuario } = resp
      setAuth({
        uid: usuario.uid,
        name: usuario.nombre,
        email: usuario.email,
        checking: false,
        logged: true,
      })
    }

    return resp.ok;

  }

  const register = (nombre, email, password) => {

  }

  const verificaToken = useCallback(() => {

  }, [])

  const logout = () => {

  }


  return (
    <AuthContext.Provider value={{
      login,
      register,
      verificaToken,
      logout,
      auth,
    }}>
      { children}
    </AuthContext.Provider>
  )
}
