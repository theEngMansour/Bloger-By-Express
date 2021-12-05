import React, {useState} from 'react';
import axios from 'axios';

function Home(props) {
  /* 
    Hookes
   */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* 
    Change Handler
   */
  const changeNameHandler = (event) => {
    setName(event.target.value);
    setError('');
  };
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
      name: name,
      email: email,
      password: password,
    };
    axios.post('/api/register', data)
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
      <h1>إنشاء حساب جديد</h1>
      {error ? (<blockquote> {error}</blockquote>) : ""}
      <form onSubmit={onSubmit}>
        <label>الاسم</label>
        <input type="text" value={name} onChange={changeNameHandler} />
        <label>البريد الإكتروني</label>
        <input type="email" value={email} onChange={changeEmailHandler}/>
        <label>كلمة المرور</label>
        <input type="password" value={password} onChange={changePasswordHandler}/>
        <input className="button-primary" type="submit" value="التسجيل"/>
      </form>
    </div>
  );
}

export default Home;
