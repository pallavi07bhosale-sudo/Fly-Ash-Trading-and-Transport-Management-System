-- ============================================
-- FLY ASH TRADING & TRANSPORT MANAGEMENT SYSTEM
-- DATABASE : flyash_db
-- ============================================


-- 1. LOGIN TABLE
CREATE TABLE login_f (
    login_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- 2. CONTACT ENQUIRIES TABLE
CREATE TABLE contact_enquiries_f (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    subject VARCHAR(200),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. CUSTOMER TABLE
CREATE TABLE customer_f (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    fly_ash_requirement DECIMAL(10,2) NOT NULL,
    requirement_date DATE NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    delivery_location VARCHAR(200) NOT NULL,
    additional_requirement TEXT
);


-- 4. PLANT TABLE
CREATE TABLE plant_f (
    plant_id SERIAL PRIMARY KEY,
    plant_name VARCHAR(150) NOT NULL,
    plant_location VARCHAR(200) NOT NULL,
    fly_ash_requirement DECIMAL(10,2) NOT NULL,
    order_date DATE NOT NULL,
    vehicle_required VARCHAR(10) NOT NULL,
    loading_status VARCHAR(50) NOT NULL,
    gate_pass VARCHAR(50) NOT NULL,
    mseb_gate_entry VARCHAR(50) NOT NULL,
    additional_details TEXT
);


-- 5. ORDERS TABLE
CREATE TABLE orders_f (
    order_id VARCHAR(50) PRIMARY KEY,
    customer_industry_name VARCHAR(150) NOT NULL,
    fly_ash_quantity DECIMAL(10,2) NOT NULL,
    order_date DATE NOT NULL,
    delivery_location VARCHAR(200) NOT NULL,
    vehicle_required VARCHAR(10) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    loading_status VARCHAR(50) NOT NULL,
    order_requirement_details TEXT
);


-- 6. VEHICLE TABLE
CREATE TABLE vehicle_f (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_number VARCHAR(30) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    driver_name VARCHAR(100) NOT NULL,
    driver_contact VARCHAR(15) NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    current_location VARCHAR(200) NOT NULL,
    vehicle_status VARCHAR(50) NOT NULL,
    loading_status VARCHAR(50) NOT NULL,
    delivery_status VARCHAR(50) NOT NULL,
    gate_pass VARCHAR(50) NOT NULL,
    transport_details TEXT
);


-- 7. PAYMENTS TABLE
CREATE TABLE payments_f (
    payment_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    customer_industry_name VARCHAR(150) NOT NULL,
    payment_amount DECIMAL(12,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    transaction_reference VARCHAR(100),
    additional_details TEXT
);