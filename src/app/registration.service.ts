import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Country } from "./country";
import { State } from "./state";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  addRegistration(formData: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + "/register", formData);
  }

  getCountries() {
    return [
      new Country(1, "India"),
      new Country(2, "Brazil"),
      new Country(3, "USA"),
    ];
  }

  getStates() {
    return [
      new State(1, 1, "Kerala"),
      new State(2, 1, "TamilNadu"),
      new State(3, 1, "Karnadaka"),
      new State(4, 1, "AndraPradesh"),
      new State(5, 2, "Sao Paulo"),
      new State(6, 2, "Rio de Janeiro"),
      new State(7, 2, "Minas Gerais"),
      new State(8, 3, "Arizona"),
      new State(9, 3, "Alaska"),
      new State(10, 3, "Florida"),
      new State(11, 3, "Hawaii"),
    ];
  }

  get windowRef() {
    return window;
  }
}
