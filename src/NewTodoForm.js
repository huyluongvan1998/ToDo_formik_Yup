import { yupResolver } from '@hookform/resolvers/yup';
import { format } from "date-fns";
import React from "react";
// import { useFormik } from "formik";
import { useForm } from 'react-hook-form';
import uuid from "uuid/v4";
import * as Yup from "yup";
import "./NewTodoForm.css";

const NewTodoForm = ({ createTodo, todos }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = { task: "" };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  
  const onSubmit = (values) => {
    const uid = uuid();
    values.id = uid;
    const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    values.createDate = dateTime;
    createTodo(values);
    console.log('ahaihi', values)
    // console.log(JSON.stringify(values))
    
  }

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
  });

  const { register, handleSubmit, errors, value } = useForm({
    defaultValues: {
      value: "",
      id: "",
      completed: false,
      createDate: new Date(),
      isFinished: false,
    },
    resolver: yupResolver(validationSchema)
  });


 
  return (
    <form className="NewTodoForm" onSubmit={ handleSubmit(onSubmit) }>
      <label htmlFor="task">New Todo</label>

      <input
        type="text"
        placeholder="New Todo"
        id="task"
        name="value"
        value={value}
        ref={ register }
      />
      <button type="submit">Add Todo</button>
      <div className="error-msg">
        <small className="text-danger">{errors.value?.message}</small>
      </div>
    </form>
  );
};

export default NewTodoForm;
