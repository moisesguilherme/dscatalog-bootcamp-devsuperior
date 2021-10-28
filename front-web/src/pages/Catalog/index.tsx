import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/product';
import { makePrivateRequest } from 'core/utils/request';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';

import './styles.scss';

const Catalog = () => {    
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: filter?.name,
            categoryId: filter?.categoryId
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
                
            })
    }, [activePage])
    
    useEffect(() => {
        getProducts();
    }, [getProducts]);
    
    return (
        (
            <div className="catalog-container">
                <div className="d-flex justify-content-between">
                    <h1 className="catalog-title">
                        Catálogo de produtos
                    </h1> 
                    <ProductFilters onSearch={filter => getProducts(filter)}/>      
                </div>
                <div className="catalog-products">
                    {isLoading ? <ProductCardLoader/> : (
                        productsResponse?.content.map(product => (
                            <Link to={`/products/${product.id}`} key={product.id}>
                                <ProductCard product={product}/>
                            </Link>
                        ))
                    )}
                </div>
                
                {productsResponse && (
                    <Pagination 
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
                
            </div>
        
        )
    )
};

export default Catalog;