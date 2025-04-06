<?php
class Db
{
    private $conn = null;
    private static $instance;
    private function __construct()
    {
        $this->connect();
        // $this->createTables();
    }
    private function connect()
    {
        try {
            $this->conn = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME . ";charset=utf8", USERNAME, PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            if ($e->getCode() == 1049) {
                $this->initializeDatabase();
            } else {
                handleError($e->getMessage());
            }
        }
    }
    private function initializeDatabase()
    {
        try {
            $this->conn = new PDO("mysql:host=" . HOST . ";charset=utf8", USERNAME, PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("CREATE DATABASE IF NOT EXISTS " . DBNAME);

            $this->connect();
            $this->createTables();
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
    }
    private function createTables()
    {
        $sql =
            "CREATE TABLE 
                IF NOT EXISTS categories (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    slug VARCHAR(255) NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );

            CREATE TABLE
                IF NOT EXISTS products (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    slug VARCHAR(255) NOT NULL UNIQUE,
                    description TEXT,
                    short_description TEXT,
                    price DECIMAL(10, 2) NOT NULL,
                    original_price DECIMAL(10, 2),
                    image VARCHAR(255) NOT NULL,
                    images JSON,
                    discount INT,
                    category_id INT,
                    stock INT NOT NULL DEFAULT 0,
                    weight VARCHAR(20),
                    origin VARCHAR(255),
                    processing_method VARCHAR(255),
                    details TEXT,
                    is_featured BOOLEAN DEFAULT FALSE,
                    is_new BOOLEAN DEFAULT FALSE,
                    meta_keywords TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
                );

            CREATE TABLE
                IF NOT EXISTS users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    phone VARCHAR(20) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    avatar VARCHAR(255),
                    city VARCHAR(255),
                    district VARCHAR(255),
                    ward VARCHAR(255),
                    address TEXT,
                    role ENUM ('admin', 'staff', 'user') DEFAULT 'user',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );

            CREATE TABLE
                IF NOT EXISTS reviews (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    product_id INT NOT NULL,
                    user_id INT NOT NULL,
                    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                    comment TEXT,
                    images JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                );

            CREATE TABLE
                IF NOT EXISTS blogs (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(255) NOT NULL,
                    slug VARCHAR(255) NOT NULL UNIQUE,
                    short_description TEXT,
                    content TEXT NOT NULL,
                    image VARCHAR(255),
                    author_id INT NOT NULL,
                    category VARCHAR(100),
                    tags TEXT,
                    read_time VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
                );

            CREATE TABLE
                IF NOT EXISTS company_info (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    email VARCHAR(255),
                    phone VARCHAR(20),
                    address TEXT,
                    logo VARCHAR(255),
                    facebook VARCHAR(255),
                    instagram VARCHAR(255),
                    tiktok VARCHAR(255),
                    youtube VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );

            CREATE TABLE
                IF NOT EXISTS cart (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    user_id INT NOT NULL,
                    product_id INT NOT NULL,
                    quantity INT NOT NULL DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
                    UNIQUE (user_id, product_id)
                );

            CREATE TABLE
                IF NOT EXISTS orders (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    slug VARCHAR(255) NOT NULL UNIQUE,
                    user_id INT NOT NULL,
                    total_price DECIMAL(10, 2) NOT NULL,
                    payment_method VARCHAR(255),
                    status ENUM (
                        'pending',
                        'processing',
                        'shipped',
                        'delivered',
                        'cancelled'
                    ) DEFAULT 'pending',
                    address TEXT,
                    note TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                );

            CREATE TABLE
                IF NOT EXISTS order_items (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    order_id INT NOT NULL,
                    product_id INT NOT NULL,
                    quantity INT NOT NULL,
                    price DECIMAL(10, 2) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
                );

            CREATE TABLE
                IF NOT EXISTS order_timelines (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    order_id INT NOT NULL,
                    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL,
                    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
                );

            -- View tính trung bình rating và số lượng đánh giá
            CREATE
            OR REPLACE VIEW product_ratings AS
            SELECT
                product_id,
                ROUND(AVG(rating), 1) AS avg_rating,
                COUNT(*) AS review_count
            FROM
                reviews
            GROUP BY
                product_id;

            -- Nếu trạng thái thay đổi thì ghi vào order_timelines
            DROP TRIGGER IF EXISTS before_order_status_update;
            CREATE TRIGGER before_order_status_update
            BEFORE UPDATE ON orders
            FOR EACH ROW
            BEGIN
                IF OLD.status <> NEW.status THEN
                    INSERT INTO order_timelines (order_id, status, changed_at)
                    VALUES (OLD.id, NEW.status, NOW());
                END IF;
            END;

            -- Insert default company info
            INSERT INTO
                company_info (name, description, email, phone, address)
            VALUES
                (
                    'Chè Thái',
                    'Chuyên cung cấp các loại trà chất lượng, được chọn lọc kỹ lưỡng từ những vùng trà nổi tiếng.',
                    'lst27062004@gmail.com',
                    '0329257843',
                    'Thái Nguyên, Việt Nam'
                );

            -- Insert default categories
            INSERT INTO
                categories (name, description, slug)
            VALUES
                (
                    'Trà Shan Tuyết',
                    'Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi',
                    'tra-shan-tuyet'
                ),
                (
                    'Trà Oolong',
                    'Trà Oolong với hương vị đặc trưng, được chế biến theo phương pháp truyền thống',
                    'tra-oolong'
                ),
                (
                    'Trà Xanh',
                    'Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ',
                    'tra-xanh'
                ),
                (
                    'Trà Hồng',
                    'Trà hồng với hương vị ngọt ngào, thơm ngon',
                    'tra-hong'
                );

            CREATE INDEX idx_products_slug ON products (slug);

            CREATE INDEX idx_orders_slug ON orders (slug);

            CREATE INDEX idx_users_email ON users (email);

            CREATE INDEX idx_orders_user_id ON orders (user_id);

            CREATE INDEX idx_reviews_product_id ON reviews (product_id);
        ";

        $this->conn->exec($sql);
    }
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function getConnection()
    {
        return $this->conn;
    }
}