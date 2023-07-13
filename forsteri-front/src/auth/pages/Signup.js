import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../App';

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignup = async (data) => {
    try {
      const response = await axios.post(`${apiURL}signup/`, {
        email: data.email,
        name: data.name,
        password: data.password,
      });
      console.log(response.data);
      alert('ユーザーが作成されました');
      navigate('/login');
    } catch (error) {
      console.log('error', error);
      alert('ユーザーの作成に失敗しました');
    }
  };

  return (

        <div className="signup-wrapper">
        <form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
            <label htmlFor="email">Email:</label>
            <input className="form-control" type="email" {...register('email', { required: true })} />
            {errors.email && <span className="error">Emailを入力してください</span>}<br/>

            <label htmlFor="name">Name:</label>
            <input className="form-control" type="text" {...register('name', { required: true })} />
            {errors.name && <span className="error">名前を入力してください</span>}<br/>

            <label htmlFor="password">Password:</label>
            <input className="form-control" type="password" {...register('password', { required: true })} />
            {errors.password && <span className="error">パスワードを入力してください</span>}<br/>

            <input className="button-submit" type="submit" value="Signup" />
        </form>
        </div>

  );
};

export default Signup;

