import React, {useState} from 'react';
import axios from 'axios';

function CreatePost(props) {
  /* 
    Hookes
   */
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  /* 
    Change Handler
   */
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
    setError('');
  };
  const changeContentdHandler = (event) => {
    setContent(event.target.value);
    setError('');
  };

  /* 
    Send data to server
   */
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: title,
      content: content
    };
    axios.post('/api/posts', data)
    .then(res => {;
      props.history.push('/');
    })
    .catch(err => {
      setError(err.response.data.message);
    });
  };

  if(!localStorage.getItem('token')){
    props.history.push('/');
  }

  return (
    <div className="column column-60 column-offset-90 card">
      <h1>إنشاء تدوينة</h1>
      {error ? (<blockquote> {error}</blockquote>) : ""}
      <form onSubmit={onSubmit}>
        <label>العنوان</label>
        <input type="text" value={title} onChange={changeTitleHandler}/>
        <label>المحتوى</label>
        <textarea value={content} onChange={changeContentdHandler}></textarea>
        <input className="button-primary" type="submit" value="إنشاء تدوينة"/>
      </form>
    </div>
  );
}

export default CreatePost;
