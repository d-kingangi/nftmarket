CREATE TABLE nftmarket_users(
    user_id VARCHAR(255) PRIMARY KEY,
    wallet_address VARCHAR(255),
    profile_img VARCHAR(255),
    user_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    location TEXT,
    phone VARCHAR(255),
    isDeleted BIT DEFAULT 0,
    isVerified BIT DEFAULT 0,
)