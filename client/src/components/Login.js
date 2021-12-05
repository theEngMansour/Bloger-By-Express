import React, {useState} from 'react';
import axios from 'axios';

function Login(props) {
  /* 
    Hookes
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* 
    Change Handler
   */
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    setError('');
  };
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  /* 
    Send data to server
   */
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password
    };
    axios.post('/api/auth', data)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('_id', res.data._id);
      axios.defaults.headers.common = {'Authorization': res.data.token};
      props.history.push('/');
    })
    .catch(err => {
      setError(err.response.data.message);
    });
  };

  if(localStorage.getItem('token')){
    props.history.push('/');
  }

  return (
    <div className="column column-60 column-offset-90 card">
      <h1>تسجيل الدخول</h1>
      {error ? (<blockquote> {error}</blockquote>) : ""}
      <form onSubmit={onSubmit}>
        <label>البريد الإكتروني</label>
        <input type="email" value={email} onChange={changeEmailHandler}/>
        <label>كلمة المرور</label>
        <input type="password" value={password} onChange={changePasswordHandler}/>
        <input className="button-primary" type="submit" value="تسجيل الدخول"/>
      </form>
    </div>
  );
}

export default Login;
