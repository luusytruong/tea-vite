<?php

class CategoryModel extends Model
{
    public function getAllCategories()
    {
        return $this->read("categories");
    }
}
