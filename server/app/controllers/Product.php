<?php
class Product extends Controller
{
    private $productModel;

    public function __construct()
    {
        $this->productModel = $this->createModel("ProductModel");
    }

    public function list()
    {
        $products = $this->productModel->getAllProducts();
        echo json_encode($products);
    }
}