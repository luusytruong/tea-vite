<?php

class CartModel extends Model
{
    public function getCartByUserId($user_id)
    {
        try {
            $sql = "SELECT c.*, p.*
            FROM cart c JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                "id" => $user_id
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $e) {
            return [];
        }
    }
    public function addToCart($user_id, $product_id, $quantity)
    {
        $sql = "
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (:user_id, :product_id, :quantity)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
        ";

        $stmt = $this->conn->prepare($sql);
        $result = $stmt->execute([
            "user_id" => $user_id,
            "product_id" => $product_id,
            "quantity" => 1,
        ]);

        return $result;
    }
    public function incrementQuantity($data)
    {
        $sql = "
        UPDATE cart 
        SET quantity = quantity + 1 
        WHERE user_id = :user_id AND product_id = :product_id
    ";

        $stmt = $this->conn->prepare($sql);
        $result = $stmt->execute($data);

        return $result;
    }

    public function decrementQuantity($data)
    {
        $sql = "
        UPDATE cart 
        SET quantity = GREATEST(quantity - 1, 0) 
        WHERE user_id = :user_id AND product_id = :product_id
    ";

        $stmt = $this->conn->prepare($sql);
        $result = $stmt->execute($data);

        // Tự động xóa sản phẩm khỏi giỏ hàng nếu số lượng giảm xuống 0
        if ($result) {
            $this->removeIfQuantityZero($data);
        }

        return $result;
    }
    private function removeIfQuantityZero($data)
    {
        $sql = "
        DELETE FROM cart 
        WHERE user_id = :user_id AND product_id = :product_id AND quantity = 0
    ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
    }
    public function removeFromCart($user_id, $product_id)
    {
        return $this->delete("cart", "user_id = '{$user_id}' AND product_id = '{$product_id}'");
    }
    public function clearCart($user_id)
    {
        return $this->delete("cart", "user_id = '{$user_id}'");
    }
}
