import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { apiKeys } from '../../apiKeys';
import { useStateValue } from '../../StateProvider';

const LoginForm = () => {
  const [values, setValues] = useState({
    emailAddress: '',
    password: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  // 'data' is an object where the keys are the names of the form fields,
  // and the values are the form input values
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        // set current user in localStorage
        localStorage.setItem('userIsLoggedIn', true)
        localStorage.setItem('currentUser', res._id)

        dispatch({
          type: 'AUTH_USER',
          item: {
            isLoggedIn: true,
            firstName: res.firstName,
            lastName: res.lastName,
            emailAddress: res.emailAddress,
            googleId: res.googleId,
            teamsList: res.teamsList,
            id: res._id,
          },
        });
      })
      .then(() => {
        // redirect to home page
        history.push('/');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Auth Form won\'t fetch, error:', err));
    // alert(JSON.stringify(data))
    // redirect to Homepage after successful login
    // history.push('/')
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    const valuesCopy = { ...values };
    valuesCopy[name] = value;
    setValues(valuesCopy);
  };

  // eslint-disable-next-line no-console
  const googleOnFailure = (res) => console.log(res);

  const googleOnSuccess = (res) => {
    dispatch({
      type: 'AUTH_USER',
      item: {
        firstName: res.firstName,
        lastName: res.lastName,
        googleID: res.googleID,
        emailAddress: res.email,
        id: res.id,
        google: true,
      },
    });
    history.push('/');
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="E-mail"
            name="emailAddress"
            value={values.emailAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
      </form>

      <GoogleLogin
        clientId={apiKeys.GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={googleOnSuccess}
        onFailure={googleOnFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default LoginForm;
