/*=============================================
=                   Imports Section                   =
=============================================*/
const statusCodes=require('http-status-codes');



/*============  End of Imports Section  =============*/



/*=============================================
=                   Create Product                   =
=============================================*/

exports.createProduct=(req,res)=>{
    res.status(statusCodes.OK).json({msg:'create product'});
}

/*============  End of Create Product  =============*/

/*=============================================
=                   Get Single Product                   =
=============================================*/

exports.getSingleProduct=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    res.status(statusCodes.OK).json({msg:'single product',id});
}

/*============  End of Get Single Product  =============*/

/*=============================================
=                   Get All Products                   =
=============================================*/

exports.getAllProducts=(req,res)=>{
    res.status(statusCodes.OK).json({msg:'get all  products'});
}

/*============  End of Get All Products  =============*/



/*=============================================
=                   Update Product                   =
=============================================*/

exports.updateProduct=(req,res)=>{
    res.status(statusCodes.OK).json({msg:'update product'});
}


/*============  End of Update Product  =============*/


/*=============================================
=                   Delete Product                   =
=============================================*/

exports.deleteProduct=(req,res)=>{
    res.status(statusCodes.OK).json({msg:'create product'});
}

/*============  End of Delete Product  =============*/