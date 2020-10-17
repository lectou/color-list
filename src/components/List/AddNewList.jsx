import React, { useState } from 'react'


const AddNewList = ({ colors, newListWindow, addNewList }) => {

  const [seletedColor, selectColor] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const clickCloseWindow = () => newListWindow(false);
  const clickSelectColor = (id) => selectColor(id);

  const newList = {
    id: Math.random().toString(36).substr(2, 9),
    name: inputValue,
    colorId: seletedColor,
    tasks: [],
    color: {
      id: seletedColor,
      name: colors.find(el => el.id === seletedColor).name
    }
  }

  const createNewList = () => {
    if (!inputValue) {
      return
    }
    addNewList(newList);
    clickCloseWindow();
  }

  return (
    <div className="new-list" >
      <button className="new-list__clear" onClick={clickCloseWindow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="grey" width="36px" height="36px">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
      <div className="new-list__block" >
        <input
          type="text"
          placeholder="List name"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <ul className="new-list__colors">
          {colors.map(color => (
            <li
              key={`${color.name}_${color.id}`}
              style={{ backgroundColor: `${color.name}` }}
              className={seletedColor === color.id ? "active" : null}
              onClick={() => clickSelectColor(color.id)}
            ></li>
          ))}
        </ul>
        <button onClick={createNewList}>Добавить</button><button onClick={clickCloseWindow}>Отмена</button>
      </div>

    </div>
  )
}

export default AddNewList;