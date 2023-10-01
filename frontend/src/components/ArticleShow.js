import React, { useState } from "react";
import "./form.css";
const ArticleShow = ({closeShowArticle,defaultValue}) => {

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


  

  return (
    <div className="mainForm-container" onClick={(e)=>{
      if(e.target.className==="mainForm-container")
      closeShowArticle();
    }}>
      <div className="mainForm">
      
          <div className="form-group">
            <h2>title: {inputs.title}</h2>
          </div>
          <hr/>
          <div className="form-group">
            <h2 >summary: {inputs.summary} </h2>
          </div>
          <hr/>
          <div className="form-group">
            <h3 >body: {inputs.body } </h3>
          </div>
          
        
      </div>
    </div>
  );
};

export default ArticleShow;
