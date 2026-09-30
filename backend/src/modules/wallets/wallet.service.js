import prisma from "../../config/db.js";

export const createWallet = async (data) => {
    return prisma.wallet.create({
        data,
    });
};

export const getWallets = async () => {
    return prisma.wallet.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const  getActiveWallet = async () => {
    return prisma.wallet.findFirst({
        where: {
            isActive: true,
        },
    });
};

export const updateWallet = async (id, data) => {
    return prisma.wallet.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteWallet = async (id) => {
    return prisma.wallet.delete({
        where: {
            id,
        },
    });
};