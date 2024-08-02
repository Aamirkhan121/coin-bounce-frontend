import React, { useState, useEffect } from 'react';
import styles from "./Blog.module.css";
import { getAllBlogs } from '../../api/internal';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getAllBlogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();
    setBlogs([]);
  }, []);

  if (blogs.length === 0) {
    return <Loader text={"Blogs"} />;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-12 mb-4">
            <div className={`card ${styles.blog}`} onClick={() => navigate(`/blog/${blog._id}`)}>
                <h5 className="card-title text-white">{blog.title}</h5>
              <img src={blog.photo} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <p className="card-text">{blog.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
    