import axios from 'axios';

export const postFormData = async <
  TPayload extends Record<string, unknown>,
  TResponse = unknown,
>(
  endpoint: string,
  formData: TPayload,
) => {
  const response = await axios.post<TResponse>(endpoint, {formData});
  return response.data;
};
