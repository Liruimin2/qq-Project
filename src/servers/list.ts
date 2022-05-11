import { request } from "@/utils/request";
export interface listResult{
  qq:string,
  name:string,
  qlogo:string
}
export interface ListReq{
  qq:string
}
export function apiGetList(params:ListReq) {
  return request<listResult>({
    method: 'GET',
    url: 'https://api.uomg.com/api/qq.info',
    params,
  });
}