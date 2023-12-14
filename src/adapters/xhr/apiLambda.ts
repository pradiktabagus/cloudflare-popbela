import Axios from 'axios';
import https from 'https';

const baseApiURL = process.env.apiBaseUrl;
const xApiKey = process.env.apiKey;

const apiLambda = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: process.env.APP_ENV !== 'development',
  }),
  baseURL: baseApiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

apiLambda.defaults.headers.common = {
  'x-api-key': xApiKey ?? '',
};
export { apiLambda };
