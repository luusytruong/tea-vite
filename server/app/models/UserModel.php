<?php

class UserModel extends Model
{
    public function registerUser($data)
    {
        $result = $this->create('users', $data);
        if (str_contains($result, 'email')) {
            handleError('Email đã tồn tại');
        } else if (str_contains($result, 'phone')) {
            handleError('Số điện thoại đã tồn tại');
        } else {
            return $result;
        }
    }
    public function loginUser($data)
    {
        // Sử dụng prepared statement
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE phone = :phone");
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            handleError('Số điện thoại không tồn tại');
        }

        if (!password_verify($data['password'], $user['password'])) {
            handleError('Mật khẩu không chính xác');
        }

        return removeFields($user, ['password']);
    }
    public function findUser($id, $phone)
    {
        $conditions = [];
        if ($id) {
            $conditions[] = "id = '{$id}'";
        }
        if ($phone) {
            $conditions[] = "phone = '{$phone}'";
        }

        return empty($conditions) ? [] : $this->read('users', implode(' AND ', $conditions));
    }
    public function updateUser($data)
    {
        return $this->update('users', $data, "id = '{$data['id']}'");
    }
}