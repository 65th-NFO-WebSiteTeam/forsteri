import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const voteTheme = async (id) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/theme/vote/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('accesstoken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('投票に失敗しました');
    }
  }
};

