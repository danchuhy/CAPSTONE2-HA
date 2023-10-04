const BASE_URL = 'https://6500588818c34dee0cd4bf55.mockapi.io/ProductCapstone';

function getProductListFromDB() {
    return axios({
        url: BASE_URL,
        method: "GET",    
    })
};

function getProductByIdFromDB(id){
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "GET",  
    })
};

function addNewProductToDB(productInfor) {
    return axios({
        url: BASE_URL,
        method: "POST",
        data: productInfor,    
    })
};


function updateProductByIdFromDB(id, productInfor){
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "PUT",  
        data: productInfor,
    })
};

function delProductByIdFromDB(id){
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",  
    })
};