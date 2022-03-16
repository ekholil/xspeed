import React, { Fragment, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {Toaster, toast} from "react-hot-toast";

const Create = () => {
    const [inputFields, setInputFields] = useState([
        { work_place: '', designation: '' }
      ]);
    const [loading, setLoading] = useState(false)
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (data) => {
     setLoading(true)
     const allData =  {...data, user_hobby: [...inputFields]}
     fetch('https://obscure-river-55852.herokuapp.com/users', {
      method: 'POST', 
      headers: {'content-type' : 'application/json'},
      body : JSON.stringify(allData)
  })
  .then(res => res.json())
  .then(data => {
      if(data.acknowledged){
          setLoading(false)
          toast.success('User created successfully', {position: 'bottom-left'})
          reset()
          setInputFields([
            { work_place: '', designation: '' }
          ])
      }
  })

     console.table(allData)
  };

// handle input change

  const handleInputChange = (index, event) => {
    const result = /^[a-z0-9]+$/i.test(event.target.value);
    if(!result){
      return
    }
    const values = [...inputFields];
    if (event.target.name === "work_place") {
      values[index].work_place = event.target.value;
    } else {
      values[index].designation = event.target.value;
    }

    setInputFields(values);
  };
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  return (
    <div className="container">
      <h2>Create Data</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
     
        
        <input className="form-control" type='hidden' {...register("id", {required: false, value: Math.floor(100 + Math.random() * 900) })} />
        {/* Username */}
        <label  htmlFor="the-id-2">Full name</label>
        <input name="username" data-username="user data" id="the-id-2" className="form-control my-2" placeholder="Enter Username" type='text' {...register('user_name', {required: true, pattern: {value: /^[a-zA-Z]+$/i, message: 'Username should be letters only'}})} />
        {errors.user_name && <span className="text-danger">This field is required</span>}
        {/* Email */} <br />
        <label htmlFor="the-id-3">Email</label>
        <input  name="user_email" data-useremail="user email" id="the-id-3" className="form-control my-2" placeholder="Enter Email" type='email' {...register('user_email', {required: true, maxLength: 200})} />
        {errors.user_email && <span className="text-danger">This field is required</span>}
        {/* User Details  */} <br />
        <label htmlFor="the-id-5">Details</label>
        <textarea data-details="user details" id="the-id-5" className="form-control my-2" placeholder="Enter Details"  {...register('details')} />
         {/* Gender */} <br />



         <label htmlFor="">Gender</label> <br />
         <label htmlFor="male">
                    <input
                        {...register("user_gender", {required: true})}
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        
                    />
                    Male
                </label>
                <label className="mx-2" htmlFor="female">
                    <input
                        {...register("user_gender", {required: true})}
                        type="radio"
                        name="gender"
                        value="female"
                        id="female"
                    />
                    Female
                </label>
                <label className="mx-2" htmlFor="none">
                    <input
                        {...register("user_gender", {required: true})}
                        type="radio"
                        name="gender"
                        value="other"
                        id="other"
                    />
                    None
                </label> <br />
                {errors.user_gender && <span className="text-danger">This field is required</span>}

                <div className="form-row">
                    <label htmlFor="">Work</label>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
             <div className="d-flex gap-2">
             <div className="form-group col-sm-4">
                <label htmlFor="work_place">Work place</label>
                <input
                  type="text"
                  className="form-control"
                  id="work_place"
                  name="work_place"
                  onChange={event => handleInputChange(index, event)}
                  value={inputField.work_place}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="designation">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                  onChange={event => handleInputChange(index, event)}
                  value={inputField.designation}
                />
              </div>
              </div>
              <div className="form-group col-sm-4 my-2 gap-2 d-flex">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  Remove Field
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                 Add Field
                </button>
              </div>
             
            </Fragment>
          ))}
        </div>


     

        <button disabled={loading} className="btn btn-primary mb-5" type="submit" >{loading ? <Spinner animation="border" />:'Submit'}</button>
      </form>
      
     <Toaster />
    </div>
  );
};

export default Create;
