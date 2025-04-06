<?php
class Cart extends Controller
{
    private $cartModel;

    public function __construct()
    {
        $this->cartModel = $this->createModel("CartModel");
    }

    public function list()
    {
        // validUserId();
        $user_id = $_SESSION['user_id'];
        $cart = $this->cartModel->getCartByUserId($user_id);
        echo json_encode($cart);
    }
    public function add()
    {
        $user_id = $_SESSION['user_id'];
        $product_id = $_POST['product_id'];
        $quantity = $_POST['quantity'];
        if ($this->cartModel->addToCart($user_id, $product_id, $quantity)) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Thêm vào giỏ hàng thành công',
                'cart' => $this->cartModel->getCartByUserId($user_id),
            ]);
        } else {
            handleError('Thêm vào giỏ hàng thất bại');
        }
    }
    public function remove()
    {
        $user_id = $_SESSION['user_id'];
        $product_id = $_POST['product_id'];
        if ($this->cartModel->removeFromCart($user_id, $product_id)) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Xóa khỏi giỏ hàng thành công',
                'cart' => $this->cartModel->getCartByUserId($user_id),
            ]);
        } else {
            handleError('Xóa khỏi giỏ hàng thất bại');
        }
    }
    public function clear()
    {
        $user_id = $_SESSION['user_id'];
        if ($this->cartModel->clearCart($user_id)) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Xóa giỏ hàng thành công',
            ]);
        } else {
            handleError('Xóa giỏ hàng thất bại');
        }
    }
    public function up()
    {
        $data = [
            'user_id' => $_SESSION['user_id'],
            'product_id' => $_POST['product_id'],
        ];
        if ($this->cartModel->incrementQuantity($data)) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Tăng số lượng sản phẩm thành công',
                'cart' => $this->cartModel->getCartByUserId($_SESSION['user_id']),
            ]);
        } else {
            handleError('Tăng số lượng sản phẩm thất bại');
        }
    }
    public function down()
    {
        $data = [
            'user_id' => $_SESSION['user_id'],
            'product_id' => $_POST['product_id'],
        ];
        if ($this->cartModel->decrementQuantity($data)) {
            handleMessage([
                'status' => 'success',
                'title' => 'Thông báo',
                'content' => 'Giảm số lượng sản phẩm thành công',
                'cart' => $this->cartModel->getCartByUserId($_SESSION['user_id']),
            ]);
        } else {
            handleError('Giảm số lượng sản phẩm thất bại');
        }
    }

}
