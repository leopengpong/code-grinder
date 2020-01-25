import axios from 'axios';


const BASE_URL = 'http://localhost:3000/api/';



export const get = async path => {
  console.log('sending  GET:  ' + path);
  const result = await axios({
    method: 'get',
    url: `${BASE_URL}${path}`
  });
  console.log('received GET:  ' + path);
  console.log(result);

  return result;
};

export const post = async (path, body) => {
  console.log('sending  POST: ' + path + ', ' + body);
  const result = await axios({
    method: 'post',
    url: `${BASE_URL}${path}`,
    data: body
  });
  console.log('received POST: ' + path + ', ' + body);
  console.log(result);

  return result;
};

export const deleteMethod = async (path) => {
  console.log('sending  DEL:  ' + path);
  const result = await axios({
    method: 'delete',
    url: `${BASE_URL}${path}`,
  });
  console.log('received DEL:  ' + path);
  console.log(result);

  return result;
};