//get local data from storage
export const getLocal = () => {
        
    const arr = JSON.parse(localStorage.getItem('information'));
    return arr;
}

// set local data from storage

export const setLocal = (arr) => {
    localStorage.setItem('information',JSON.stringify(arr));
}

