import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import Select from 'react-select';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/product';
import './styles.scss'

type Props = {
    name?: string;
    category?:  Category;
    handleChangeName: (name: string) => void;
    handleChangeCategory: (category: Category) => void;
    clearFilters: () => void;
}

const ProductFilters = ({ 
    name, 
    handleChangeName,
    handleChangeCategory,
    clearFilters,
    category
}: Props) => {
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({url: '/categories'})
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);
    

    return (
        <div className="card-base product-filters-containers">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Pesquisar produto"
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                    name="categories"
                    key={`select-${category?.id}`}
                    value={category}
                    isLoading={isLoadingCategories}
                    options={categories}
                    getOptionLabel={(option: Category) => option.name}
                    getOptionValue={(option: Category) => String(option.id)}
                    className="filter-select-container"
                    classNamePrefix="product-categories-select"
                    placeholder="Categorias"
                    inputId="categories"
                    onChange={value => handleChangeCategory(value as Category)}
                    isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
            >
               LIMPAR FILTRO
            </button>
        </div>
    )
}

export default ProductFilters;