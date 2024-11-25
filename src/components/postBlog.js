import React, { useState, useEffect } from 'react';
import "../styles/postblog.css"; 

const Card = ({ title, description, imageUrl, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Blog Image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <button onClick={onEdit} className="edit-button">Edit</button>
          <button onClick={onDelete} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

const PostBlog = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageOption, setImageOption] = useState('upload');
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }
  }, [blogs]);

  const handleClearBlogs = () => {
    localStorage.removeItem('blogs');
    setBlogs([]);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (imageOption === 'url' && imageUrl) {
      const isValidUrl = validateUrl(imageUrl);
      if (!isValidUrl) {
        alert('Invalid URL: The image URL you provided is not valid.');
        return;
      }
    }

    setIsSubmitting(true);
    const newBlog = {
      title,
      content,
      imageUrl: imageOption === 'url' ? imageUrl : image ? URL.createObjectURL(image) : '',
    };

    try {
      if (editingIndex !== null) {
        const updatedBlogs = [...blogs];
        updatedBlogs[editingIndex] = newBlog;
        setBlogs(updatedBlogs);
      } else {
        setBlogs([...blogs, newBlog]);
      }
      resetForm();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Error posting blog: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setImageUrl('');
    setEditingIndex(null);
  };

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      const blogToEdit = blogs[index];
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImageUrl(blogToEdit.imageUrl);
      setImage(null);
      setImageOption('url');
      setEditingIndex(index);
    } else {
      resetForm();
    }

    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    if (onClose) onClose();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
    }
  };

  return (
    <div>
      <section class="blog-intro">
  <div class="intro-container">
    <h1 class="intro-title">Welcome to Our Blog</h1>
    <p class="intro-description">
      Stay updated with the latest trends, insights, and stories from the world of technology, lifestyle, and more. Our blog is here to bring you fresh perspectives and ideas that inspire and inform.
    </p>
    <a href="#explore" class="intro-btn">Explore Our Posts</a>
  </div>
</section>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingIndex !== null ? 'Edit Blog' : 'Post a New Blog'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Content:
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="5"
                  required
                />
              </label>

              <div>
                <label>
                  <input
                    type="radio"
                    name="image-option"
                    value="upload"
                    checked={imageOption === 'upload'}
                    onChange={() => setImageOption('upload')}
                  />
                  Upload Image
                </label>
                <label>
                  <input
                    type="radio"
                    name="image-option"
                    value="url"
                    checked={imageOption === 'url'}
                    onChange={() => setImageOption('url')}
                  />
                  Provide Image URL
                </label>
              </div>

              {imageOption === 'upload' ? (
                <label>
                  Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <label>
                  Image URL:
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                  />
                </label>
              )}

              {(image || imageUrl) && (
                <div className="image-preview">
                  <p>Image Preview:</p>
                  <img
                    src={image ? URL.createObjectURL(image) : imageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                  />
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="publish">
                {editingIndex !== null ? 'Save Changes' : 'Publish Blog'}
              </button>
              <button type="button" onClick={handleCloseModal} className="exit">
                Exit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="cards-container">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <Card
              key={index}
              title={blog.title}
              description={blog.content.substring(0, 100) + '...'}
              imageUrl={blog.imageUrl || 'default-image.jpg'}
              onEdit={() => handleOpenModal(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <p>No blogs yet. Create one above!</p>
        )}
      </div>
<div class='fun'>
      <button onClick={() => handleOpenModal()} className="New">
        Create New
      </button>

      <button onClick={handleClearBlogs} className="clear">
        Clear All
      </button>
</div>
    </div>
  );
};

export default PostBlog;
