export interface nftmarket_trade{
    blockchain: string;
    project: string;
    version: string;
    block_date: Date;
    block_month: Date;
    block_time: Date;
    token_id: number;
    collection: string;
    amount_usd: number;
    token_standard: string;
    trade_type: string;
    number_of_items: number;
    trade_category: string;
    evt_type: string;
    seller: string;
    buyer: string;
    amount_original: number;
    amount_raw: number;
    currency_symbol: string;
    nft_contract_address: string;
    project_contract_address: string;
    aggregator_name: string;
    aggregator_address: string;
    block_number: number;
    tx_hash: string;
    tx_from: string;
    tx_to: string;
    platform_fee_amount_raw: number;
    platform_fee_amount: number;
    platform_fee_amount_usd: number;
    platform_fee_percentage: number;
    royalty_fee_receive_address: string;
    royalty_fee_currency_symbol: string;
    royalty_fee_amount_raw: number;
    royalty_fee_amount: number;
    royalty_fee_amount_usd: number;
    // unique_trade_id: string;
}