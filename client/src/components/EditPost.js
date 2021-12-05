import React, {useState, useEffect} from 'react';
import axios from 'axios';

function EditPost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  /* 
    Effect
  */
  useEffect(() => {
    let postId = props.match.params.id;
    axios.get(`/api/posts/${postId}`)
    .then(res => {
      setTitle(res.data.title);
      setContent(res.data.content)
      setAuthorId(res.data.author._id)
      setIsLoading(false)
    });
  },[]);

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
    axios.put(`/api/posts/${props.match.params.id}`, data)
    .then(res => {;
      props.history.push(`/post/view/${props.match.params.id}`);
    })
    .catch(err => {
      setError(err.response.data.message);
    });
  };

  if(!localStorage.getItem('token')){
    props.history.push('/');
  }

  if(isLoading){
    return(<h4>الرجاء الإنتظار</h4>);
  }

  if(localStorage.getItem('_id') !== authorId){
    return(<blockquote>خطأ 403</blockquote>);
  }

  return (
    <div className="column column-60 column-offset-90 card">
      <h1>تعديل تدوينة</h1>
      {error ? (<blockquote> {error}</blockquote>) : ""}
      <form onSubmit={onSubmit}>
        <label>العنوان</label>
        <input type="text" value={title} onChange={changeTitleHandler}/>
        <label>المحتوى</label>
        <textarea value={content} onChange={changeContentdHandler}></textarea>
        <input className="button-primary" type="submit" value="تعديل تدوينة"/>
      </form>
    </div>
  );
}

export default EditPost;
