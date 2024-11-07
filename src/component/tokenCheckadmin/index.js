import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from 'utils/router';
import { toast } from 'react-toastify';
const TokenCheckerAdmin = () => {
  const [isTokenValid, setIsTokenValid] = useState(null); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('token');

      if (!token) {
        console.log('Không có token'); 
        navigate(ROUTERS.ADMIN.LOGIN)
      }

      try {
        const response = await axios.post('http://localhost:8080/identity/auth/introspect2', 
          { token: token },
        );
        console.log(response.data.result); 
        setIsTokenValid(response.data.result.valid); 
        if (!response.data.result.valid) {
          Cookies.remove('token'); 
          navigate(ROUTERS.ADMIN.LOGIN)
          toast.error('Đăng nhập that bai');
          window.location.reload();
        }
      } catch (error) {
        console.error('Lỗi khi xác thực token:', error);
      }
    };

    checkToken();
  }, []);

  return (
    <></>
  );
};

export default TokenCheckerAdmin;
