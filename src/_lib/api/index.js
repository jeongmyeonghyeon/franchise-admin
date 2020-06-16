import axios from 'axios';

export default axios.create({
  baseURL: 'https://jngmnghn-nodebird.s3.ap-northeast-2.amazonaws.com',
})