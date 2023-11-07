import React, { useState } from "react";
import "./form.css";
const ArticleShow = ({closeShowArticle,defaultValue}) => {

  const [inputs] = useState(defaultValue||{});
  


  

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
