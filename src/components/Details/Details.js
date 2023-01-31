import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/style.scss'

const Details = () => {
    const [data,setData] = useState([]);
    const { id } = useParams();
   
    const getfilteredData = () => {
        const parsedArr = JSON.parse(localStorage.getItem("information"));
        const filtered = parsedArr.filter(fd=> fd.id === id);
        setData(filtered);
    }

    useEffect(()=> {
        getfilteredData();
    },[])

    return (
        <div className='details-table table'>
            <h2>Record Book</h2>
            <div className="table" id="results">
                <div className='theader'>
                    <div className='table_header'>Name</div>
                    <div className='table_header'>Contact</div>
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
                    </div>
                    )
                }         
            </div>
        </div>
    );
};

export default Details;
