const Product = require('../models/product.model')
const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse, catchResponse, getFileExtension, getBaseUrl } = require('../utility')
const { addProductValidation } = require('./validation/product.validation')
const fs = require('fs');

exports.getall = async function (req, res) {
    try {
        let product = await Product.find()
        if (product == null) {
            return errorResponse(res, {}, 'There is No Contacts available', 400)
        }

        if (product.length > 0) {
            for (let i = 0; i < product.length; i++) {
                if (product[i].product_image != '') {
                    let base_url = req.protocol + "://" + req.headers.host
                    let image = `/images/product_image/${product[i].product_image}`;
                    product[i].product_image = `${base_url}${image}`;
                }
            }
        }

        return successResponse(res, product, 'Product details', 200)
    } catch (e) {
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.add = async function (req, res) {
    const { error, isValid } = addProductValidation(req.body)

    if (!isValid) {
        return errorResponse(res, error, "Invalid Request", 400)
    }

    try {
        let image_name = ''
        if (req.files != null) {
            let image = req.files.product_image
            image_name = req.files.product_image.name
            let file_extension = getFileExtension(image_name)
            image_name = `${uuidv4()}.${file_extension}`

            await image.mv(`public/images/product_image/${image_name}`);
        }

        let data = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            category: req.body.category,
            brand: req.body.brand,
            product_image: image_name,
        };

        const product = new Product(data)
        const resData = await product.save(data)
        return successResponse(res, resData, 'Product added successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.update = async function (req, res) {
    const { error, isValid } = addProductValidation(req.body)

    if (!isValid) {
        return errorResponse(res, error, "Invalid Request", 400)
    }

    try {
        let id = req.params.id
        let product = await Product.find({ "_id": id })
        if (product == null) {
            return errorResponse(res, {}, 'Product does not exist', 400)
        }

        let image_name = product[0].product_image; // Use the current image name as default

        if (req.files != null && req.files.product_image) {
            let image = req.files.product_image
            image_name = req.files.product_image.name
            let file_extension = getFileExtension(image_name)
            image_name = `${uuidv4()}.${file_extension}`

            await image.mv(`public/images/product_image/${image_name}`);

            // Delete the old image file
            const filePath = `public/images/product_image/${product[0].product_image}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('File does not exist.');
                    } else {
                        console.error('Error deleting file:', err);
                    }
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        let updatedData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            category: req.body.category,
            brand: req.body.brand,
            product_image: image_name,
        };

        const resData = await Product.findByIdAndUpdate(
            id, updatedData
        )
        return successResponse(res, resData, 'Product Updated successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.delete = async function (req, res) {
    try {
        let id = req.params.id
        let product = await Product.find({ "_id": id })
        if (product == null) {
            return errorResponse(res, {}, 'Product does not exists', 400)
        }
        fs.unlink(`public/images/product_image/${product[0].product_image}`, (err) => {
            console.log("error in remove image from file system in Update data ", err);
        });

        await Product.deleteOne({ "_id": id })

        return successResponse(res, product, 'Product deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.get = async function (req, res) {
    try {
        let id = req.params.id
        let product = await Product.find({ "_id": id })
        if (product == null) {
            return errorResponse(res, {}, 'Product does not exists', 400)
        }
        if (product[0].product_image) {
            let base_url = req.protocol + "://" + req.headers.host
            let image = `/images/product_image/${product[0].product_image}`;
            product[0].product_image = `${base_url}${image}`;
        }

        return successResponse(res, product, 'Product deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}