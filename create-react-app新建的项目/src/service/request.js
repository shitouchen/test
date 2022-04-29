import axios from 'axios';

export const instance = axios.create({})

// console.log('++++++++++___________________', process.env)
// 详细配置：http://www.axios-js.com
// instance.interceptors.request.use(
//   (config) => {
//     config.headers.token = sessionStorage.getItem('token');
//     console.log('1', config)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     console.log('2', response)
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

const Request = (url, data = {}, type = 'GET', config = {}) => {
  return new Promise((resolve, reject) => {
    let promise;
    switch (type) {
      case 'GET':
        promise = instance.get(url, { params: data });
        break;
      case 'POST':
        promise = instance.post(url, data, config);
        break;
      case 'PUT':
        promise = instance.put(url, data, config);
        break;
      case 'DELETE':
        promise = instance.delete(url, { params: data });
        break;
      default:
        promise = axios.get(url, { params: data })
    }
    promise.then(response => {
      if (response.data && response.status === 200)
        resolve(response.data)
    }).catch(error => {
      console.log('request -> error', url, error)
      return reject(error)
    })
  })
}

export default Request