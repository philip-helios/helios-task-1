import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/responsive.css'
import '../../Styles/style.css'


const Details = () => {

    const [data, setData] = useState([]);
    const [existArr, setExistArr] = useState([]);
    const [refreshKey,setRefreshKey] = useState(0);
    const { id } = useParams();

    const navigate = useNavigate();

    
    useEffect(()=> {

        const parsedArr = JSON.parse(localStorage.getItem("information"));
        setExistArr(parsedArr);
        const filtered = parsedArr.filter(fd=> fd.id === id);
        setData(filtered);

    },[refreshKey])
    

    const handleDelete = (id) => {
       
        const filtered = existArr.filter(entry => entry.id !== id);
        localStorage.setItem('information', JSON.stringify(filtered));
        navigate("/");
    }

    const handleEdit = () => {
        const form = document.getElementById("editForm");
        form.classList.remove("d-none");
        console.log("clicked")
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        
        handleUpdate(name,contact);

        setRefreshKey(oldKey=> oldKey+ 1)
    }

    const handleUpdate = (name,contact) => {
         
        const filtered = existArr.findIndex(obj=> obj.id === id);
        existArr[filtered].name = name;
        existArr[filtered].contact = contact;
        
        localStorage.setItem('information',JSON.stringify(existArr));
    }
   
    return (
        <div className='details-table table'>
            <h2>Record Book</h2>
            <div className="tr">
                <div className='dt-table-th'>Name</div>
                <div className='dt-table-th'>Contact</div>
                <div className='dt-table-th'>Edit</div>
                <div className='dt-table-th'>Delete</div>
            </div>          
            { 
              data.map(rc=>
                <div className="tr" key={rc.id}>
                    <div className='dt-table-td'>{rc.name}</div>
                    <div className='dt-table-td'>{rc.contact}</div>
                    <div className='dt-table-td'><button onClick={handleEdit} className='btn green'>Edit</button></div>                    
                    <div className='dt-table-td'><button onClick={()=> handleDelete(`${id}`)} className='btn red'>Delete</button></div>                       
                </div> 
                )          
            }
            {
                data.map(rc=>
                    <form key={rc.id} onSubmit={handleSubmit} className='contact-form d-none' id="editForm">
                        <h2>Edit Information</h2> 
                        <div className='form-wrapper'>
                            <div className='form-control'>
                                <label htmlFor ="name">Name</label>
                                <input type ="text" name="name" defaultValue={rc.name}/>
                            </div>
                            <div className='form-control'> 
                                <label htmlFor ="contact">Contact</label>
                                <input type = "text" name="contact" defaultValue={rc.contact}/>
                                <p className='text-error'></p>
                            </div>
                            <div>
                            <input  className="form-button"
                                type="submit"
                                value="Submit"/>
                            </div>
                        </div>
                    </form>
                    )
            }                               
        </div>
    );
};

export default Details;