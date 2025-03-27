<?php function handleError($message, $keep = false)
{
    echo json_encode([
        'status' => 'error',
        'title' => 'Đã có lỗi xảy ra',
        'content' => $message,
        'keep' => $keep
    ]);
    exit;
}
function handleSuccess($message, $keep = false)
{
    echo json_encode([
        'status' => 'success',
        'title' => 'Thông báo',
        'content' => $message,
        'keep' => $keep
    ]);
    exit;
}
function handleNotify($satus, $title, $message, $keep = false)
{
    echo json_encode([
        'status' => $title ? 'success' : 'error',
        'title' => $title,
        'content' => $message,
        'keep' => $keep
    ]);
    exit;
}
function handleMessage($arr)
{
    echo json_encode($arr);
    exit;
}