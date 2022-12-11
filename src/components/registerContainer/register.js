import React from 'react';
import './register.css';

function Register() {
  document.title = "Đăng kí";
  return <>
  <div id='register'>
    <div id='logo-register'>
      <img src='https://images.ctfassets.net/3prze68gbwl1/2HhSrQa8hBh4DJCCtOabFX/ee08e879c65c4b488614207b23cb1350/Kustomer-logo_red.png' alt='logo'/>
      <p>Kết nối với bạn bè và thế giới xung quanh bạn trên Kustomer</p>
    </div>
    <div id='form-register'>
      <form method='get'>
        <fieldset>
          <legend>Số điện thoại:</legend>
          <input type={'number'} name="phone-number" required/>
        </fieldset>
        <fieldset>
          <legend>Mật khẩu:</legend>
          <input type={'password'} name="password" required/>
        </fieldset>
        <fieldset>
          <legend>Họ:</legend>
          <input type={Text} name="first-name" required/>
        </fieldset>
        <fieldset>
          <legend>Tên:</legend>
          <input type={Text} name="last-name" required/>
        </fieldset>
        <fieldset>
          <legend>Ngày sinh:</legend>
          <input type={'Date'} placeholder="dd-mm-yyyy" name="birthday" required />
        </fieldset>
        <button type='submit'>Đăng kí</button>
      </form>
    </div>
  </div>
</>;
}

export default Register;