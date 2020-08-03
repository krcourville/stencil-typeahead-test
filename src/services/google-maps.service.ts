import axios, { AxiosInstance } from 'axios';

export class AutocompleteSession {
  constructor(
    private http: AxiosInstance
  ) { }

  public autocomplete(input: string) {
    return this.http
      .get('place/autocomplete/json', {
        params: {
          input
        }
      })
      .then(res => {
        console.log('RES', res);
      })
      .catch(err => {
        console.log('ERROR', err);
      });
  }

}

export class GoogleMapsService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api'
      // params: {
      //   key: 'AIzaSyAGQUXFQnjlzHPDGWY5n9OZnmve7J8JhOw'
      // }
    });
  }

  public getAutocompleteSession(): AutocompleteSession {
    return new AutocompleteSession(this.http);
  }

}

let instance: GoogleMapsService;

export const configure = () => {
  instance = new GoogleMapsService();
};

export const getIntance = () => {
  return instance;
};
