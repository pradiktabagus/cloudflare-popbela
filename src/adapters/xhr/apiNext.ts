import Axios from 'axios';

const baseURL = process.env.nextBaseUrl;
const apinext = Axios.create({
  baseURL,
});
export { apinext };
