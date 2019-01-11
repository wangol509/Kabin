
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Angular2TokenService } from 'angular2-token';
import { AppSettings } from './app-settings';


@Injectable()
export class GenericProvider {

  constructor(public http: Http, private tokenService: Angular2TokenService) {

  }


  // web api service
  public getData(uri: string): Observable<Object[]> {
    let url = AppSettings.URL_BASE + uri;
    return this.http.get(`${url}`)
      .map(res => <Object[]>res.json());
  }

  public update(body: Object, uri: string): Observable<Response> {
    let bodyStr = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log("update data..");
    let url = AppSettings.URL_BASE + uri;
    return this.http.put(
      url,
      bodyStr,
      { headers: headers }
    );
  }

  /*
     Add an object and return an other object
  */
  public add(body: Object, uri: string): Observable<Object[]> {
    let bodyStr = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = AppSettings.URL_BASE + uri;
    return this.http.post(
      url,
      bodyStr,
      { headers: headers }
    ).map(res => <Object[]>res.json());
  }

  /*
     Add an object and return a string
  */
  public addObj(body: Object, uri: string): Observable<Response> {
    let bodyStr = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = AppSettings.URL_BASE + uri;
    return this.http.post(
      url,
      bodyStr,
      { headers: headers }
    );
  }

  public login(body: Object, uri: string): Observable<Object> {
    let bodyStr = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let url = AppSettings.URL_BASE + uri;
    return this.http.post(
      url,
      bodyStr,
      { headers: headers }
    ).map(res => <Object>res.json());
  }

  public deleteObj(id: string, uri): Observable<Response> {
    let url = AppSettings.URL_BASE + uri + "/" + id;
    return this.http.delete(`${url}`);
  }

  //upload image
  upload(formData, uri) {

    if (formData == null || formData == undefined) {
      console.log("no data pass");
    } else {
      console.log(" form data: ", formData);
    }

    let headers = this.tokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = new RequestOptions({ headers: headers });
    let url = AppSettings.URL_BASE + "/file/upload/" + uri;
    return this.tokenService.request({
      method: 'post',
      url: url,
      body: formData,
      headers: options.headers
    }).map(res => res.json());
  }
}

