import React, { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SelectOption from './components/selectOption';
// import { useFormik } from "formik";

const TodoList = () =>{
  // constructor(props) {
  // //   super(props);
  // //   this.state = {
  // //     todos: []
  // //   };
  // //   this.create = this.create.bind(this);
  // //   this.remove = this.remove.bind(this);
  // //   this.update = this.update.bind(this);
  // //   this.toggleCompletion = this.toggleCompletion.bind(this);
  // // }
  


  const [todos, setTodos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectValue, setSelectValue] = useState();
  // eslint-disable-next-line
 
  const options = [
    {id: 1, status: 'default'},
    {id: 2, status: 'process'},
    {id: 3, status: 'all'},
    {id: 4, status: 'finish'},
  ]
  // CRUD TODO___________________________________________________________
  const create = (newTodo) => {
    setTodos(
    [...todos, newTodo]
    );
    
    
      localStorage.setItem('todos', JSON.stringify({todos}));
      console.log('test storage: ', localStorage.todos.map(todo => console.log('test: ',todo)));
    }
  
  const remove = (id)  => {
    setTodos(todos.filter(el => el.id !== id));
  }
  const update = (id, updatedTask) =>  {
   
    
    
  const updatedTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, value: updatedTask, completed: false };
    }
    return todo;
  });
  setTodos(updatedTodos);
}
  const toggleCompletion = (id)  => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed, isFinished: !todo.isFinished}
      }
      return todo;
    });
    setTodos(updatedTodos);
    
    
  }
  // CRUD TODO___________________________________________________________
  
  


  //Filtered Data
  const onChangeSearchHandler = (e) => {
    let {value} = e.target
      const newData = todos.filter(todo => todo.value.toLowerCase().includes(value.toLowerCase()))
    
    setFilteredData(newData);
    

  }
  //FilteredData

  //Select Search
  const onChangeSelectSearch = (e) => {
    const {value} = e.target;
    setSelectValue(value);

    const newSelectData = value && value === 'finish' ? 
    todos.filter(todo => todo.isFinished === true ) 
    : value && value === 'process' 
      ? todos.filter(todo => todo.isFinished === false ) 
      : todos
    

      setFilteredData(newSelectData);
  
  }

  //Select Search

  //**********************************LOCAL STORAGE**********************************
 

  useEffect(()=> {
    if(localStorage){
      console.log(localStorage.todos);
    }
  },[])




  //**********************************LOCAL STORAGE**********************************
  
  
  
  //SHOW TODOS LIST
  
  const showTodos = !(filteredData.length > 0) ? 
  todos.map(todo => {
      const {id, value, completed, createDate} = todo;
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={id}
            id={id}
            task={value}
            completed={completed}
            createDate={createDate}
            removeTodo={remove}
            updateTodo={update}
            toggleTodo={toggleCompletion}
            todos={todos}
          />
        </CSSTransition>
      );
    })
    :
    filteredData.map(todo => {
      const {id, value, completed, createDate} = todo;
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={id}
            id={id}
            task={value}
            completed={completed}
            createDate={createDate}
            removeTodo={remove}
            updateTodo={update}
            toggleTodo={toggleCompletion}
            todos={todos}
          />
        </CSSTransition>
      );
    })
    ;
    return (
      <div className='TodoList'>
        <h1>
          Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
        </h1>
          <form >
            <input 
              key="searchText" 
              name="searchText" 
              className="search-input" 
              type="text" 
              placeholder="Search by Todo Name" 
              onChange={(e)=> onChangeSearchHandler(e)}
              />
            <SelectOption 
              options={options} 
              handleChange={(e) => onChangeSelectSearch(e)} 
              value={selectValue}
            />
          </form>
        <NewTodoForm createTodo={create}  todos={todos} />

        <ul>
          <TransitionGroup className='todo-list'>{showTodos}</TransitionGroup>
        </ul>
      </div>
    );
  }

export default TodoList;
