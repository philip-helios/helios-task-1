import { useEffect, useState} from 'react';
import validateInput from './validateInput';


const useForm = () => {
  const [error,setError] = useState();
  const [isValid,setIsValid] = useState();
  const [values, setValues] = useState({
    name: '',
    contact: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

 useEffect(()=>{
    const { errors,valid } = validateInput(values);
    setError(errors);
    setIsValid(valid);
 },[values])


  return { handleChange,error,isValid};
};

export default useForm;