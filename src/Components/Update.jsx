import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import data from './data.json'

const Update = () => {
    const {id} = useParams()
    const updateItem = data.find(item => item.id === Number(id))
    const [inputFields, setInputFields] = useState(updateItem.user_hobby);
  console.log(updateItem)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const allData = { ...data, user_hobby: [...inputFields] };
    console.table(allData);
  };
  const handleInputChange = (index, event) => {
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
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  return (
    <div className="container">
      <h2>Update Data</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="form-control"
          type="hidden"
          {...register("id", { required: false, value: "567" })}
        />
        {/* Username */}
        <label htmlFor="the-id-2">Full name</label>
        <input
          name="username"
          data-username="user data"
          id="the-id-2"
          className="form-control my-2"
          placeholder="Enter Username"
          type="text"
          defaultValue={updateItem?.user_name}
          {...register("user_name", {
            required: true,
            pattern: {
              value: /^[a-zA-Z]+$/i,
              message: "Username should be letters only",
            },
          })}
        />
        {errors.user_name && (
          <span className="text-danger">This field is required</span>
        )}
        {/* Email */} <br />
        <label htmlFor="the-id-3">Email</label>
        <input
          name="user_email"
          data-useremail="user email"
          id="the-id-3"
          defaultValue={updateItem.user_email}
          className="form-control my-2"
          placeholder="Enter Email"
          type="email"
          {...register("user_email", { required: true, maxLength: 200 })}
        />
        {errors.user_email && (
          <span className="text-danger">This field is required</span>
        )}
        {/* User Details  */} <br />
        <label htmlFor="the-id-5">Details</label>
        <textarea
          data-details="user details"
          id="the-id-5"
          className="form-control my-2"
          placeholder="Enter Details"
          {...register("details")}
        />
        {/* Gender */} <br />
        <label htmlFor="">Gender</label> <br />
        <label htmlFor="male">
          <input
            {...register("user_gender", { required: true })}
            type="radio"
            name="gender"
            value="male"
            id="male"
          />
          Male
        </label>
        <label className="mx-2" htmlFor="female">
          <input
            {...register("user_gender", { required: true })}
            type="radio"
            name="gender"
            value="female"
            id="female"
          />
          Female
        </label>
        <label className="mx-2" htmlFor="none">
          <input
            {...register("user_gender", { required: true })}
            type="radio"
            name="gender"
            value="other"
            id="other"
          />
          None
        </label>{" "}
        <br />
        {errors.user_gender && (
          <span className="text-danger">This field is required</span>
        )}
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
                    defaultValue={updateItem.user_hobby.work_place}
                    name="work_place"
                    onChange={(event) => handleInputChange(index, event)}
                    value={inputField.work_place}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={updateItem.user_hobby.designation}
                    id="designation"
                    name="designation"
                    onChange={(event) => handleInputChange(index, event)}
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
        <input className="btn btn-primary mb-5" type="submit" />
      </form>
    </div>
  );
};

export default Update;
