import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiEndPoint;

export function getBooks(queryString) { 
   const endPoint =  apiEndPoint + queryString;
    console.log("getBooks", endPoint);
    return http.get(endPoint);
 }

 export function getNextPage(url) {
    console.log(url);
    return http.get(url);
 }