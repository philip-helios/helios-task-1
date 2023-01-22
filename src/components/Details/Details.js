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

    console.log(data)
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
            <div class="table" id="results">
                <div class='theader'>
                    <div class='table_header'>Name</div>
                    <div class='table_header'>Contact</div>
                    <div class='table_header'>Edit</div>
                    <div class='table_header'>Delete</div>
                </div>
                {   
                    data?.map((dt,i)=>
                    <div class='table_row' key = {dt.id}>
                        <div class='table_small'>
                            <div class='table_cell th-sm-bg'>Name</div>
                            <div class='table_cell'>{dt.name}</div>
                        </div>
                        <div class='table_small'>
                            <div class='table_cell th-sm-bg'>Contact</div>
                            <div class='table_cell'>{dt.contact}</div>
                        </div>
                        <div class='table_small'>
                            <div class='table_cell th-sm-bg'>Edit</div>
                            <div class='table_cell'><button onClick={handleEdit} className='btn green'>Edit</button></div>
                        </div> 
                        <div class='table_small'>
                            <div class='table_cell th-sm-bg'>Delete</div>
                            <div class='table_cell'><button onClick={()=> handleDelete(`${id}`)} className='btn red'>Delete</button></div>
                        </div>          
                    </div>
                    )
                }         
            </div>
            {/* <div className="tr">
                <div className='dt-table-th'>Name</div>
                <div className='dt-table-th'>Contact</div>
                <div className='dt-table-th'>Edit</div>
                <div className='dt-table-th'>Delete</div>
            </div>           */}
            {/* { 
              data.map(rc=>
                <div className="tr" key={rc.id}>
                    <div className='dt-table-td'>{rc.name}</div>
                    <div className='dt-table-td'>{rc.contact}</div>
                    <div className='dt-table-td'><button onClick={handleEdit} className='btn green'>Edit</button></div>                    
                    <div className='dt-table-td'><button onClick={()=> handleDelete(`${id}`)} className='btn red'>Delete</button></div>                       
                </div> 
                )          
            } */}
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