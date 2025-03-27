<?php
//methods
function validMethodPOST()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        handleError('Phương thức không hợp lệ');
    }
}
function validMethodGET()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        handleError('Phương thức không hợp lệ');
    }
}
//image
function validType($type)
{
    if ($type !== 'jpg' && $type !== 'jpeg' && $type !== 'png' && $type !== 'gif' && $type !== 'webp') {
        handleError('Định dạng ảnh không hợp lệ');
    }
}
//user
function validUserRegister()
{
    validMethodPOST();
    if (empty($_POST['full_name'])) {
        handleError('Vui lòng nhập họ tên');
    }
    if (empty($_POST['email'])) {
        handleError('Vui lòng nhập email');
    }
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        handleError('Email không hợp lệ');
    }
    if (empty($_POST['phone'])) {
        handleError('Vui lòng nhập số điện thoại');
    }
    if (strlen($_POST['phone']) != 10) {
        handleError('Số điện thoại không hợp lệ');
    }
    if (empty($_POST['password'])) {
        handleError('Vui lòng nhập mật khẩu');
    }
    if (strlen($_POST['password']) < 6) {
        handleError('Mật khẩu phải có ít nhất 6 ký tự');
    }
    if (empty($_POST['confirm_password'])) {
        handleError('Vui lòng nhập lại mật khẩu');
    }
    if ($_POST['password'] != $_POST['confirm_password']) {
        handleError('Mật khẩu không khớp');
    }
}