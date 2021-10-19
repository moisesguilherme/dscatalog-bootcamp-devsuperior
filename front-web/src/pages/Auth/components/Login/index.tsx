import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

import ButtonIcon from 'core/components/ButtonIcon';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError ] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push('/admin');
            })
            .catch(() => {
                setHasError(true);
            })
    }

    return( 
        <AuthCard title="login">
          {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos
                </div>    
          )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("username", { required: true })} 
                    type="email" 
                    className="form-control input-base margin-bottom-30" 
                    placeholder="Email"
                />
                <input 
                    {...register("password", { required: true, minLength: 5})} 
                    type="password" 
                    className="form-control input-base" 
                    placeholder="Senha"
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Não tem Cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    )
}

export default Login;