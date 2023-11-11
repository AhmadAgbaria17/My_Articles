const express = require("express");
const router = express.Router();

const articleServices = require("../Service/articleService")

router.get("/getarticleshare", articleServices.getAllArticles)


router.get("/:username", articleServices.getAlluserArticles)

router.post("/save", articleServices.postOneArticles)

router.delete("/delete/:id",articleServices.articleDelete);

router.put("/update",articleServices.articleUpdate);


module.exports = router