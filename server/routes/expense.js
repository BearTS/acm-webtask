const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Expense = require('../models/Expenses');

router.post('/add', auth, async (req, res) => { 
    const user = await User.findById(req.user.id);
    const { text, amount } = req.body;
    const expense = new Expense({
        username: user.username,
        text,
        amount,
    });
    try {
        await expense.save();
        res.status(200).json(
            {
                status: 'ok',
                message: 'added',
                expense
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error in Saving');
    }
});

router.get('/get', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    try {
        const expenses = await Expense.find({ username: user.username });
        res.status(200).json({
            expenses,
            'status': 'ok'
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error in Saving');
    }
});

router.delete('/delete', auth, async (req, res) => {
    const user = await User.findById(req.user.id);
    const { id } = req.body;
    try {
        const expense = await Expense.findById(id);
        if (expense.username !== user.username) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Deleted', status: 'ok' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error in Deleting');
    }
});

module.exports = router;