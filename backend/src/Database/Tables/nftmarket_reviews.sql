CREATE TABLE nftmarket_reviews(
    review_id VARCHAR(255) PRIMARY KEY,
    reviewer_id VARCHAR(255),
    "collection" VARCHAR(255), 
    rating TEXT,
    comment TEXT,
    FOREIGN KEY (reviewer_id) REFERENCES nftmarket_users (user_id)
    FOREIGN KEY ("collection") REFERENCES nftmarket_trades ("collection")
)