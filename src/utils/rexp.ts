export function qqIsRight(value:string){
  return(/^[1-9]\d{4,9}$/.test(String(value))) ? true : false;
}