"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
// GET
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            res.status(404).json({ error: 'User Id does not exist' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserById = getUserById;
// PUT
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { firstName, lastName, email, password }
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({ error: 'Internal servrr error' });
    }
};
exports.updateUser = updateUser;
// DELETE
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Internal servor error' });
    }
};
exports.deleteUser = deleteUser;
