import React from 'react';
import './landingPage.css'
import webinar from './Assets/Webinar-Banner.png';

function landingPage(props) {
    
  return (
    <div className='form-container'>
        <form onSubmit={props.submit}>
        <img src={webinar} className="image" alt="webinar-img" />
        <h1>Step into the future with us!</h1>
        <h2>We are optimising the Logistics Operations in Africa.</h2>
        <h2>Join the Conversation!</h2>
        <div className='det'>
            <p>Date: Wednesday, 30th August 2023 <br/>
            Time: 2 PM<br/> 
            Venue: Google Meet</p>
        </div>
        <p className='para2'>Discover the Future of Third-Party Logistics at Optimise 1.0</p>

        <p className='para3'>What to expect?</p>
        <ul>
            <li>Unravel the Latest Industry Trends that will revolutionize the Logistics space.</li>
            <li>Discover how digitization and automation increases business profit margin.</li>
            <li className='lastitem'>Gain Insights from Top Guest Speakers.</li>
        </ul>

        <p className='para4'>Limited spots available! Register Now!</p>
        
        <div className='inputs'>
            <label htmlFor='name'>Name:</label>&nbsp;
            <input type='text' name='name' onChange={props.name}/>
            {props.errors.name && <div className='error'>{props.errors.name}</div>}
            <br/>
            <label htmlFor='email'>Email:</label>&nbsp;
            <input type='email' name='email' onChange={props.email}/>
            {props.errors.email && <div className='error'>{props.errors.email}</div>}
            <br/>
            <button className='submit' id='btn' type='submit'>Save My Spot</button>
        </div>
        
    </form>
    </div>
    
  )
}

export default landingPage