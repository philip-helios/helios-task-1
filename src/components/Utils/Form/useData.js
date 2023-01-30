import { useEffect, useState } from "react";

const useData = () => {
    const [data,setData] = useState([])
    const getData = () => {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);  
    }
 
    useEffect(()=> {
        getData();
    },[data])

    return [data]
};

export default useData;