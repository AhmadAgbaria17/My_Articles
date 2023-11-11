const Article = require("../../models/articleSchema")


const getAllArticles= (req,res) => {
  Article.find(function(err,response){
    console.log(response)
    res.json(response)
    
  });
}

const getAlluserArticles= (req,res) => {
  Article.find({username:req.params.username},function(err,response){
    res.json(response)
  });
}

const postOneArticles = (req,res)=>{
  const article = new Article(req.body);

  article.save().then(result=>{
    res.redirect("/home")
  })
  .catch(err=>{
    console.log(err);
  })
}

const articleUpdate = (req,res)=>{
  const article = new Article(req.body);

  Article.findByIdAndUpdate(article._id, article, { new: true })
      .then(updatedArticle => {
        if (!updatedArticle) {
          return res.status(404).send("Article not found");
        }
        res.redirect("/");
      })
      .catch(err => {
        console.error("Error updating article:", err);
        res.status(500).send("Internal server error");
      });
}




const articleDelete=  (req, res) => {
  Article.findByIdAndDelete(req.params.id) //mongo use
      .then(result => {
          res.redirect("/")
      })
      .catch(err => {
          console.log(err);
      });
}






module.exports= {
  getAlluserArticles,
  postOneArticles,
  articleDelete,
  articleUpdate,
  getAllArticles

}