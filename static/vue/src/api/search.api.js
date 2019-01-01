import { API_ROOT } from '.';
import Request from './request';

const PATH = '/Search';

const SearchAPI = {
  search(q) {
    return Request.get(`${API_ROOT}/${PATH}/testSearch`, {
      params: { q }
    });
  }
};

export default SearchAPI;
