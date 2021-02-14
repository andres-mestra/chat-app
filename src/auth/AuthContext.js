import { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";


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

  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken('api/login/new', { nombre, email, password }, 'POST')

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

      return resp.ok;
    }

    if (resp.errors) {
      let msg = '';
      Object.keys(resp.errors).forEach(key => msg += resp.errors[key].msg + ', ')
      return msg;
    }

    return resp?.msg;
  }

  const verificaToken = useCallback(async () => {

    const token = localStorage.getItem('token');
    //Si token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })

      return false;
    }

    const resp = await fetchConToken('api/login/renew');
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

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      })

      return false;
    }

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
