import React, { useState, useEffect } from "react";
import {useAuthUser } from "react-auth-kit";
import "./SharedWith.css"
import "./form.css";


const SharedWith = ({closeSharedwith,currentArticle}) => {

  const [allUsers,setAllUsers] = useState([{}]);
  const [textSend, setTextSend]= useState("");
  const [showTextSend , setShowTextSend] = useState (false);
  
  const auth = useAuthUser();
  const currentuser = auth().username


  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5000/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setAllUsers(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSend = async (data,idx) => {
    setTextSend("the article sent to "+ data.username);
    setShowTextSend(true);
    currentArticle.sharedWith.push(data.username);

    // Remove duplicates from the sharedWith array using a Set
    currentArticle.sharedWith = Array.from(new Set(currentArticle.sharedWith));


    try {
      const response = await fetch('http://localhost:5000/article/update', {
        method: 'PUT',
        body: JSON.stringify(currentArticle),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Close the form after a successful request.
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error, e.g., display an error message to the user.
    }

  }



  return (
    <div className="mainForm-container" onClick={(e)=>{
      if(e.target.className==="mainForm-container")
      closeSharedwith();
    }}>
      <div className="mainForm">
      
          <div className="form-group">
                {allUsers.length &&
                allUsers.map((d,i)=>(
                  <div className="oneuser">
                     {(d.username!==currentuser)?<h3>{d.username}</h3>:""}
                      {(d.username!==currentuser)?<i  class="fa-regular fa-share-from-square card-icon-c" onClick={(e)=> handleSend(d,i)}></i>:""}  
                  </div>
                ))}
                {showTextSend&&(<h5 className="articlesentAB">{textSend}</h5>)}
          </div>  
      </div>
    </div>
  );
}

export default SharedWith;
