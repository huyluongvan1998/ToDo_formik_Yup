import { yupResolver } from '@hookform/resolvers/yup';
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as Yup from "yup";
import Popup from "./components/popUp";
import "./Todo.css";
// import TodoList from "./TodoList";

const Todo = ({
  createDate,
  id,
  task,
  completed,
  removeTodo,
  toggleTodo,
  updateTodo,
  todos,
  updatedDate
}) => {
  



  const validationSchema = Yup.object({
    value: Yup.string()
      .trim("Task is required!")
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .test("duplicate", "Task Have Already Existed", function (value) {
        let isDup = true;
        let arr = [];
        todos.forEach((todo) => {
          if (todo.value === value) {
            todos.map((el, index) =>
              arr.push(todos.indexOf(value) !== index)
            );
          } else {
            isDup = true;
          }
        });
        arr.length > 0 ? (isDup = false) : (isDup = true);
        arr = [];
        return isDup;
      })
      .required("Task is Required!"),
  })

 

  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState(task);
  
  

  const toggleForm = () => {
    setIsEditing((prev) => (prev = !prev));
  };

  const onSubmit = (values) => {
    const generateUpdatedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    values.updatedDate = generateUpdatedDate;
    setTasks(values.value);
    setIsEditing(false);
    updateTodo(id, values.value, values.updatedDate);
  };


  const {register , handleSubmit, errors} = useForm({
    defaultValues: {
      value: task.value,
      id: "",
      completed: false,
      updatedDate: new Date(),
      isFinished: false,
    },
   resolver: yupResolver(validationSchema)
  });
  
  let result;
  if (isEditing) {
    result = (
      <CSSTransition key="editing" timeout={500} classNames="form">
        <form className="Todo-edit-form" onSubmit={ handleSubmit(onSubmit) }>
          <input
            type="text"
            name="value"
            ref={ register }
          />
        <button type="submit">Save</button>
        <small className="text-danger">{errors.value?.message}</small>
        </form>
      </CSSTransition>
    );
  }
  //Else
  else {
    result = (
      <CSSTransition key="normal" timeout={500} classNames="task-text">
        <li className="Todo-task" onClick={(e) => toggleTodo(id, e)}>
          <b>Task: {tasks} </b> <br />
          <div>
            {updatedDate ? (
              <small>Updated At: {updatedDate} </small>
            ) : (
              <small>Created At: {createDate}  </small>
              
            )}
            <br></br>
          </div>
        </li>
      </CSSTransition>
    );
  }
  return (
    <TransitionGroup className={completed ? "Todo completed" : "Todo"}>
      {result}
      <div className="Todo-buttons">
        <button onClick={() => toggleForm()}>
          <i className="fas fa-pen" />
        </button>
        <Popup
          iconClass="fa-trash"
          title="Warning"
          content="Are You Sure Want To Delete?"
          action={(e) => removeTodo(id)}
        />
      </div>
    </TransitionGroup>
  );
};

export default Todo;
