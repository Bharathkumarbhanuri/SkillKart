import React from 'react'
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const {productid} = useParams()
    return (
        <div>Product Details
            <h1>product: {productid}</h1>
        </div>
    )
}

export default ProductDetails
