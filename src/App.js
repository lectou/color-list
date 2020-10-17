import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataList, setNewListData, deleteListData } from './redux/actions/list';
import {
  setCheckedTask,
  deleteTaskData,
  setNewTaskData,
  renameTask,
  renameList
} from './redux/actions/tasks';
import { Route, useLocation } from 'react-router-dom';
import { List, Tasks } from './components/index';


function App() {

  const dispatch = useDispatch();
  const list = useSelector(({ list }) => list.list);
  const colors = useSelector(({ list }) => list.colors);
  const [activeItem, setActiveItem] = useState(null);
  let location = useLocation();


  useEffect(() => {
    dispatch(setDataList());
  }, [dispatch]);

  const addNewList = useCallback((obj) => {
    dispatch(setNewListData(obj));
  }, []);

  const deleteList = useCallback((id) => {
    dispatch(deleteListData(id));
  }, []);

  const onCompleteTask = useCallback((listId, taskId, checked) => {
    dispatch(setCheckedTask(listId, taskId, checked));
  }, []);

  const onDeleteTask = useCallback((listId, taskId) => {
    dispatch(deleteTaskData(listId, taskId));
  }, []);

  const onAddNewTask = useCallback((task) => {
    dispatch(setNewTaskData(task));
  }, []);

  const onRenameList = useCallback((listId, name) => {
    dispatch(renameList(listId, name));
  }, []);

  const onRenameTask = useCallback((listId, taskId, text) => {
    dispatch(renameTask(listId, taskId, text));
  }, []);

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    setActiveItem(listId);
  }, [location]);

  return (
    <div className="todo">

      <div className="todo__sidebar">
        {list.length > 0
          ? <List
            lists={list}
            colors={colors}
            deleteList={deleteList}
            addNewList={addNewList}
            activeList={activeItem}
            onDeleteTask={onDeleteTask}
            listId={list.id}
            onAddNewTask={onAddNewTask}
          />
          : <h2>Loading...</h2>}
      </div>

      <div className="todo__tasks">

        <Route exact path="/">
          {list.length > 0 &&
            list.map(list => {
              return <Tasks
                onCompleteTask={onCompleteTask}
                key={list.id}
                color={list.color}
                name={list.name}
                tasks={list.tasks}
                onDeleteTask={onDeleteTask}
                listId={list.id}
                onAddNewTask={onAddNewTask}
                onRenameTask={onRenameTask}
                onRenameList={onRenameList}
              />
            })}
        </Route>

        <Route path="/lists/:id?">
          {
            list.map(list => {
              if (list.id === activeItem) {
                return <Tasks
                  onCompleteTask={onCompleteTask}
                  key={list.id}
                  color={list.color}
                  name={list.name}
                  tasks={list.tasks}
                  onDeleteTask={onDeleteTask}
                  listId={list.id}
                  onAddNewTask={onAddNewTask}
                  onRenameList={onRenameList}
                  onRenameTask={onRenameTask}
                />
              }
            })}
        </Route>

      </div>
    </div>
  )
}
export default App;
