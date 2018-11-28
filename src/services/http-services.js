import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '@/stores';
import { urlApi } from '@/configs';
import { validateHelpers as validate } from "@/utils/validate-helpers";

Vue.use(VueAxios, axios);

export class HttpServices {

  constructor() {
    throw new Error('Não é possivel criar instâncias de HttpServices!');
  }

  static get(uri) {

    const obj = {
      uri: uri,
      method: 'get'
    };

    return HttpServices._http(obj);
  }

  static post(uri, data) {

    HttpServices._checkIsObject(data);

    const obj = {
      uri: uri,
      method: 'post',
      data: data
    };

    return HttpServices._http(obj);

  }

  static put(uri, data) {

    HttpServices._checkIsObject(data);

    const obj = {
      uri: uri,
      method: 'put',
      data: data
    };

    return HttpServices._http(obj);
  }

  static delete(uri) {

    const obj = {
      uri: uri,
      method: 'delete'
    };

    return HttpServices._http(obj);

  }

  static _checkIsObject(data) {

    let text = 'Variable data is not Objetc {}';

    if (!data)
      throw new Error(text);

    if (!validate.isObject(data))
      throw new Error(text);

  }

  static _urlFull(obj) {

    if (!obj.uri)
      throw new Error('Informe a URI da API');

    return `${urlApi}/${obj.uri.toString().replace(/^\//g, "")}`;

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

  static _http(obj) {

    return new Promise((resolve, reject) => {

      Vue.axios({
        method: obj.method ? obj.method : 'get',
        url: HttpServices._urlFull(obj),
        data: obj.data ? obj.data : "",
        headers: HttpServices._authorizationBearer()
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      });

    });

  }

}
