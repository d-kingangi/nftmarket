CREATE TABLE nftmarket_fees(
    blockchain string?,
project string?,
"version" string?,

block_time
timestamp?

token_id
string?

collection
string?

platform_fee_amount_raw
double?

platform_fee_amount
double?

platform_fee_amount_usd
double?

platform_fee_percentage
double?

royalty_fee_amount_raw
double?

royalty_fee_amount
double?

royalty_fee_amount_usd
double?

royalty_fee_percentage
double?

royalty_fee_receive_address
string?

royalty_fee_currency_symbol
string?

token_standard
string?

trade_type
string?

number_of_items
decimal(38,0)?

trade_category
string?

evt_type
string?

seller
string?

buyer
string?

nft_contract_address
string?

project_contract_address
string?

aggregator_name
VARCHAR(255)

aggregator_address
VARCHAR(255)

block_number
bigint

tx_hash
VARCHAR(255)

tx_from
VARCHAR(255)

tx_to VARCHAR(255),
unique_trade_id VARCHAR(255)

)