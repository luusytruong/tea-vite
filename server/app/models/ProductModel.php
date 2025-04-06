<?php

class ProductModel extends Model
{
    public function getAllProducts()
    {
        return $this->read("products");
    }
}
