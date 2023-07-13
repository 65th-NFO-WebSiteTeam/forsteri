import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getThemeDetailStaff } from '../api/getTheme';

export const StaffThemeDetail = () => {
  const initialState = {
    theme: '',
    comment: '',
    votes: 0
  };

  const [detail, setDetail] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getThemeDetailStaff(id)
      .then((d) => {
        setDetail(d);
        setLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <div className='detailwrapper'>
          <h1>{detail.theme}(id={detail.id})</h1>
          <div className='detail-theme-wrapper'>
            <div className="detail-theme">趣意文</div>
          </div>
          <div className="detail-content">{detail.comment}<br/>votes:{detail.votes}</div>
        </div>
        
      )}
    </div>
  );
};
