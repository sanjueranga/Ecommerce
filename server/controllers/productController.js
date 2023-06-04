const { Error } = require('mongoose');
const Product  = require('../models/product')
const mongoose = require('mongoose')
const ErrorHandler = require('../util/errorHandler')
const APIFeatrures = require('../util/APIFeatures')


// add products => /product/new
exports.newProduct = async (req,res,next)=>{
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success : true,
        product
    })
}

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })

})

// get a single product => /products/:id

exports.getSingleProduct = async (req,res,next)=>{

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidId){
        return next(new ErrorHandler("product not found",404))
    }
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        product
    })
}
   
    

    

// update  => /products/update/:id
exports.updateProduct = async (req,res,next)=>{

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
    if(!isValidId){
        return next(new ErrorHandler("product not found",404))
    }
    const product = await Product.findById(req.params.id);
    
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
    


}

// update  => /admin/products/delete/:id

exports.deleteProduct = async (req,res,next)=>{
    
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidId){
        return next(new ErrorHandler("product not found",404))
    }
    const product = await Product.findById(req.params.id);

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
        success: true,
        product
    })
}