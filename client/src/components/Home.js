import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /* 
    Upload posts on home
   */
  useEffect(() => {
    return fetchPosts();
  },[]);

  /* 
    Fetch Posts
   */
  const fetchPosts = () => {
    axios.get('/api/posts')
    .then(res => {
      setPosts(res.data);
      setError('');
      setTimeout(() => setIsLoading(false), 500);
    })
    .catch(err => {
      setError(err.response.data.message);
      setIsLoading(false);
    });
  }

  if(isLoading){
    return(<h4>الرجاء الإنتظار</h4>);
  }
  if(error){
    return(<blockquote>{error}</blockquote>);
  }
  if(posts.length < 1){
    return(<h4>لايوجد تدوينات</h4>);
  }

  return posts.map(post => {
    return (
      <div key={post._id} className=" card">
        <div className="column column-50 ">
          <h4 className="title">{post.title}</h4>
          <h6 className="sub">{post.author.name}</h6>
          <p>{post.content.substr(0,120)}</p>
          <Link to={`/post/view/${post._id}`}>
            <button className="button-primary">إقرأ المزيد</button>
          </Link>
        </div>
      </div>
    )
  });
}

export default Home;
