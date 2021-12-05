import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';

function Header(props){

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    axios.defaults.headers.common = {'Authorization': ''};
    props.history.push('/');
  }

  if(localStorage.getItem('token')){
    return (
      <div className="navbar">
        <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/post/create">إنشاء تدوينة</Link></li>
            <li><a href="#logout" onClick={logout}>تسجيل الخروج</a></li>
        </ul>
    </div>
    );
  }

  return (
    <div className="navbar">
        <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="login">تسجيل الدخول</Link></li>
            <li><Link to="register">التسجيل</Link></li>
        </ul>
    </div>
  );
}

export default withRouter(Header);
