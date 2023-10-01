const express = require("express");
const router = express.Router();

const articleServices = require("../Service/articleService")



router.get("/", articleServices.getAllArticles)

router.post("/save", articleServices.postOneArticles)

router.delete("/delete/:id",articleServices.articleDelete);

router.put("/update",articleServices.articleUpdate);


module.exports = router