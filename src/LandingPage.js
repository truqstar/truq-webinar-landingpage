import './LandingPage.css';
import {useState} from "react";
import {toast} from "react-hot-toast";
import axios from "axios";
import webinar from './assets/Webinar-Banner.png';
import loadIcon from './assets/loading.svg';


const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({name: '', email: ''});
  const [errors, setErrors] = useState({name: true, email: true});
  const [errorMessages, setErrorMessages] = useState({name: "", email: ""});
  const isInvalid = !formData.name || !formData.email || errors.name || errors.email;

  const handleChange = e => {
    const name = e.target.name;
    const value = name === "email" ? e.target.value.toLowerCase() : e.target.value;
    setFormData({...formData, [name]: value});
    validate(e);
  }

  const validate = event => {
    const error = {...errors};
    const errorMgs = {...errorMessages};

    if (event.target.name === "name") {
      if (!formData.name || formData.name.length < 2) {
        error.name = true;
        errorMgs.name = "Full name is Required";
      }
      else {
        error.name = false;
        errorMgs.name = null;
      }
    } else if (event.target.name === "email"){
      if (!formData.email) {
        error.email = true;
        errorMgs.email = "Email is required";
      }
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(formData.email)) {
        error.email = true;
        errorMgs.email = "Invalid email address";
      }
      else {
        error.email = false;
        errorMgs.email = null;
      }
    } 
    
    // else if(event.target.name === "company"){
    //   if (!formData.company || formData.company.length < 1) {
    //     error.company = true;
    //     errorMgs.company = "Company name is Required";
    //   }
    //   else {
    //     error.company = false;
    //     errorMgs.company = null;
    //   }
    // }else {
    //   if (!formData.title || formData.company.length < 1) {
    //     error.title = true;
    //     errorMgs.title = "Job Title  is Required";
    //   }
    //   else {
    //     error.title = false;
    //     errorMgs.title = null;
    //   }
    // }
  

    setErrors(error);
    setErrorMessages(errorMgs);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post(
      `https://backoffice-staging-2ric45myja-uc.a.run.app/messaging-service/subscribe`, formData,
      {headers: {"Content-Type": "application/json"}}
    ).then((results) => {
      const {data: responseData} = results;
      toast.success(responseData.message);
      setFormData({name: '', email: ''});
      setLoading(false);
    }).catch(err => {
      const error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : "Cannot handle this request at the moment or Subscriber email already exists.";
      toast.error(error);
      setLoading(false);
    });
  }


  return (
    <div className='form-container'>
      <section>
        <div className='imgcontainer'>
          <img src={webinar} className="image" alt="webinar-img" loading="eager"/>
        </div>
        <h1>Let's journey into the future together</h1>
        <h2>We are all intelligent enough to revolutionize logistics in Africa</h2>
        <h2>Let us discuss!</h2>
        <div className='det'>
          <p>Date: Wednesday, 30th August 2023 <br/>
            Time: 2 PM<br/>
            Venue: Google Meet</p>
        </div>
        <p className='para2'>Let us craft the future of Third-Party Logistics at Optimise 1.0</p>

        <p className='para3'>What to expect?</p>
      </section>

      <section className='section2'>
        <ul>
          <li>Unravel the Latest Industry Trends that will revolutionize the Logistics space.</li>
          <li>Discover how digitization and automation increases business profit margin.</li>
          <li className='lastitem'>Gain Insights from Top Guest Speakers.</li>
        </ul>

        <p className='para4'>Limited spots available! Register Now!</p>
      </section>


      <form onSubmit={handleSubmit}>
        <div className='formgroup'>
          <label htmlFor='name'>Name:</label><br/>
          <input type='text' name='name' onChange={handleChange} value={formData.name}/>
          {(errors.name && errorMessages.name) && <div className='error'>{errorMessages.name}</div>}
        </div>
        <br/>
        <div className='formgroup'>
          <label htmlFor='email'>Email:</label><br/>
          <input type='text' name='email' onChange={handleChange} value={formData.email}/>
          {(errors.email && errorMessages.email) && <div className='error'>{errorMessages.email}</div>}
        </div>
        {/* <br/>
        <div className='formgroup'>
          <label htmlFor='company'>Company:</label><br/>
          <input type='text' name='company' onChange={handleChange} value={formData.company}/>
          {(errors.company && errorMessages.company) && <div className='error'>{errorMessages.company}</div>}
        </div>
        <br/>
        <div className='formgroup'>
          <label htmlFor='title'>Job Title:</label><br/>
          <input type='text' name='title' onChange={handleChange} value={formData.title}/>
          {(errors.title && errorMessages.title) && <div className='error'>{errorMessages.title}</div>}
        </div> */}
        <br/>
        <div className='formgroup'>
          <button className='submit' id='btn' type='submit' disabled={isInvalid}>
            Save My Spot
            {loading && <img src={loadIcon} width={18} height={18} alt="spinner"/>}
          </button>
        </div>
      </form>
    </div>

  )
}

export default LandingPage;