import React, { useState, useEffect } from 'react';
import { getThemeStaff } from '../api/getTheme';
import { ThemeContent } from '../components/ThemeContent';
import { StaffThemeContent } from '../components/StaffThemeContent';
import { Link } from 'react-router-dom';

export const StaffThemeTop = ({ isStaff }) => {
  const initialState = {
    id: '',
    theme: '',
    comment: '',
  };

  const [theme, setTheme] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThemeStaff()
      .then((d) => {
        setTheme(d);
        setLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  return (
    <div>
      <h1 className="theme-title">テーマ一覧</h1>

      {!isStaff && (
        <div className="theme-content">
          <Link to="/theme/form">
            <h1>Submit Themes</h1>
          </Link>
        </div>
      )}
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          {theme.map((d) =>
            isStaff ? (
              <StaffThemeContent key={d.id} {...d} />
            ) : (
              <ThemeContent key={d.id} {...d} />
            )
          )}
        </div>
      )}
    </div>
  );
};
