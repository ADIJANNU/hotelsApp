const express = require('express')
const MenuItem = require('../models/Menu')
const router = express.Router()

router.post('/', async(req,res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log('data saved')
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error'})
    }
})

router.get('/', async(req,res) => {
    try {
        const data = await MenuItem.find()
        console.log('data displayed')
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error'})
    }
})

router.put('/:id', async(req,res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators: true
        })
        if(!response) {
            res.status(404).json({ error: 'Menu item not found'})
        }
        console.log('Data updated successfully');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error'})
    }
})

router.get('/:tasteType', async(req,res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'extraspicy'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('menu item fetched');
            res.status(200).json(response)
        } else {
            console.log('inavlid item type');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId)
        if(!response) {
            return res.status(404).json({ error: 'Menu item not found'});
        }
        console.log('data delete');
        res.status(500).json({message: 'menu item deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router