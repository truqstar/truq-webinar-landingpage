import React from 'react';
import './App.css';
import LandingPage from './landingPage';
import { useState } from 'react';
import { Fragment } from 'react';

function App() {
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const errors = validate();
        setErrors(errors)
        console.log(name)
        console.log(email)
        if( Object.keys(errors).length === 0){
            alert("Done")
        }
    }

    const validate = ()=>{
        const error = {}

        if(!name){
            error.name= "Name is Required"
        }else{
            error.name=""
        }

        if(!email){
            error.email = "E-mail is required"
        }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            error.email = "Must be a valid e-mail address"
        }else{
          error.email = ""
        }

        return error;
    }

    const saveName =(event)=>{
      setName(event.target.value)
    }

    const saveEmail =(event)=>{
      setEmail(event.target.value)
    }
  return (
    <Fragment>
    <div className="container">
      <LandingPage submit={handleSubmit} name={saveName} email= {saveEmail} errors={errors}/>
    </div>

    <div className='footer'>
      <p> 
        Copyright © {new Date().getFullYear()} <a href='https://www.truq.it/'>Siju by truQ</a>. All right reserved
      </p>
    </div>
    
    </Fragment>
  );
}

export default App;
