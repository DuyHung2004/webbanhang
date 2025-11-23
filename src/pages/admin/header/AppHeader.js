import React, { useState } from 'react';
import './style.scss';
import { ROUTERS } from 'utils/router';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AppHeader = () => {
  const [tabs] = useState([
    { text: 'Users', icon: 'fa fa-home', key: 0, path: ROUTERS.ADMIN.HOME },
    { text: 'Orders', icon: 'fa fa-archive', key: 1, path: ROUTERS.ADMIN.ORDER },
    { text: 'Products', icon: 'fa fa-bar-chart', key: 2, path: ROUTERS.ADMIN.PRODUCT  },
    { text: 'Categorys', icon: 'fa fa-cloud-upload', key: 3, path: ROUTERS.ADMIN.CATEGORY },
    { text: 'Dang xuat', icon: 'fa fa-cogs', key: 4, path: ROUTERS.ADMIN.LOGIN },
  ]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id, path) => {
    if (id === 4) {
      Cookies.remove('token'); 
      navigate(path)
    }
    if (id !== current) {
      setCurrent(id);
      navigate(path);
    }
  };

  return (
    <div className="container">
      <div className="tab-bar">
        {tabs.map(tab => (
          <div
  key={tab.key}
  className={`tab ${current === tab.key ? "active" : ""}`}
  onClick={() => handleClick(tab.key, tab.path)}
>
  <i className={tab.icon}></i>
  <p>{tab.text}</p>
</div>
        ))}
      </div>
    </div>
  );
};

export default AppHeader;
