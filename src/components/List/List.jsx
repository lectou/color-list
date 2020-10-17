import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewList from './AddNewList';
import classNames from 'classnames';

const ListItems = ({ lists, deleteList, colors,
  addNewList, activeList }) => {

  const [newListWindow, setNewListWindow] = useState(false);

  const toggleNewList = (val) => setNewListWindow(val);

  const clickDeleteList = (id) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      deleteList(id);
    }
  }

  return (
    <>
      <ul className="lists">
        <li
          className={classNames("title", { "active": !activeList })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="white" width="18px" height="18px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
          </svg>
          <Link to={`/`}>
            <span>All tasks</span>
          </Link>
        </li>

        {
          lists.map(list => (
            <li key={list.id} className={activeList === list.id ? "active" : null} >
              <span
                className="color-marker"
                style={{ backgroundColor: `${list.color.name}` }}>

              </span>
              <Link to={`/lists/${list.id}`}>
                <span>{list.name}</span>
              </Link>
              <button className="delete-button" onClick={() => clickDeleteList(list.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="white" width="18px" height="18px">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              </button>
            </li>
          ))
        }

        <li className="add-button"><button className="button-add-item" onClick={toggleNewList}>Add list</button></li>
      </ul >


      {newListWindow
        ? <AddNewList
          addNewList={addNewList}
          colors={colors}
          newListWindow={toggleNewList}
        />
        : null}
    </>
  )
}

export default React.memo(ListItems);
