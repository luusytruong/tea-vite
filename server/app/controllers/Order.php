<?php
class Order extends Controller
{
    private $orderModel;

    public function __construct()
    {
        $this->orderModel = $this->createModel("OrderModel");
    }

    public function create()
    {
        validOrderCreate();
        $data = [
            'name' => $_POST['name'],
            'price' => $_POST['price'],
            'description' => $_POST['description'],
        ];
        $this->orderModel->createOrder($data);
    }
}