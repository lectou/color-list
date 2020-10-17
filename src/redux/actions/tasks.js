import axios from 'axios';

export const setNewTasks = (payload) => ({
  type: 'SET_NEW_TASKS',
  payload,
});

export const setTaskChecked = (payload) => ({
  type: 'SET_TASK_CHECKED',
  payload
});

export const deleteTask = (payload) => ({
  type: 'DELETE_TASK',
  payload
});

export const newTaskText = (payload) => ({
  type: 'RENAME_TASK',
  payload
});

export const newNameList = (payload) => ({
  type: 'RENAME_LIST',
  payload
})

export const setCheckedTask = (listId, taskId, checked) => (dispatch) => {
  axios
    .patch(`http://localhost:3002/tasks/${taskId}`, { completed: checked })
    .then(() => dispatch(setTaskChecked({ listId, taskId, checked })))
    .catch(() => {
      alert("Error to update task")
    })
}

export const deleteTaskData = (listId, taskId) => dispatch => {
  dispatch(deleteTask({ listId, taskId }));
  axios
    .delete(`http://localhost:3002/tasks/${taskId}`)
    .then(() => dispatch(deleteTask(listId, taskId)))
    .catch(() => {
      alert("Error to delete task")
    })
}

export const setNewTaskData = (task) => dispatch => {
  axios
    .post(`http://localhost:3002/tasks`, task)
    .then(() => dispatch(setNewTasks(task)))
    .catch(() => {
      alert("Error to add task")
    })
}

export const renameList = (listId, name) => dispatch => {
  axios
    .patch(`http://localhost:3002/lists/${listId}`, { name: name })
    .then(() => dispatch(newNameList({ listId: listId, name: name })))
    .catch(() => {
      alert("Error to rename list")
    })
}

export const renameTask = (listId, taskId, text) => dispatch => {
  dispatch(newTaskText({ listId: listId, taskId: taskId, text: text }))
  axios
    .patch(`http://localhost:3002/tasks/${taskId}`, { text: text })
    .then(() => dispatch(newTaskText({ listId: listId, taskId: taskId, text: text })))
    .catch(() => {
      alert("Error to rename list")
    })
}