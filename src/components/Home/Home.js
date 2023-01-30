import React from 'react';
import { Link} from 'react-router-dom';
import '../../Styles/style.scss'
import FormDefault from '../Utils/Form/FormDeafult';
import useForm from '../Utils/Form/useForm';
import useData from '../Utils/Form/useData';

const Home = () => {  
    const {handleChange,error,handleAddRecord} = useForm();
    const [data] = useData();

    return (
        <div className='wrapper-main'>      
            <form onSubmit={handleAddRecord} className='form-container'>
                <FormDefault
                 handleChange={handleChange}
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
                    </div>
                    )
                }         
            </div>
        </div>
    );
};

export default Home;
