import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/style.scss'
import FormDefault from '../Utils/Form/FormDeafult';
import { v4 as uuidv4 } from 'uuid';
import validateInput from '../Utils/Form/validateInput';

const Home = () => {    
    const [data,setData] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [values, setValues] = useState({name:"",contact:""});
    const [error,setError] = useState(); 
    const handleChange = (e) => {
        setValues({
        ...values,  
        [e.target.name]: e.target.value,
        });
    };
     
    const getData = () => {
        const parsedArr = JSON.parse(localStorage.getItem("information"));    
        setData(parsedArr);  
    }
    useEffect(()=> {
        const error = validateInput(values)
        setError(error);
        console.log(error.status)
       getData()
    },[values])

   
    const handleAddRecord = (e) => {
        e.preventDefault();
            if(isEdit === true && error.status===true){
                const records = JSON.parse(localStorage.getItem("information"));
                const filtered = records.findIndex(fd => fd.id === values.id);
                const name = document.getElementById("name").value;
                const contact = document.getElementById("contact").value;  
                records[filtered].name=name;
                records[filtered].contact=contact;
                localStorage.setItem('information',JSON.stringify(records));
                getData();
            } 
            else if(isEdit === false && error.status===true){
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
                    getData();
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


    const handleDelete = (id) => {
        const records = JSON.parse(localStorage.getItem("information"))
        const filtered = records.filter(fd=> fd.id !==id);
        localStorage.setItem('information', JSON.stringify(filtered));
        getData();
    }
    
    const handleEdit = (id) => {
        const records = JSON.parse(localStorage.getItem("information"))
        const filtered = records.filter(fd=> fd.id ===id);
        console.log(filtered);
        filtered?.map(rc=>setValues(rc));
        setIsEdit(true);
    }
    return (
        <div className='wrapper-main'>      
            <form id="submit-form" onSubmit={handleAddRecord} className='form-container'>
                <FormDefault
                 handleChange={handleChange}
                 values={values}
                 error={error}
                >
                </FormDefault>      
            </form>
            <h2 className='text-center'>Contact List</h2> 
            <div className="table" id="results">
                <div className='theader'>
                    <div className='table_header'>Name</div>
                    <div className='table_header'>Contact</div>
                    <div className='table_header'>Details</div>
                    <div className='table_header'>Edit</div>
                    <div className='table_header'>Delete</div>
                </div>
                {   
                    data?.map((dt,i)=>
                    <div className='table_row' key = {dt.id}>
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Name</div>
                            <div className='table_cell'>{dt.name}</div>
                        </div>
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Contact</div>
                            <div className='table_cell'>{dt.contact}</div>
                        </div>
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Details</div>
                            <div className='table_cell'><Link to={`contact/${dt.id}`}><button className='btn btn-details'>Details</button></Link></div>
                        </div>
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Edit</div>
                            <div className='table_cell'><button onClick={()=> handleEdit(dt.id)}  className='btn edt-btn'>Edit</button></div>
                        </div> 
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Delete</div>
                            <div className='table_cell'><button onClick={()=> handleDelete(dt.id)} className='btn dlt-btn'>Delete</button></div>
                        </div>               
                    </div>
                    )
                }         
            </div>
        </div>
    );
};

export default Home;
