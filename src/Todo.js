import React, { useState } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useFormik } from 'formik'
import * as Yup from "yup";
import { format, getHours, getMinutes, getSeconds } from 'date-fns'
import  Popup from './components/popUp';
// import TodoList from "./TodoList";


const Todo = ({ createDate, id ,task, completed, removeTodo, toggleTodo, updateTodo, todos}) =>  {
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
      updatedDate: '',
      isUpdated: false
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .trim("Task is required!")
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .test('duplicate', 'Task Have Already Existed', function(value){
        let isDup = true;
        let arr = [];
        todos.forEach((todo) => {
          if(todo.value === value) {
            todos.map((el, index) => arr.push(todos.indexOf(value) !== index))
          } else {
            isDup = true;
          }
        })
          arr.length > 0 ? isDup = false : isDup = true
          arr = [];
          return isDup
        })
        .required("Task is Required!")
    }),
    onSubmit: values => {
      setTasks(values.value);
      setIsEditing( false );
      const generateUpdatedDate = new Date();
      values.updatedDate = generateUpdatedDate;
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
  const {value} = formik.values;
  let result;
    if (isEditing) {
      result = (
        <CSSTransition key='editing' timeout={500} classNames='form'>
          <form className='Todo-edit-form' onSubmit={formik.handleSubmit}>
            <input
              type='text'
              value={value}
              name='value'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button>Save</button>
            {formik.errors.value && formik.touched.value && (
            
              <small className='text-danger'>{formik.errors.value}</small>
           
          )}
        
          </form>
        </CSSTransition>
      );
    } 
    //Else
    else {
      result = (
        <CSSTransition key='normal' timeout={500} classNames='task-text' >
          <li className='Todo-task' onClick={(e) => toggleTodo(id, e)}>
            <b>Task: {tasks} </b> <br />
            <div>
              {
                formik.values.updatedDate 
                ? <small>Updated At: { format(formik.values.updatedDate , 'MM/dd/yyyy') }</small> 
                : (<small>Created At: { format(createDate, 'MM/dd/yyyy') }</small> )
              }
              <br></br>
              {
                formik.values.updatedDate 
                ? <small>Updated Time: { `${getHours(formik.values.updatedDate)}:${getMinutes(formik.values.updatedDate)}:${getSeconds(formik.values.updatedDate)} ` }</small> 
                : <small>Created Time: { `${getHours(createDate)}:${getMinutes(createDate)}:${getSeconds(createDate)} ` }</small>
              }
            
            </div>

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
          <Popup 
            iconClass='fa-trash'
            title="Warning" 
            content="Are You Sure Want To Delete?" 
            action={(e) => removeTodo(id)} />
        </div>
      </TransitionGroup>
    );
  }

export default Todo;
