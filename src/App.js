import './App.css';
import LandingPage from './landingPage';
import { useState, Fragment } from 'react';
import axios from 'axios';
import {Toaster, toast} from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const [formData, setformData] = useState({name: '', email: '' })

    const handleSubmit = (event) =>{
        event.preventDefault();
        const errors = validate();
        setErrors(errors)
        console.log(formData)
        postData()

        if( Object.keys(errors).length === 0){
            alert("Done")
        }
    }

    const validate = ()=>{
        const error = {}

        if(!formData.name){
            error.name= "Name is Required"
        }else{
            error.name=""
        }

        if(!formData.email){
            error.email = "E-mail is required"
        }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)){
            error.email = "Must be a valid e-mail address"
        }else{
          error.email = ""
        }

        return error;
    }


    const postData = async()=>{
      setLoading(true)
      const {data: responseData} = await axios.post(`https://backoffice-staging-2ric45myja-uc.a.run.app/messaging-service/subscribe`, 
      formData, 
      {headers: {"Content-Type": "application/json"}})

      if(responseData.status !== "SUCCESS") {
        toast.error(responseData.message)
      }else {
        toast.success(responseData.message);
        setformData({name: '', email: '' })
      }
      setLoading(false)
    }

    const handleChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
      

      setformData({...formData, [name]:value })
    }
  return (
    <Fragment>
      <Toaster containerStyle={{zIndex: '99999999'}}/>
    <div className="container">
      <LandingPage submit={handleSubmit}  errors={errors} data={handleChange} diasble={loading}/>
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
