import { useEffect, useState } from "react";

const useData = () => {
    const [data,setData] = useState([])
    useEffect(()=> {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);  
       
    },[])

    return [data]
};

export default useData;