import axios from 'axios';

export const setList = (payload) => ({
  type: 'SET_LIST',
  payload,
});

export const setColors = (payload) => ({
  type: 'SET_COLORS',
  payload,
});

export const setNewList = (payload) => ({
  type: 'SET_NEW_LIST',
  payload,
});

export const deleteList = (payload) => ({
  type: 'DELETE_LIST',
  payload,
});


const getList = axios.get('/lists?_expand=color&_embed=tasks');
const getColors = axios.get('/colors');

export const setDataList = () => dispatch => {
  Promise.all([getList, getColors])
    .then(data => {
      dispatch(setList(data[0].data));
      dispatch(setColors(data[1].data));
    })
    .catch(() => {
      alert("Error to load list data")
    })
}

export const setNewListData = (obj) => dispatch => {
  const newObj = {
    id: obj.id,
    name: obj.name,
    colorId: obj.colorId
  }
  axios
    .post('/lists', newObj)
    .then(() => dispatch(setNewList(obj)))
    .catch(() => {
      alert("Error to update list")
    })
}

export const deleteListData = (id) => dispatch => {
  axios
    .delete(`/lists/${id}`)
    .then(() => dispatch(deleteList(id)))
    .catch(() => {
      alert("Error to delete list")
    })
}