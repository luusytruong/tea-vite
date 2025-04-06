<?php
class User extends Controller
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = $this->createModel("UserModel");
    }

    public function register()
    {
        validUserRegister();
        $data = [
            'full_name' => $_POST['full_name'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
        ];
        $user_id = $this->userModel->registerUser($data);
        if ($user_id) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['phone'] = $_POST['phone'];
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Đăng ký thành công',
                'user' => (removeFields([...$data, 'id' => $user_id], ['password'])),
            ]);
        } else {
            handleError('Đăng ký thất bại');
        }
    }
    public function login()
    {
        $data = [
            'phone' => $_POST['phone'],
            'password' => $_POST['password'],
        ];
        $user = $this->userModel->loginUser($data);
        if ($user) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['phone'] = $user['phone'];
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Đăng nhập thành công',
                'user' => $user,
            ]);
        } else {
            handleError('Đăng nhập thất bại');
        }
    }
    public function update()
    {
        $data = [
            'id' => $_SESSION['user_id'],
            'full_name' => $_POST['full_name'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'address' => $_POST['address'],
            'city' => $_POST['city'],
            'district' => $_POST['district'],
            'ward' => $_POST['ward'],
        ];
        if (!empty($_FILES['avatar']['name'])) {
            $data['avatar'] = upload('avatar');
        }
        $result = $this->userModel->updateUser($data);
        if ($result) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Cập nhật thành công',
                'user' => $data,
            ]);
        } else {
            unload();
            handleError('Cập nhật thất bại');
        }
    }

    public function auth()
    {
        $user_id = $_SESSION['user_id'];
        $phone = $_SESSION['phone'];
        if (!$user_id || !$phone) {
            handleError('Không có thông tin');
        }
        $user = $this->userModel->findUser($user_id, $phone);
        if ($user) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Đăng nhập thành công',
                'user' => removeFields($user, ['password']),
            ]);
        } else {
            handleError('Đăng nhập thất bại');
        }
    }
    public function logout()
    {
        $_SESSION['user_id'] = null;
        $_SESSION['phone'] = null;
        handleSuccess('Đăng xuất thành công');
    }
}