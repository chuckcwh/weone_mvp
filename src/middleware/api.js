import axios from 'axios';
// import { store } from '../app.js';
// import {
//   openModalPopupGeneralError,
//   networkErr,
//   userDeactivated,
//   closeModalPageLoader,
//   logout,
// } from '../actions';
import { baseURL, apiKey } from './config';

// replace vars in url with input data
function newEndpoint(inputVars) {
  const endpointWords = inputVars.endpoint.split('/');
  return endpointWords.reduce((result, word) => {
    if (!word) {
      return result;
    }
    if (word.indexOf(':') === 0 && inputVars.params) {
      const search = (word, data) => {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          if (word === `:${keys[i]}`) {
            return data[keys[i]];
          }
        }
        return '';
      };
      const replacement = search(word, inputVars.params);
      if (replacement) {
        return `${result}/${replacement}`;
      }
    }
    return `${result}/${word}`;
  }, '');
}

// dispatch action and return fetch success / failure
function fetchReturn(dispatch, type, params, APIReturn, onNext, onFail) {
  return APIReturn.then(res => {
    dispatch({
      response: res,
      params,
      type
    });

    return onNext && onNext();
  }).catch(err => {
    dispatch({
      response: {
        error: err.response && err.response.data,
        status: err.response && err.response.status
      },
      params,
      type
    });

    return onFail && onFail(err);
  });
}

export const fetchData = (inputVars, onNext, onFail) => dispatch => {
  const { type } = inputVars;

  // replace vars in url with input data
  const newUrl = `${baseURL}${newEndpoint(inputVars)}?api_key=${apiKey}`;

  let APIReturn;
  // if (AUTH) {
  //   axios.defaults.headers.common.Authorization = `Bearer ${AUTH}`;
  // }

  if (['get', 'post', 'put', 'delete'].indexOf(inputVars.method) > -1) {
    APIReturn = axios[inputVars.method](newUrl, inputVars.params);
  }

  // dispatch action and return fetch success / failure
  return fetchReturn(
    dispatch,
    type,
    inputVars.params,
    APIReturn,
    onNext,
    onFail
  );
};
