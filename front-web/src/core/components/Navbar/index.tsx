import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAccessTokenDecoded } from 'core/utils/auth';

import './styles.scss';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();
  
    useEffect(() => {
      const currentUserData = getAccessTokenDecoded();
      setCurrentUser(currentUserData.user_name);
    }, [location]);
  
    //vai ter o logout


    return (

        <nav className="row bg-primary main-nav">
            <div className="col-2">
                <Link to="/" className="nav-logo-text">
                    <h4>DS Catalog</h4>
                </Link>
            </div>
            <div className="col-6 offset-2">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;