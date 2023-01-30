import { useEffect, useState } from "react";

const useData = () => {
    const [data,setData] = useState([])
    const getData = () => {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);  
    }
 
    useEffect(()=> {
        getData();
    },[])

    return [data]
};

export default useData;