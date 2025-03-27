<?php
//format date
function formatDate($date)
{
    if (!is_string($date)) {
        return '01011990';
    }

    $arr = explode('-', $date);
    return count($arr) === 3 ? sprintf('%02d%02d%02d', $arr[2], $arr[1], $arr[0]) : '01011990';
}
//upload file
$target_file = '';
function upload($name)
{
    global $target_file;

    if (!isset($_FILES[$name]) || $_FILES[$name]['error'] != UPLOAD_ERR_OK) {
        handleError('Có lỗi xảy ra khi tải lên tệp.');
    }

    $file_name = basename($_FILES[$name]['name']);
    $file_type = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    validType($file_type);

    $unique_file_name = uniqid() . '_' . $file_name;
    $target_path = ROOT . '/public/uploads/';
    $target_file = $target_path . $unique_file_name;

    if (!is_dir($target_path)) {
        handleError('Thư mục đích không tồn tại');
    }

    if (!is_writable($target_path)) {
        handleError('Thư mục không có quyền ghi');
    }

    if (move_uploaded_file($_FILES[$name]['tmp_name'], $target_file)) {
        return $unique_file_name;
    } else {
        handleError('Có lỗi xảy ra khi di chuyển tệp tải lên.');
    }
}
function unload()
{
    global $target_file;

    if (file_exists($target_file)) {
        unlink($target_file);
    }
}

function removeFields($result, $fields)
{
    if (!is_array($result) || empty($fields)) {
        return $result;
    }

    if ($result[0] && is_array($result[0])) {
        return array_map(function ($item) use ($fields) {
            foreach ($fields as $field) {
                unset($item[$field]);
            }

            return $item;
        }, $result);
    }

    foreach ($fields as $field) {
        unset($result[$field]);
    }

    return $result;
}