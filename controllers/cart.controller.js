const cartModel = require("../models/cart.model");

module.exports = {
    addToCart: async(req, res)=>{
        const {account_id, food_id, quantity} = req.body;
        let cart = await cartModel.findOne({
            account_id: account_id,
            is_order: false
        })

        //neu lan dau them vao gio hang
        if (!cart){
            cart = await cartModel.create({
                account_id: account_id,
                items: [{food: food_id, quantity: quantity || 1}]
            });
        } else {
            const items = cart.items;
            const isExists = items.find((v)=> v.food == food_id)
            if (isExists){
                const items2 = items.map((v)=>{
                    if (v.food == food_id){
                        v.quantity++;
                    }
                    return v;
                })
                cart = await cartModel.findByIdAndUpdate(cart._id, {items2}, {new: true});
            }else{
                items.push({food: food_id, quantity: quantity || 1});
            }
            cart = await cartModel.findByIdAndUpdate(cart._id, {items}, {new: true});
        }
        return res.status(201).json(cart);
    },
    getCart: async(req, res)=>{
        const account_id = req.params.account_id;
        const cart = await cartModel.findOne({
            is_order: false,
            account_id: account_id
        }).populate("items.food");
        return res.status(200).json(cart || {});
    },
    deleteItem: async(req, res)=>{
        const account_id = req.params.account_id;
        const item_id = req.params.item_id;
        let cart = await cartModel.findOne({
            is_order: false,
            account_id: account_id
        });

        const items = cart.items.filter((v)=> v._id.toString() !== item_id);
        cart = await cartModel.findByIdAndUpdate(cart._id, {items}, {new: true});

        return res.status(200).json(cart);
    },
    updateItem: async(req, res)=>{
        const account_id = req.params.account_id;
        const item_id = req.params.item_id;
        const quantity = req.body.quantity;

        let cart = await cartModel.findOne({
            is_order: false,
            account_id: account_id
        });

        const items = cart.items.map((v)=>{
            if (v._id.toString() == item_id){
                v.quantity = quantity;
                return v;
            }
            return v;
        })
        cart = await cartModel.findByIdAndUpdate(cart._id, {items}, {new: true});

        return res.status(200).json(cart);
    }
}