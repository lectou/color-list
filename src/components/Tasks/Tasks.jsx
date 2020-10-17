import React, { useState } from 'react';
import AddNewTask from './AddNewTask';
import { Link } from 'react-router-dom';

const TasksSinglePage = React.memo(({ color, name, tasks, onRenameList,
  listId, onCompleteTask, onDeleteTask, onAddNewTask, onRenameTask }) => {

  const [inputBlockVisible, setInputBlockVisible] = useState(false);


  const clickDeleteTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      onDeleteTask(listId, taskId)
    }
  }

  const clickVisibleInputBlock = () => {
    setInputBlockVisible(!inputBlockVisible)
  }

  const renameList = () => {
    const newName = window.prompt('Название задачи', name);
    if (newName) {
      onRenameList(listId, newName);
    }
  }

  const renameTask = (listId, taskId, text) => {
    const newText = window.prompt('Название списка', text);
    if (newText) {
      onRenameTask(listId, taskId, newText);
    }
  }

  return (
    <div className="tasks">
      <div className="tasks__title">
        <Link to={`/lists/${listId}`}>
          <h2 style={{ color: `${color.name}` }}>{name}</h2>
        </Link>
        <button onClick={renameList}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="gainsboro" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      </div>
      {tasks.length > 0
        ? <ul className="tasks__list">
          {tasks.map(task => (
            <li key={task.id} className="checkbox">
              <input
                onChange={e => onCompleteTask(task.listId, task.id, e.target.checked)}
                className="styled-checkbox"
                id={`styled-checkbox-${task.id}`}
                type="checkbox"
                checked={task.completed}
              />
              <label htmlFor={`styled-checkbox-${task.id}`}><span>{task.text}</span></label>

              <button className="delete-button" onClick={() => renameTask(task.listId, task.id, task.text)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="gainsboro" width="20px" height="20px">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>

              <button className="delete-button" onClick={() => clickDeleteTask(task.listId, task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="lightgrey" width="20px" height="20px">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>

            </li>
          ))}

        </ul>
        : <h4>Нет задач</h4>
      }
      {inputBlockVisible
        ? <AddNewTask
          listId={listId}
          setInputBlockVisible={setInputBlockVisible}
          onAddNewTask={onAddNewTask}
        />
        : <button className="button-add-item" onClick={clickVisibleInputBlock} >Add Task</button>}
    </div>
  )
})

export default TasksSinglePage;