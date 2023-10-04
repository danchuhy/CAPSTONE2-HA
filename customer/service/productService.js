

const getAllProducts = () =>{
    return axios({
        url: 'https://6500588818c34dee0cd4bf55.mockapi.io/ProductCapstone',
        method: 'GET'
    })
} 

const getOneProduct = (id) => {
    return axios({
        url: `https://6500588818c34dee0cd4bf55.mockapi.io/ProductCapstone/${id}`,
        method: 'GET'
    })
}


const getAllProductsOfType = (type) =>{
    return axios({
        url: `https://6500588818c34dee0cd4bf55.mockapi.io/ProductCapstone?type=${type}`,
        method: 'GET'
    })
} 
const getProductOfName = (name) =>{
    return axios({
        url: `https://6500588818c34dee0cd4bf55.mockapi.io/ProductCapstone?name=${name}`,
        method: 'GET'
    })
} 


export default {getAllProducts,getOneProduct,getAllProductsOfType, getProductOfName};