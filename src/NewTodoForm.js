import React  from "react";
import uuid from "uuid/v4";
import "./NewTodoForm.css";
import { useFormik } from 'formik'
import * as Yup from "yup";

const NewTodoForm = ({createTodo}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = { task: "" };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  const formik = useFormik({
    initialValues: {
      value: '',
      id: '',
      completed: false,
      createDate: new Date(),
      isFinished: false
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .trim("Task is required!")
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Task is Required!"),
    }),
    onSubmit: values => {
      const uid = uuid();
      values.id = uid;
      const dateTime = new Date();
      values.createDate = dateTime;
      createTodo(values);
      console.log(JSON.stringify(values));
      formik.handleReset();
    }
  })

  
  // const [task, setTask] = useState({
  //   value: '',
  //   id: '',
  //   completed: false
  // });

  // const handleSubmit = (evt) => {
  //   evt.preventDefault(); 
  //   const uid = uuid();
  //   createTodo({...task, id: uid});
  //   setTask({...task, value: '' });
  // }
 
    return (
      <form className='NewTodoForm' onSubmit={formik.handleSubmit}>
          <label htmlFor='task'>New Todo</label>
       
          <input
            type='text'
            placeholder='New Todo'
            id='task'
            name='value'
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type='submit' 
            
          >Add Todo</button>
          {formik.errors.value && formik.touched.value && (
            <div className='error-msg'>
              <small className='text-danger'>{formik.errors.value}</small>
            </div>
          )}
        
      </form>
    );
  }

export default NewTodoForm;
