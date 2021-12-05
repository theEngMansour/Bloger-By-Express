import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function ViewPost(props){
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [error, setError] = useState('');
    
    // Get id post from link and find on data
    useEffect(() => {
        let postId = props.match.params.id;
        axios.get(`/api/posts/${postId}`)
        .then(res => {
            setPost(res.data);
            setError('');
        })
        .catch(err => {
            setError(err.response.data.message);
        });
    },[]);

    const changeCommentHandler = (e) => {
        setComment(e.target.value);
        setCommentError('');
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        let data = { content: comment };
        axios.post(`/api/comments/${props.match.params.id}`, data)
        .then(res => {
            
            post.comments.push({
                _id: res.data._id,
                content: res.data.content,
                author: { _id: localStorage.getItem('_id') }
            });
            setPost(post)
            setComment('')
            setCommentError('')
        })
        .catch(err => {
            if(err.response){
                console.log(err.response.data)
            } else if (err.request){
                console.log(err.request)
            } else {
                console.log('Error', err.message)
            }
            console.log(err.config)
        });
    }

    const renderComments = () => {
        let comments = <p>لايوجد تعليقات.</p>;
        if(post.comments.length){
            comments = post.comments.map(comment => {
                return(
                    <p key={comment._id}>
                        <strong className="title">
                         {comment.author._id === localStorage.getItem('_id') ? 'أنا' : comment.author.name}
                        </strong>
                        <br/>
                        {comment.content}
                        <button onClick={() => {
                            axios.delete(`/api/comments/${post._id}/${comment._id}`)
                            .then(res => {
                                props.history.push(`/`);
                            })
                        }}>حذف</button>
                    </p>
                );
            })
        }
        return comments;
    }

    const renderCommentForm = () => {
        if(!localStorage.getItem('token')){
            return(<p>الرجاء تسجيل الدخول للتعليق على هذه التدوينة.</p>);
        }
        return(
            <div>
                <h4>إضافة تعليق</h4>
                {commentError}
                <form onSubmit={onSubmit}>
                    <textarea value={comment} onChange={changeCommentHandler}></textarea>
                    <input className="button-primary" type="submit" value="إرسال" />
                </form>
            </div>
        );
    }

    const deletePost = () => {
        axios.delete(`/api/posts/${post._id}`)
        .then(res => {
            props.history.push('/');
        })
    }

    const renderActions = () => {
        if(localStorage.getItem('token') && localStorage.getItem('_id') === post.author._id){
            return (
                <span>
                    <Link to={`/post/edit/${post._id}`}>
                        <button>تعديل</button>
                    </Link>
                    <button onClick={deletePost}>حذف</button>
                </span>
            )
        }
    }

    if(error){
        return(<blockquote>{error}</blockquote>)
    }

    if(!post.title){
        return(<h4>الرجاء الإنتظار</h4>);
    }

    return (
        <div className="column">
            <h4>{post.title}</h4>
            <h6 className="title">{post.author.name}</h6>
            <p>{post.content}</p>
            {renderActions()}
            <hr/>
            <h4>التعليقات</h4>
            {renderComments()}
            {renderCommentForm()}
        </div>
    );
}
export default ViewPost;