import React, { useState } from 'react'

const AddNewTask = ({ setInputBlockVisible, listId, onAddNewTask }) => {
  const [inputValue, setInputValue] = useState("");

  const ClickCloseBlock = () => {
    setInputBlockVisible(false);
  }

  const newTask = {
    id: Math.random().toString(36).substr(2, 9),
    listId: listId,
    text: inputValue,
    completed: false
  }

  const clickAddNewTask = () => {
    if (!inputValue) {
      return
    }
    onAddNewTask(newTask);
    ClickCloseBlock();
  }

  return (
    <div className="new-task">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="New task"
      />
      <div className="new-task__buttons">
        <button onClick={clickAddNewTask}>Добавить</button>
        <button onClick={ClickCloseBlock}>Отмена</button>
      </div>
    </div>
  )
}
export default AddNewTask;