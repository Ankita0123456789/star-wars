import axios from "axios";
import { url } from "inspector";

const fetcher = async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    if (res){
        return res.json();
    }
    
  };
  

export default fetcher;  

