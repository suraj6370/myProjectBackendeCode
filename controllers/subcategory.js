const SubCategory = require("../models/subcategory")



  

  exports.createSubCategory = 
  (req, res) =>
   {
   
    const category = new SubCategory(req.body);
   
    category.save((err, category) => 
    {
      if (err) 
      {

        if(err.code === 11000 || err.code === 11001)
        {
          return res.status(400).json({
            error: "Duplicate Value " +req.body.name +",Value must be unique",
           
          });
        }
        else
        {
          return res.status(400).json({
            error: "NOT able to save category in DBs",
           
          });
        }
        }

       
      res.json({ category });
    });
  };
  
  exports.getSubCategoryById = (req, res, next, id) => 
  {
    SubCategory.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;  
      next();
    });
  };
  
  
  exports.getSubCategory = (req, res) => {
    return res.json(req.category);
  };
  
  exports.getSubAllCategory =
   (req, res) => 
  {
    SubCategory.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };
  
  exports.updateSubCategory = (req, res) => {
    
    const category = req.category;
   
    category.name = req.body.name;
  
    category.save((err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedCategory);
    });
  };
  
  exports.removeSubCategory = (req, res) => {
   
   
    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {

        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };

  