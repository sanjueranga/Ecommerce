const { Error } = require('mongoose');
const Product  = require('../models/product')
const mongoose = require('mongoose')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')



const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


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
   


    res.status(200).json({
        success: true,
        productsCount,
        // resPerPage,
        filteredProductsCount,
        products
    })

})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
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


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})