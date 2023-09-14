import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";


@Injectable({
  providedIn: 'root'
})
export class PokemonServiceBase{

  constructor(private http: HttpClient) {}

  private getContext(urlEndPoint: string,external:boolean, endpointPort?: number, security?: boolean): string {
    let context: string = urlEndPoint;
    if (!environment.proxy && !external) {
        context = (security ? environment.urlBaseSecurity + ':' + endpointPort : environment.urlBase + ':' + endpointPort) + urlEndPoint;
    }
    console.log(context)
    return context;
  }

  get(urlEndPoint: string,external: boolean, endpointPort?: number): Observable<any> {
    return this.http.get(this.getContext(urlEndPoint, external, endpointPort), { observe: 'response' });
  }

  post(urlEndPoint: string, body: any,external: boolean, endpointPort?: number, security?: boolean): Observable<any> {
    return this.http.post(this.getContext(urlEndPoint,external, endpointPort, security), body, { observe: 'response' });
  }

  put(urlEndPoint: string, body: any,external: boolean, endpointPort?: number): Observable<any> {
    return this.http.put(this.getContext(urlEndPoint,external, endpointPort), body, { observe: 'response' });
  }

  delete(urlEndPoint: string,external: boolean, endpointPort?: number): Observable<any> {
    return this.http.delete(this.getContext(urlEndPoint,external, endpointPort), { observe: 'response' });
  }

  getSuiteServices(): Promise<any> {
    const JSON = '../assets/res/suite.services.json';
    return new Promise((resolve, reject) => {
      this.http.get(JSON, { observe: 'response' })
        .subscribe({
          next: (data) => resolve(data.body),
          error: (error) => reject(error)
       });
    }
    );
  }

}
