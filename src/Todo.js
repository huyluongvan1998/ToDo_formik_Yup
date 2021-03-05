import React, { useState } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useFormik } from 'formik'
import * as Yup from "yup";

const Todo = ({ key, id ,task, completed, removeTodo, toggleTodo, updateTodo}) =>  {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isEditing: false,
  //     task: this.props.task
  //   };

  //   this.handleRemove = this.handleRemove.bind(this);
  //   this.toggleForm = this.toggleForm.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleUpdate = this.handleUpdate.bind(this);
  //   this.handleToggle = this.handleToggle.bind(this);
  // }
  const formik = useFormik({
    initialValues: {
      value: task,
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Task is Required!"),
    }),
    onSubmit: values => {
      setTasks(values.value);
      setIsEditing( false );
      updateTodo(id, values.value);
    
    }
  })

  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState(task)
  // const handleRemove = () => {
  //   this.props.removeTodo(this.props.id);
  // }
  const toggleForm = () => {
    setIsEditing( prev => prev = !prev);
  }
  // const handleUpdate = (evt, id) => {
  //   evt.preventDefault();
  //   //take new task data and pass up to parent
  //   updateTodo(id, tasks);
  //   setIsEditing( false );
  // }
  // const handleChange = (evt) => {
   
  //   setTasks( evt.target.value);
   
  // }
  // handleToggle(evt) {
  //   this.props.toggleTodo(this.props.id);
  // }
  
    let result;
    if (isEditing) {
      result = (
        <CSSTransition key='editing' timeout={500} classNames='form'>
          <form className='Todo-edit-form' onSubmit={formik.handleSubmit}>
            <input
              type='text'
              value={formik.values.value}
              name='value'
              onChange={formik.handleChange}
            />
            <button>Save</button>
            {formik.errors.value && formik.touched.value && (
            
              <small className='text-danger'>{formik.errors.value}</small>
           
          )}
        
          </form>
        </CSSTransition>
      );
    } else {
      result = (
        <CSSTransition key='normal' timeout={500} classNames='task-text'>
          <li className='Todo-task' onClick={(e) => toggleTodo(id, e)}>
            {tasks}
          </li>
        </CSSTransition>
      );
    }
    return (
      <TransitionGroup
        className={completed ? "Todo completed" : "Todo"}
      >
        {result}
        <div className='Todo-buttons'>
          <button onClick={() => toggleForm()}>
            <i className='fas fa-pen' />
          </button>
          <button onClick={(e) => removeTodo(id)}>
            <i className='fas fa-trash' />
          </button>
        </div>
      </TransitionGroup>
    );
  }

export default Todo;
