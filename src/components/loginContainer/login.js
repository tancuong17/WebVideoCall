import React, { useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './login.css';
import users from '../../data/users.json';

function Login() {
  document.title = "Đăng nhập";
  let phoneNumber = useRef();
  let password = useRef();
  function LoginUser() {
    let check = false;
    let phone = phoneNumber.current.value;
    let pass = password.current.value;
    for (let i = 0; i < users.length; i++) {
      if(phone === users[i].phoneNumber && pass === users[i].password)
      {
        localStorage.setItem("check", "true");
        check = true;
        localStorage.setItem("id", users[i].id);
        break;
      }
    }
    if(!check)
      alert("Tài khoản hoặc mật khẩu không chính xác!");
  }
  return (
    <>
        <div id='login'>
          <div id='logo-login'>
            <img src='https://images.ctfassets.net/3prze68gbwl1/2HhSrQa8hBh4DJCCtOabFX/ee08e879c65c4b488614207b23cb1350/Kustomer-logo_red.png' alt='logo'/>
            <p>Kết nối với bạn bè và thế giới xung quanh bạn trên Kustomer</p>
          </div>
          <div id='form-login'>
            <div>
              <input ref={phoneNumber} placeholder='Số điện thoại...' name='phone-number' required/>
              <input type={'password'} ref={password} placeholder='Mật khẩu...' name='password' required/>
              <button onClick={LoginUser}><Link to="/home" id='create-new-account-btn'>Đăng nhập</Link></button>
              <Link to="" id='forgot-password'>Quên mật khẩu?</Link>
              <hr/>
              <button><Link to="/register" id='create-new-account-btn'>Tạo tài khoản mới</Link></button>
            </div>
          </div>
        </div>
        <Outlet />
    </>
  );
}
export default Login;