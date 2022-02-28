import React, { useState } from "react";
import ReactDOM from "react-dom";
import UserDataComponent from './Components/UserDataComponent'
import img from './Assets/wissenlogo.PNG'


import "./App.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false)


  // User Login info
  const database = [
    {
      username: "eve.holt@reqres.in",
      password: "cityslicka"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/JSON',
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          alert("Invalid username /password");
        } else {
          localStorage.setItem("token",result.token);
          alert("You are logged in.");
        }
      });

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="container-fluid col-md-12 offset-5">
      <form onSubmit={handleSubmit}>
      <div className="form-group inputWrapper">
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            className="form-rounded"
            style={{ width: '300px', height: '50px' }}
            name="uname"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group inputWrapper">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            className="form-rounded"
            style={{
              width: '300px',
              height: '50px',
            }}
            name="pass"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"              
              onChange={e => setIsChecked(e.target.checked)} value={isChecked}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              By creating or logging into an account, you are agreeing with our
              <span className="bold-text"> Terms & Conditions </span> and
              <span className="bold-text">Privacy Policys</span>
            </label>
          </div>
          <br />
          <div>
            <button onClick={handleSubmit} className="btn btn-light text-primary" disabled={!isChecked}>
              Next
            </button>
          </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title"><img src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"></img></div>
        {isSubmitted ? <div><UserDataComponent/></div> : renderForm}
      </div>
    </div>
  );
}

export default App;