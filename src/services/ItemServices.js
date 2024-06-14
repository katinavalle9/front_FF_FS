import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1'

const getAllItemsService = () => axios.get(`${BASE_URL}/items`)
const getOneItemService = (id) => axios.get(`${BASE_URL}/items/${id}`)
const searchItemsService = (query) => axios.get(`${BASE_URL}/items`).then(response => {
    return response.data.filter(item => item.product_name.toLowerCase().includes(query.toLowerCase()));
});
const createItem= (jwtToken, data)=>axios.post(`${BASE_URL}/items`,data, {
  headers: {
    Authorization: `Bearer ${jwtToken}`
  }
})

export {
  getAllItemsService,
  getOneItemService,
  searchItemsService,
  createItem
}