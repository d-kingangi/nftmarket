import joi from "joi";

export const new_nftmarket_mint = joi.object({
    // unique_trade_id: joi.string().required(),
    blockchain: joi.string().required(),
    project:  joi.string().required(),
    version: joi.string().required(),
    block_time: joi.number().required(),
    token_id: joi.string().required(),
    collection: joi.string().required(),
    amount_usd: joi.number().required(),
    token_standard: joi.string().required(),
    trade_types: joi.string().required(),
    number_of_items: joi.string().required(),
    trade_category: joi.string().required(),
    evt_type: joi.string().required(),
    seller: joi.string().required(),
    buyer: joi.string().required(),
    amount_original: joi.number().required(),
    amount_raw: joi.number().required(),
    currency_symbol: joi.string().required(),
    currency_contract: joi.string().required(),
    nft_contract_address: joi.string().required(),
    project_contract_address: joi.string().required(),
    aggregator_name: joi.string().required(),
    aggregator_address: joi.string().required(),
    block_number: joi.number().required(),
    tx_hash: joi.number().required(),
    tx_from: joi.string().required(),
    tx_to: joi.string().required()
})