import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
  
  const create = (newTodo) => {
    setTodos(
    [...todos, newTodo]
    );
    
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
        return {...todo, completed: !todo.completed}
      }
      return todo;
    });
    
    setTodos(updatedTodos);
   
  }
 
    const showTodos = todos.map(todo => {
      
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.value}
            completed={todo.completed}
            removeTodo={remove}
            updateTodo={update}
            toggleTodo={toggleCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div className='TodoList'>
        <h1>
          Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
        </h1>
        <NewTodoForm createTodo={create} />

        <ul>
          <TransitionGroup className='todo-list'>{showTodos}</TransitionGroup>
        </ul>
      </div>
    );
  }

export default TodoList;
