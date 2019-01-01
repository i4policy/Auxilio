import Request from './request';
import { API_ROOT } from '.';

const PATH = '/Containers';

const ContainerAPI = {
  get(bucket, fileName) {
    return Request.get(`${API_ROOT}${PATH}/${bucket}/download/${fileName}`, {
      responseType: 'blob'
    });
  }
};

export default ContainerAPI;
