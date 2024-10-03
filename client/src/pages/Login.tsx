import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error state

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on new submit
    setLoading(true); // Start loading

    if (!loginData.username || !loginData.password) {
      setError('Username and password are required');
      setLoading(false);
      return;
    }

    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            className='form-input'
            type='text'
            id='username'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
            disabled={loading} // Disable input during login
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-input'
            type='password'
            id='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
            disabled={loading} // Disable input during login
          />
        </div>
        {error && <p className='error-message'>{error}</p>} {/* Display error message */}
        <div className='form-group'>
          <button className='btn btn-primary' type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
