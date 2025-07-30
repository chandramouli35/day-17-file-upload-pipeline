import axios from "axios";

export const uploadFiles = (formData) =>
  axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    // Add this if needed: maxRedirects: 0, httpAgent: new (require('http')).Agent({ family: 4, maxVersion: '1.1' }),
  });
