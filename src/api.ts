import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const uploadPost = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${BASE_URL}/posts/`, formData);
};

export const listPosts = async () => {
  // Assuming all filenames are retrievable by reading the mdx folder (optional endpoint if you add)
  const res = await axios.get('/posts-list.json'); // placeholder
  return res.data;
};

export const deletePost = async (filename: string) => {
  return axios.delete(`${BASE_URL}/posts/${filename}`);
};

export const getPost = async (filename: string) => {
  return axios.get(`${BASE_URL}/posts/${filename}`);
};
