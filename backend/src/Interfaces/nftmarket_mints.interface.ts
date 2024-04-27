export interface nftmarket_mint{
    blockchain: string;
    project: string;
    version: string;
    block_time: string;
    token_id: string;
    collection: string;
    amount_usd: number;
    token_standard: string;
    trade_types: string;
    number_of_items: string;
    trade_category: string;
    evt_type: string;
    seller: string;
    buyer: string;
    amount_original: number;
    amount_raw: number;
    currency_symbol: string;
    currency_contract: string;
    nft_contract_address: string; 
    project_contract_address: string;
    aggregator_name: string;
    aggregator_address: string;
    block_number: number;
    tx_from: string;
    tx_to: string;
    unique_trade_id: string; 
}