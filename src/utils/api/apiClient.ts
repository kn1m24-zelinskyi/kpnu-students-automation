import request from './request';

export default class ApiClient {
  private _endpoint: string;
  private headers: object;
  private payload: unknown;

  get endpoint() {
    return this.endpoint;
  }

  set endpoint(endpoint: string) {
    this._endpoint = endpoint;
  }
  constructor(endpoint: string, headers?: object, payload?: object) {
    this._endpoint = endpoint;
    this.headers = headers || {};
    this.payload = payload || {};
  }

  async get({ params = {}, headers = {} }: { params?: unknown; headers?: object }): Promise<any> {
    try {
      const response = await request.get(this._endpoint, {
        headers: { ...this.headers, ...headers },
        params,
      });
      return response;
    } catch (error) {
      console.error(`Error while sending GET request: `, error.message);
      return undefined;
    }
  }

  async post(payload?: object, headers?: object) {
    try {
      const response = await request.post(this._endpoint, payload || this.payload, { headers: { ...this.headers, ...headers } });
      return response;
    } catch (error) {
      console.error(`Error while sending POST request: `, error.message);
      return undefined;
    }
  }

  async put(payload?: object, headers?: object): Promise<any> {
    try {
      const response = await request.put(this._endpoint, payload || this.payload, {
        headers: { ...this.headers, ...headers },
      });
      return response.data;
    } catch (error) {
      console.error(`Error while sending PUT request: `, error.message);
    }
  }

  async delete({ params = {}, headers = {} }: { params?: object; headers?: object }) {
    try {
      const response = await request.delete(this._endpoint, {
        headers: { ...this.headers, ...headers },
        params,
      });
      return response;
    } catch (error) {
      console.error(`Error while sending DELETE request: `, error.message);
    }
  }

  async getAuthToken(credentials: { email: string; password: string }) {
    try {
      const token = (await this.post({ username: credentials.email, password: credentials.password })).data;
      console.log('Token received successful');
      return token;
    } catch (error) {
      console.error('Error', error.message);
      return undefined;
    }
  }
}
