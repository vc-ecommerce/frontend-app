import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { urlApi } from '@/configs';
import store from '@/stores';

Vue.use(VueAxios, axios);

class AxiosService {

  constructor() {
    this._uri = "";
    this._data = {};
    this._method = "";
    this._auth = {}
  }

  static _authorizationBearer() {
    if (store.getters.getToken) {
      return {
        Authorization: "Bearer " + store.getters.getToken,
        "User-ID": store.getters.getUserId
      }
    }
    return {};
  }

  static _http() {

    if (!this._uri)
      throw new Error('Informe a URI da API')

    const url = urlApi + "/" + this._uri.toString().replace(/^\//g, "");

    return new Promise((resolve, reject) => {

      Vue.axios({
        method: this._method ? this._method : 'get',
        url,
        data: this._data ? this._data : "",
        headers: AxiosService._authorizationBearer()
      }).then(res => {
        resolve(res)
      }).catch(function (error) {
        console.log(error)
        reject(error)
      });

    });

  }

  static get(uri) {
    this._uri = uri;
    this._method = 'get';
    return this._http();
  }

  static post(uri, data) {
    this._method = 'post';
    this._uri = uri;
    this._data = data;
    return this._http();
  }

  static put(uri, data) {
    this._method = 'put';
    this._uri = uri;
    this._data = data;
    return this._http();
  }

  static delete(uri) {
    this._method = 'delete';
    this._uri = uri;
    return this._http();
  }

}

export default AxiosService;
