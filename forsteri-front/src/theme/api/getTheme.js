import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const toJson = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

// テーマ一覧を取得
export const getTheme = async () => {
  try {
    const response = await axios.get('http://localhost:8000/theme/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    });
    return toJson(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// テーマ一覧を取得(スタッフ)
export const getThemeStaff = async () => {
  try {
    const response = await axios.get('http://localhost:8000/theme/staff/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    });
    return toJson(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// テーマの詳細を取得
export const getThemeDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/theme/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    });
    return toJson(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// テーマの詳細を取得
export const getThemeDetailStaff = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/theme/staff/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    });
    return toJson(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// フォームを取得
export const getThemeForm = async () => {
  try {
    const response = await axios.get('http://localhost:8000/theme/form/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`
      }
    });
    return toJson(response);
  } catch (error) {
    throw new Error(error.message);
  }
};
