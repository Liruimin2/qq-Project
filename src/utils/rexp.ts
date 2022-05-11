export function qqIsRight(value:string){

var qqReg=/[1-9][0-9]{4,}/;

return qqReg.test(value)  

}