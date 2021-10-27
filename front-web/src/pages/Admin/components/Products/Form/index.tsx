import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makePrivateRequest} from 'core/utils/request';
import { toast } from 'react-toastify';
import { Category } from 'core/types/product';
import BaseForm from '../../BaseForm';
import Select from 'react-select'
import PriceField from './PriceField';
import './styles.scss';
import ImageUpload from '../ImageUpload';

export type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}


const Form = () => {    
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');

    const isEditing = productId !== 'create';
    const formTitle =  isEditing ? "Editar produto" : "cadastrar um produto";
          


    useEffect(() => {
      if(isEditing){
        makePrivateRequest({ url: `/products/${productId}` })
        .then(response => {
          setValue('name', response.data.name);
          setValue('price', response.data.price);
          setValue('description', response.data.description);
          setValue('categories', response.data.categories);

          setProductImgUrl(response.data.imgUrl);
        })

        
      }
    }, [productId, isEditing, setValue, categories]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makePrivateRequest({url: '/categories'})
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);
        
    
    const onSubmit = (data: FormState) => {
        
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl
        }

        makePrivateRequest({
                url: isEditing ? `/products/${productId}`  : '/products',
                method: isEditing ? 'PUT' : 'POST', 
                data: payload
            })
            .then(() => {
                toast.info("Produto salvo com sucesso!");
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            })
    }
    
    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}
            >
            <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input              
                                {...register("name", { 
                                    required: 'Campo obrigatório',
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres'}
                                })} 
                                type="text" 
                                className="form-control input-base" 
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">                                          
                            <Controller
                                    name="categories"
                                    control={control}
                                    rules={({ required: true})}
                                    render={({ field: {onChange, value, name, ref} }) =>  <Select
                                        getOptionLabel={(option: Category) => option.name}
                                        getOptionValue={(option: Category) => String(option.id)}
                                        classNamePrefix="categories-select" 
                                        placeholder="Categorias"
                                        isLoading={isLoadingCategories}
                                        options={categories}
                                        value={value}
                                        onChange={onChange}        
                                        isMulti
                                    />                                    
                                }
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}

                        </div>    
                        <div className="margin-bottom-30">
                            <PriceField control={control} />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>    
                        <div className="margin-bottom-30">
                            <ImageUpload 
                                onUploadSuccess={onUploadSuccess} 
                                productImgUrl={productImgUrl}
                            />    
                        </div>                            
                    </div>
                    <div className="col-6">
                        <textarea 
                            {...register("description", { required: 'Campo obrigatório'})} 
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30} 
                            rows={10} 
                        />
                        {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                            )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;