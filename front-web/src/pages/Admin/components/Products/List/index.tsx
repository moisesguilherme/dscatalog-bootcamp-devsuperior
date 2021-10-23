import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductsResponse } from 'core/types/product';
import { makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';

import Card from '../Card';

const List = () => {    
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);                
            })
    }, [activePage]);
    

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
            {productsResponse?.content.map(product => (
                    <Card key={product.id} product={product}  />
                ))}                
                {productsResponse && (
                    <Pagination 
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
           

            </div>
        </div>
    )
}

export  default List;