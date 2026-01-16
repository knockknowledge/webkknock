import axios from 'axios';

export const postFormData = async (endpoint: any, formData: any) => {
  const response = await axios.post(endpoint, {formData});
  return response.data;
};
