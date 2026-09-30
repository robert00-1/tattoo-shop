import {
    createWallet,
    getWallets,
    getActiveWallet,
    updateWallet,
    deleteWallet,
} from "./wallet.service.js";

export const create = async (req, res) => {
    try {
        const wallet = await createWallet(req.body);

        res.status(201).json({
            message: "Wallet created successfully",
            wallet,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const wallets = await getWallets();

        res.json(wallets);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const wallet = await getActiveWallet();

        res.json(wallet);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

export const update = async (req, res) => {
    try {
        const wallet = await updateWallet(
            res.params.id,
            req.body
        );

        res.json({
            message: "Wallet updated",
            wallet,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
export const remove = async (req, res ) => {
    try {
        await deleteWallet(req.params.id);

        res.jsom({
            message: "Wallet deleted",
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};