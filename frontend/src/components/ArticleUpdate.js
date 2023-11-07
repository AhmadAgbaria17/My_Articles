import React, { useState } from "react";
import "./form.css";
const ArticleUpdate = ({closeUpdateArticle,defaultValue}) => {

  const [inputs, setInputs] = useState(defaultValue||{});
  

  const validateForm=()=>{
    if(inputs.title&&inputs.summary && inputs.body)
    return true;
  return false
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch('http://localhost:5000/article/update', {
        method: 'PUT',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      closeUpdateArticle();

      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error('Failed to update user');
      }
  
      // Close the form after a successful request.
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error, e.g., display an error message to the user.
    }
  };
  

  return (
    <div className="mainForm-container" onClick={(e)=>{
      if(e.target.className==="mainForm-container")
      closeUpdateArticle();
    }}>
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
      
          <div className="form-group">
            <label>Article title: </label>
            <input type="text"  name="title"   value={inputs.title || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label >summary: </label>
            <input type="text" name="summary"  value={inputs.summary || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label >Article body: </label>
            <textarea  name="body"  value={inputs.body || ""} onChange={handleChange}/>
          </div>
          
          <button type="submit" className="btn" onClick={handleSubmit}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default ArticleUpdate;
