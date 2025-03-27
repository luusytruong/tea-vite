<?php
class Product extends Controller
{
    private $productModel;

    public function __construct()
    {
        $this->productModel = $this->createModel("ProductModel");
    }

    public function create()
    {
        validProductCreate();
        $data = [
            'name' => $_POST['name'],
            'price' => $_POST['price'],
            'description' => $_POST['description'],
        ];
        $this->productModel->createProduct($data);
    }
}