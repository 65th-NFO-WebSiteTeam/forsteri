import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../App';

const Login = ({ isLoggedIn, onLogin }) => {  {/* isLoggedInステートとonLoginコールバックを受け取る */}
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies();
  const { register, handleSubmit, errors } = useForm();

  const handleLogin = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${apiURL}auth/jwt/create/`, {
        email: data.email,
        password: data.password,
      });
      console.log(response.data.access);
      setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
      setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
      console.log("cookiesaved")
      onLogin(true); // ログイン成功時にログイン状態を更新
      navigate('/');
    } catch (error) {
      console.log('miss');
      alert('EmailかPasswordが違います');
    }
  };

  if (isLoggedIn) {
    // ログイン済みの場合に表示するコンポーネントや要素
    return <div>ログイン済みです</div>;
  }

  return (
    <div className="top-wrapper">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor="email">Email：</label>
          <input className="form-control" {...register('email')} />
          <br />
          <label htmlFor="password">PassWord：</label>
          <input className="form-control" type="password" {...register('password', { required: true })} />
          <br />
          <input className="button-submit" type="submit" value="ログイン" />
        </form>
      </div>
    </div>
  );
};

export default Login;
