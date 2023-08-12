import {Fragment} from 'react';
import {Toaster} from "react-hot-toast";
import './App.css';
import LandingPage from './LandingPage';

function App() {


  return (
    <Fragment>
      <Toaster containerStyle={{zIndex: '99999999'}} position="top-right" reverseOrder={false}/>
      <div className="container">
        <LandingPage/>
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
