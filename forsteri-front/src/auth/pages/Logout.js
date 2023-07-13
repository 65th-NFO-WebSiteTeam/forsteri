import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['accesstoken', 'refreshtoken']);

  const handleLogout = () => {
    // アクセストークンとリフレッシュトークンのクッキーを削除
    removeCookie('accesstoken', { path: '/' });
    removeCookie('refreshtoken', { path: '/' });

    // ログアウト後のリダイレクト先へ移動
    navigate('/');

    // ログアウト時にログイン状態を更新
    onLogout();
  };

  return (
    <div className='logout-wrapper'>
      <button className='button-submit set-center' onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Logout;

