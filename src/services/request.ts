import axios from 'axios';

export const postFormData = async (endpoint: any, formData: any) => {
  try {
    const response = await axios.post(endpoint, {formData});
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
