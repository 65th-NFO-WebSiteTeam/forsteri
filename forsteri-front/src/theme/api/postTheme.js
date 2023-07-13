import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const postTheme = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/theme/create/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${cookies.get('accesstoken')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('テーマの投稿に失敗しました');
  }
};
