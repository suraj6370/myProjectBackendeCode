const express = require('express')

const router = express.Router();

const {getSubCategoryById,createSubCategory,getSubCategory,getSubAllCategory,
updateSubCategory, removeSubCategory} = require("../controllers/subcategory");

router.param("subCategoryId", getSubCategoryById);  

router.post("/subcategory/create/",createSubCategory);

router.get("/subcategory/:subCategoryId", getSubCategory);
router.get("/subcategory", getSubAllCategory);

//update
router.put("/subcategory/:subCategoryId",updateSubCategory);

//delete

router.delete("/subcategory/:subCategoryId",removeSubCategory);


module.exports = router;