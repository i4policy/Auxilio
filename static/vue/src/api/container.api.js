import Request from './request';
import { API_ROOT } from '.';

const PATH = '/Containers';

const ContainerAPI = {
  get(bucket, fileName) {
    return Request.get(`${API_ROOT}${PATH}/${bucket}/download/${fileName}`, {
      responseType: 'blob'
    });
  },
  upload(bucket, data) {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    return Request.post(`${API_ROOT}${PATH}/${bucket}/customUpload`, data, config);
  }
};

export default ContainerAPI;
