import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../components/header";
import ArticleAdd from "../components/ArticleAdd";
import ArticleUpdate from "../components/ArticleUpdate";
import ArticleShow from "../components/ArticleShow";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import SharedWith from "../components/SharedWith";

const Home = () => {
  const auth = useAuthUser();

  const [compSharedWith, setCompSharedWith] = useState(false);
  const [compAddArticle, setCompAddArticle] = useState(false);
  const [compEditArticle, setCompEditArticle] = useState(false);
  const [compShowArticle, setCompShowArticle] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [cardToShare, setCardToShare] = useState(null);
  const [my_article_data, setMy_article_data] = useState([{}]);
  const [my_shared_article, setMy_shared_article] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:5000/article/${auth().username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      setMy_article_data(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData2();
  }, []);

  async function fetchData2() {
    try {
      const response1 = await fetch(
        `http://localhost:5000/article/getarticleshare`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData1 = await response1.json();
      //setMy_article_data(jsonData);
      const articlesSharedWith = jsonData1.filter((article) => {
        return article.sharedWith.includes(auth().username);
      });
      setMy_shared_article(articlesSharedWith);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDelete = (idx) => {
    fetch(`http://localhost:5000/article/delete/${idx}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        fetchData();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditCard = (idx) => {
    setCardToEdit(idx);

    setCompEditArticle(true);
  };

  const handleSharedWith = (idx) => {
    setCardToShare(idx);

    setCompSharedWith(true);
  };

  const handleShowCard = (idx) => {
    setCardToEdit(idx);
    setCompShowArticle(true);
  };

  const handleDeleteshare = async (data)=>{
    data.sharedWith = data.sharedWith.filter(user => user !== auth().username); 

    try {
      const response = await fetch('http://localhost:5000/article/update', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchData2();

      // Close the form after a successful request.
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error, e.g., display an error message to the user.
    }

  }

  const signout = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signout();
    navigate("/");
  };

  return (
    <div>
      <Header />

      <main className="main-content">
        <div className="main-title">
          <h3>My Articles:</h3>
          <i
            onClick={() => setCompAddArticle(true)}
            className="fa-solid fa-plus add-btn"
          ></i>
        </div>
        <hr />

        <div className="card-content">
          {my_article_data.length &&
            my_article_data.map((d, i) => (
              <div
                onClick={(e) => {
                  if (
                    e.target.className !==
                      "fa-regular fa-pen-to-square card-icon" &&
                    e.target.className !==
                      "fa-regular fa-share-from-square card-icon" &&
                    e.target.className !==
                      "fa-regular fa-trash-can card-icon delete-icon"
                  )
                    handleShowCard(i);
                }}
                className="mycard"
              >
                <div className="father-title">
                  <h2>Title: {d.title}</h2>
                  <div className="title-icon">
                    <i
                      class="fa-regular fa-pen-to-square card-icon"
                      onClick={(e) => handleEditCard(i)}
                    ></i>
                    <i
                      class="fa-regular fa-share-from-square card-icon"
                      onClick={(e) => handleSharedWith(i)}
                    ></i>
                    <i
                      class="fa-regular fa-trash-can card-icon delete-icon"
                      onClick={() => handleDelete(d._id)}
                    ></i>
                  </div>
                </div>
                <hr />
                <p>Summary: {d.summary}</p>
              </div>
            ))}
        </div>

        <div>
          {compAddArticle && (
            <ArticleAdd
              closeAddArticle={() => {
                setCompAddArticle(false);
                fetchData();
              }}
            />
          )}
        </div>

        <div>
          {compEditArticle && (
            <ArticleUpdate
              closeUpdateArticle={() => {
                setCompEditArticle(false);
                setCardToEdit(null);
                fetchData();
              }}
              defaultValue={cardToEdit !== null && my_article_data[cardToEdit]}
            />
          )}
        </div>

        <div>
          {compSharedWith && (
            <SharedWith
              closeSharedwith={() => {
                setCompSharedWith(false);
                setCardToShare(null);
                fetchData();
              }}
              currentArticle={
                cardToShare !== null && my_article_data[cardToShare]
              }
            />
          )}
        </div>

        <div>
          {compShowArticle && (
            <ArticleShow
              closeShowArticle={() => {
                setCompShowArticle(false);
                setCardToEdit(null);
                fetchData();
              }}
              defaultValue={cardToEdit !== null && my_article_data[cardToEdit]}
            />
          )}
        </div>
      </main>

      <main className="main-content">
        <div className="main-title">
          <h3>Articles shared with me:</h3>
        </div>
        <hr />
        <div className="card-content">
          {my_shared_article.length &&
            my_shared_article.map((d, i) => (
              <div className="mycard">
                <p>from: {d.username}</p>
                <hr/>
                <p>Title: {d.title}</p>
                <hr />
                <p>Summary: {d.summary}</p>
                <hr/>
                <p>body: {d.body}</p>
                <center>
                  <i
                        class="fa-regular fa-trash-can card-icon delete-icon"
                        onClick={() => handleDeleteshare(d)}
                      ></i>
                </center>
              </div>
            ))}
        </div>
      </main>
      <center>
        <button onClick={logout} className="logout">
          Log Out
        </button>
      </center>
    </div>
  );
};

export default Home;
