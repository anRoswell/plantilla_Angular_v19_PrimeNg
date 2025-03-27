export default function Sleep(ms:number):Promise<any>{
    return new Promise(resolve => setTimeout(resolve, ms));
}