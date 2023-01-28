import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/style.scss'
import Form from '../Utils/Form/FormDeafult';


const Details = () => {
    const [data, setData] = useState([]);
    const [refreshKey,setRefreshKey] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    // regex value for validating phone and contact
    let regexName = /^[A-Za-z]+[A-Z a-z]*$/;
    let regexPhone = /^(\+88|88)?(01[3-9]\d{8})$/;

    useEffect(()=> {
        const parsedArr = JSON.parse(localStorage.getItem("information"));
        const filtered = parsedArr.filter(fd=> fd.id === id);
        setData(filtered);
    },[id,refreshKey])
    
    const handleDelete = (id) => {
        const records = JSON.parse(localStorage.getItem("information"))
        const filtered = records.filter(fd=> fd.id !==id);
        localStorage.setItem('information', JSON.stringify(filtered));
        navigate("/");
    }

    const handleEdit = () => {
        const form = document.getElementById("editForm");
        form.classList.remove("d-none");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        if(regexName.test(name) && regexPhone.test(contact)){
            handleUpdate(name,contact); 
            form.reset(""); 
            setRefreshKey(oldKey=> oldKey+ 1)
        }             
    }

    const handleUpdate = (name,contact) => {
        const records = JSON.parse(localStorage.getItem("information"));
        const filtered = records.findIndex(fd => fd.id === id); 
        records[filtered].name=name;
        records[filtered].contact=contact;
        localStorage.setItem('information',JSON.stringify(records));
    }
   
    return (
        <div className='details-table table'>
            <h2>Record Book</h2>
            <div className="table" id="results">
                <div className='theader'>
                    <div className='table_header'>Name</div>
                    <div className='table_header'>Contact</div>
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
                            <div className='table_cell th-sm-bg'>Edit</div>
                            <div className='table_cell'><button onClick={handleEdit} className='btn edt-btn'>Edit</button></div>
                        </div> 
                        <div className='table_small'>
                            <div className='table_cell th-sm-bg'>Delete</div>
                            <div className='table_cell'><button onClick={()=> handleDelete(`${id}`)} className='btn dlt-btn'>Delete</button></div>
                        </div>          
                    </div>
                    )
                }         
            </div>
            {
                data.map(rc=>
                    <form key={rc.id} onSubmit={handleSubmit} className='form-container d-none' id="editForm">
                        <Form 
                            defaultName={rc.name}
                            defaultContact={rc.contact}
                        ></Form>
                    </form>
                    )
            }                               
        </div>
    );
};

export default Details;