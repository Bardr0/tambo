import { useState } from "react";
import { publicApi } from "../apis/publicApi";
import { useForm } from "../hooks/useForm";

const LoginPage = () => {

  const { formState, username, clave, onInputChange, onResetForm } = useForm({
    username: '',
    clave: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await publicApi.post('/api/auth/login', formState);
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('refresh_token', response.data.refreshToken);
    } catch (error) {
      const { type, message } = error.response.data;
      if (type === 'unauthorized') {
        alert(message)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <label>Usuario</label>
      <input type="text" name='username' value={username} onChange={onInputChange} autoComplete="off" />
      <br />

      <label>Clave</label>
      <input type="password" name='clave' value={clave} onChange={onInputChange} autoComplete="off" />
      <br />

      <input type="submit" disabled={isLoading} value={isLoading ? 'Cargando...' : 'Login'} />

    </form>
  )
}

export default LoginPage