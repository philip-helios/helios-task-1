import { useEffect, useState} from 'react';
import validateInput from './validateInput';
import useData from './useData';

const useForm = () => {
const [error,setError] = useState();
const [errorCount,setErrorCount] = useState();
const intialValue= { name:"",contact:""}
const [values, setValues] = useState((intialValue))
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,  
      [name]: value,
    });
  };
  
 useEffect(()=>{
    const error = validateInput(values);
    setError(error);
    const countError = Object.keys(error).length;
    setErrorCount(countError);
 },[values])


  return { handleChange,error,values,errorCount};
};

export default useForm;