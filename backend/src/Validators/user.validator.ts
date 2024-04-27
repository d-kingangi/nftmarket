import joi from "joi";

export const new_nftmarket_user = joi.object({
    user_id: joi.string().required(),
    wallet_address: joi.string().required(),
    profile_img: joi.string().required(),
    user_name: joi.string().required(),
    email: joi.string().required(),
    location : joi.string().required(),
    phone: joi.string().required(),
})