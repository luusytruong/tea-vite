<?php
class Category extends Controller
{
    private $categoryModel;

    public function __construct()
    {
        $this->categoryModel = $this->createModel("CategoryModel");
    }

    public function list()
    {
        $categories = $this->categoryModel->getAllCategories();
        echo json_encode($categories);
    }
}