const { Error } = require('mongoose');
const mongoose = require('mongoose');
const Product  = require('../models/product')
const ErrorHandler = require('../util/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIfeatures = require('../util/apiFeatures')


// add products => /product/new
exports.newProduct = catchAsyncErrors(async (req,res,next)=>{
    
   
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
    res.status(201).json({
        success : true,
        product
    })
})

// get all product => /products
exports.getProducts =catchAsyncErrors( async (req,res,next)=>{

    const products = await Product.find();

    res.status(200).json({
        success : true,
        count:products.length,
        products

    })
})

// get a single product => /products/:id

exports.getSingleProduct = catchAsyncErrors(async (req,res,next)=>{

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidId){
        return next(new ErrorHandler("product not found",404))
    }
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        success: true,
        product
    })
})
   
    

    

// update  => /products/update/:id
exports.updateProduct =catchAsyncErrors(async (req,res,next)=>{

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
    


})

// update  => /admin/products/delete/:id

exports.deleteProduct =catchAsyncErrors( async (req,res,next)=>{
    
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
})