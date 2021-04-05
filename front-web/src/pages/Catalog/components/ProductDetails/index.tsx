import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/product';
import { makeRequest } from '../../../../core/utils/request';
import './styles.scss';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct]  = useState<Product>();

    console.log(product);

    useEffect(() => {
        makeRequest({ url: `/products/${productId}`})
            .then(response => setProduct(response.data));
    }, [productId]);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
               <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">voltar</h1>
               </Link>
               <div className="row">
                   <div className="col-6 pr-5">
                       <div className="product-details-card text-center">
                            <img src={product?.imgUrl} alt={product?.name}/>
                       </div>
                       <h1 className="product-details-name">
                        {product?.name}
                       </h1>
                        { product?.price && <ProductPrice price={product?.price}/>}
                   </div>
                   <div className="col-6 product-details-card">
                       <h1 className="product-description-title">
                           Descrição do produto
                        </h1>
                        <p className="product-description-text">
                           {product?.description}
                        </p>
                   </div>
               </div>
            </div>
        </div>
    );

};


export default ProductDetails;
