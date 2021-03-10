import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectOption from "./components/selectOption";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import $ from "jquery";
// import { useFormik } from "formik";





const TodoList = () => {
  

  const [todos, setTodos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // eslint-disable-next-line
  const [selectValue, setSelectValue] = useState();
  
  const sortAlphabet = (arr) => {
    arr.sort((a, b) => a.value.localeCompare(b.value));
    return setFilteredData(arr);
  }

  const options = [
    { id: 1, status: "default" },
    { id: 2, status: "process" },
    { id: 3, status: "all" },
    { id: 4, status: "finish" },
  ];
  // CRUD TODO___________________________________________________________
  const create = (newTodo) => {
    setTodos([...todos, newTodo]);
    const array = [...todos];
    array.push(newTodo);
    sortAlphabet(array);
    localStorage.setItem("todos", JSON.stringify(array));
  };

  // Remove Todos
  const remove = (id) => {
    const removeArr =  todos.filter((el) => el.id !== id);
    setTodos([...removeArr]);
    sortAlphabet(removeArr);


    localStorage.setItem("todos", JSON.stringify(removeArr));
  };

  //Update Todos
  const update = (id, updatedTask, updatedDate) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: updatedTask, completed: false, updatedDate: updatedDate };
      }
      return todo;
    });
    setTodos(updatedTodos);
    sortAlphabet(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //Check if Task is Complete
  const toggleCompletion = (id) => {
    const updatedTodos = (filteredData.length > 0 ? filteredData : todos).map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          isFinished: !todo.isFinished,
        };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setFilteredData(updatedTodos);
  };
  // CRUD TODO___________________________________________________________

  //Filtered Data
  

  const onChangeFilter = (e) => {
    e.preventDefault();
  
    const searchText = $('#searchText').val();
    const searchSelect = $('#selectSearch option:selected').val();
    
    let temp_array = [...todos]; // array use for filter
    // console.log('text: ', searchText, 'select: ', searchSelect);
    //check to search by name
    if( searchText) {
      temp_array = temp_array.filter(todo => todo.value.toLowerCase().includes(searchText.toLowerCase()) );
     
    }
    //check to search by dropdown
    if(searchSelect) {
      temp_array = searchSelect === 'process' 
      ? temp_array.filter(todo => todo.isFinished === false) 
      : searchSelect === 'finish'
        ? temp_array.filter(todo => todo.isFinished === true) 
        : temp_array
    } // check to search by select
   
    setFilteredData([...temp_array]);

    
  }


  

  //Select Search

  //**********************************LOCAL STORAGE**********************************

  useEffect(() => {
    if (localStorage) {
      const data = JSON.parse(localStorage.getItem("todos")) || [];
      data.sort((a, b) => a.value.localeCompare(b.value));
      setTodos(data);
      setFilteredData(data);
    } 
  },[]);

  

  //**********************************LOCAL STORAGE**********************************

  //SHOW TODOS LIST

  const showTodos = filteredData.map(todo => {
        const { id, value, completed, createDate, updatedDate } = todo;
        return (
          <CSSTransition key={todo.id} timeout={500} classNames="todo">
            <Todo
              key={id}
              id={id}
              task={value}
              completed={completed}
              createDate={createDate}
              updatedDate={updatedDate ? updatedDate : ''}
              removeTodo={remove}
              updateTodo={update}
              toggleTodo={toggleCompletion}
              todos={todos}
            />
          </CSSTransition>
        );
      })
  return (
    <div className="TodoList">
      <h1>
        Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
      </h1>
      <form>
        <input
          key="searchText"
          name="searchText"
          id="searchText"
          className="search-input"
          type="text"
          placeholder="Search by Todo Name"
          onChange={(e) => onChangeFilter(e)}
        />
        <SelectOption
          options={options}
          id="selectSearch"
          handleChange={(e) => onChangeFilter(e)}
          value={selectValue}
        />
      
      </form>
      <NewTodoForm createTodo={create} todos={todos} />

      <ul>
        <TransitionGroup className="todo-list">{showTodos}</TransitionGroup>
      </ul>
    </div>
  );
};

export default TodoList;
