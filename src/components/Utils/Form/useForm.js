import { useEffect, useState} from 'react';
import validateInput from './validateInput';
import { v4 as uuidv4 } from 'uuid';

const useForm = () => {
  const [error,setError] = useState();
  const [errorCount,setErrorCount] = useState();
  const [data, setData] = useState([]);
  const intialValue= { name:"",contact:""}
  const [values, setValues] = useState((intialValue))
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,  
      [name]: value,
    });
  };

  // get data from local storage
  const getData = () => {
    const parsedArr = JSON.parse(localStorage.getItem("information"));    
    setData(parsedArr);  
  }

    useEffect(()=> {
        getData();
    },[])
  
  // Add Record  
  const handleAddRecord = (e) => {
      e.preventDefault();
      if(errorCount===0){
      const person = {
          id: uuidv4(),
          name:values.name,
          contact:values.contact
      }
      // create a new array and push data as object in new array
      if(!data){
          let newData = [];
          newData.push(person)
          localStorage.setItem('information', JSON.stringify(newData));
      }
      // push data to existing array
      else {
          const existData = JSON.parse(localStorage.getItem("information"));
          existData.push(person);
          localStorage.setItem('information', JSON.stringify(existData));         
          getData();
      }   
    }
    else {
      alert("Please provide a valid input")
    }
  } 

  // handleUpdate
   const handleUpdate = (id,e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    console.log(name);
    const records = JSON.parse(localStorage.getItem("information"));
    const filtered = records.findIndex(fd => fd.id === id); 
    if(errorCount===0){
    records[filtered].name=name;
    records[filtered].contact=contact;
    localStorage.setItem('information',JSON.stringify(records));
    }
    else{
      alert("Please provide a valid input")
    }
}

  
 useEffect(()=>{
    const error = validateInput(values);
    setError(error);
    const countError = Object.keys(error).length;
    setErrorCount(countError);
 },[values])


  return { handleChange,error,values,handleAddRecord,handleUpdate};
};

export default useForm;