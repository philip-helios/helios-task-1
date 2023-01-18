import React, { useEffect } from 'react';

const Details = () => {

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('information'));
        console.log(data)
    },[])
    return (
        <div>
            <h2>This is the details route</h2>
        </div>
    );
};

export default Details;