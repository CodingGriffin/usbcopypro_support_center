import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import qs from "qs"

const host = import.meta.env.VITE_SERVER_BASE_URL;
const liveHost = `${window.location.protocol}//${window.location.host}/`;

const axiosClient = axios.create();

axiosClient.defaults.baseURL = host;
axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.withCredentials = false;

const setTokenHeader = (): void => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
  };
};

const setNoTokenXWWWFormUrlencodedHeader = (): void => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };
};

const setNoTokenHeader = (): void => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const setFormHeader = (): void => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "multipart/form-data",
    authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
  };
};

export async function getCustomRequest(URL: string): Promise<AxiosResponse> {
  return await axios.get(`/${URL}`);
}

export async function getRequestNoToken(URL: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setNoTokenHeader();
  return await axiosClient.get(`/${URL}`, options);
}

export async function getRequest(URL: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setTokenHeader();
  return await axiosClient.get(`/${URL}`, options);
}

export async function getFileDownload(URL: string): Promise<AxiosResponse> {
  return await axios.get(
    host,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
      },
      responseType: "blob",
    }
  );
}

export async function postRequestNoTokenXWWW(URL: string, payload: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setNoTokenXWWWFormUrlencodedHeader();
  return await axiosClient.post(URL, qs.stringify(payload), {
    ...config,
    headers: {
      ...config.headers,
      'Access-Control-Allow-Origin': '*',
    }
  });
}

export async function postRequestNoToken(URL: string, payload: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setNoTokenHeader();
  return await axiosClient.post(`/${URL}`, payload, config);
}

export async function postRequest(URL: string, payload: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setTokenHeader();
  return await axiosClient.post(`/${URL}`, payload, config);
}

export async function postRequestWithForm(URL: string, payload: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  setFormHeader();
  return await axiosClient.post(`/${URL}`, payload, config);
}

export async function putRequest(URL: string, payload: any): Promise<AxiosResponse> {
  setTokenHeader();
  return await axiosClient.put(`/${URL}`, payload);
}

export async function putRequestWithForm(URL: string, payload: any): Promise<AxiosResponse> {
  setFormHeader();
  return await axiosClient.put(`/${URL}`, payload);
}

export async function patchRequest(URL: string, payload: any): Promise<AxiosResponse> {
  setTokenHeader();
  return await axiosClient.patch(`/${URL}`, payload);
}

export async function deleteRequest(URL: string): Promise<AxiosResponse> {
  setTokenHeader();
  return await axiosClient.delete(`/${URL}`);
}
