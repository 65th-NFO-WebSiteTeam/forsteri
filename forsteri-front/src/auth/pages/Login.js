import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../App';

const Login = ({ isLoggedIn, onLogin, onSetIsStaff}) => {
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
      console.log('cookiesaved');

      // ログイン成功時にisStaff情報を取得
      let isStaff = false;
      try {
        const isStaffResponse = await axios.get(`${apiURL}isstaff/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${response.data.access}`
          },
        });
        console.log(isStaffResponse.data.is_staff);
        isStaff = isStaffResponse.data.is_staff;
      } catch (error) {
        console.log('Failed to fetch is_staff');
      }
      
      onLogin(true); // ログイン成功時にisLoggedInを更新
      onSetIsStaff(isStaff); // ログイン成功時にisStaffを更新

      navigate('/'); // 正しいページにリダイレクト
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('miss');
        alert('EmailかPasswordが違います');
      } else {
        console.log('Failed to login');
      }
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
