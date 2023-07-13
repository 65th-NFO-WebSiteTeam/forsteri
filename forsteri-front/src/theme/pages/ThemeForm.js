import React, { useState } from 'react';
import { postTheme } from '../api/postTheme';

export const ThemeForm = () => {
  const initialState = {
    theme: '',
    comment: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // localStorageからトークンを取得
  
    try {
      const response = await postTheme(formData, token);
      console.log('テーマが正常に投稿されました:', response);
      setIsSubmitted(true);
    } catch (error) {
      console.error('テーマの投稿に失敗しました:', error);
    }
  };
  
  return (
    <div className='formwrapper'>
      <h2 className='theme-title'>テーマ投稿</h2>
      {isSubmitted ? (
        <div>
          <p>投稿が完了しました。</p>
          {/* 他の表示やリダイレクトなどの処理を追加 */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className='theme'
            type='text'
            name='theme'
            value={formData.theme}
            onChange={handleChange}
            placeholder='テーマ'
          />
          <br />
          <textarea
            className='content'
            type='text'
            name='comment'
            value={formData.comment}
            onChange={handleChange}
            placeholder='趣意文'
          />
          <br />
          <button className='button-submit' type='submit' id='submit'>
            提出
          </button>
        </form>
      )}
    </div>
  );
};

