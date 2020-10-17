const initialState = {
  list: [],
  colors: []
}

const lists = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        list: action.payload
      }
    case "SET_COLORS":
      return {
        ...state,
        colors: action.payload
      }
    case "DELETE_LIST":
      return {
        ...state,
        list: state.list.filter(el => el.id !== action.payload)
      }
    case "SET_LOAD_LIST":
      return {
        ...state
      }
    case "SET_NEW_LIST":
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case "SET_TASK_CHECKED":
      return {
        ...state,
        list: state.list.map(list => {
          if (list.id === action.payload.listId) {
            list.tasks = list.tasks.map(task => {
              if (task.id === action.payload.taskId) {
                task.completed = action.payload.checked
              }
              return task;
            })
          }
          return list;
        })
      }
    case "SET_NEW_TASKS":
      console.log(action.payload.listId);
      return {
        ...state,
        list: state.list.map(list => {
          if (list.id === action.payload.listId) {
            list.tasks = [...list.tasks, action.payload]
          }
          return list
        })
      }
    case "DELETE_TASK":
      return {
        ...state,
        list: state.list.map(list => {
          if (list.id === action.payload.listId) {
            list.tasks = list.tasks.filter(task => task.id !== action.payload.taskId)
          }
          return list
        })
      }
    case "RENAME_LIST":
      return {
        ...state,
        list: state.list.map(list => {
          if (list.id === action.payload.listId) {
            list.name = action.payload.name
          }
          return list
        })
      }
    case "RENAME_TASK":
      return {
        ...state,
        list: state.list.map(list => {
          if (list.id === action.payload.listId) {
            list.tasks = list.tasks.map(task => {
              if (task.id === action.payload.taskId) {
                task.text = action.payload.text;
              }
              return task;
            })
          }
          return list
        })
      }
    default:
      return state
  }
}

export default lists;