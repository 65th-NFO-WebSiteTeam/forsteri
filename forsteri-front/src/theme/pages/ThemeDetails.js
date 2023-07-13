import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getThemeDetail } from '../api/getTheme';
import { voteTheme } from '../api/voteTheme';

export const ThemeDetail = () => {
  const initialState = {
    theme: '',
    comment: '',
  };

  const [detail, setDetail] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getThemeDetail(id)
      .then((d) => {
        setDetail(d);
        setLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [id]);

  const handleVote = async () => {
    try {
      const data = await voteTheme(id);
      alert(data.message); // バックエンドからの投票結果メッセージを表示
    } catch (error) {
      alert(error.message); // エラーメッセージを表示
    }
  };

  return (
    <div>
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <div className="detailwrapper">
          <h1>{detail.theme}</h1>
          <div className="detail-theme-wrapper">
            <div className="detail-theme">趣意文</div>
          </div>
          <div className="detail-content">{detail.comment}</div>
          <div className='logout-wrapper'>
            <button className='button-submit set-center' onClick={handleVote}>投票</button>
          </div>
        </div>
      )}
    </div>
  );
};


