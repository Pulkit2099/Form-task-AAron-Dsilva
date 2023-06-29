import React from 'react';
import { Formik, Form, Field,ErrorMessage,FieldArray } from 'formik';
import { useState } from 'react';

import { TextField, Select, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox,Button,Snackbar} from '@mui/material';
import * as Yup from 'yup';
import "./UserForm.css"

const initialValues = {
    name: "",
    address: "",
    country: "",
    gender: "",
    hobbies: [],
  };
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
  });
  
  const countries = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "UK" },
  ];
  
  const hobbies = [
    { value: "reading", label: "Reading" },
    { value: "gaming", label: "Gaming" },
    { value: "cooking", label: "Cooking" },
  ];
  
  const UserForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleSubmit = (values, { resetForm }) => {
      console.log(values);
      setIsSubmitted(true);
      resetForm();
    };
  
    const handleCloseSnackbar = () => {
      setIsSubmitted(false);
    };
  
    return (
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="form-container">
                  <h3>Name</h3>
              <div className="field-container">
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  className="input-field"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <h3>Address</h3>
              <div className="field-container">
                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  multiline
                  rows={4}
                  fullWidth
                  className="input-field"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error-message"
                />
              </div>
              <h3 >Country</h3>
              <div className="field-container">
                <Field
                  as={Select}
                  
                  name="country"
                  label="Country"
                  fullWidth
                  className="select-field"
                >
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="field-container">
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="label">
                    Gender
                  </FormLabel>
                  <Field
                    as={RadioGroup}
                    name="gender"
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      className="radio-label"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      className="radio-label"
                    />
                  </Field>
                </FormControl>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="field-container">
                <FormControl component="fieldset">
                  <FormLabel component="legend" className="label">
                    Hobbies/Interests
                  </FormLabel>
                  <FieldArray name="hobbies">
                    {({ push, remove }) => (
                      <div className="checkbox-group">
                        {hobbies.map((hobby, index) => (
                          <div key={index}>
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name={`hobbies.${index}`}
                              value={hobby.value}
                              label={hobby.label}
                              className="checkbox-label"
                            />
                            <ErrorMessage
                              name={`hobbies.${index}`}
                              component="div"
                              className="error-message"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </FormControl>
              </div>
              <Button type="submit" className="submit-button">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {isSubmitted && <div className="form-submitted">Form Submitted!</div>}
        <Snackbar
          open={isSubmitted}
          message="Form submitted"
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        />
      </div>
  
  );
};

export default UserForm;
