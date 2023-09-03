import express from "express";

const router = express.Router();

//CREATE
router.post("/", async (req,res)=>{
    const newHotel = new Hotel(req, body)
    
    try{
        const savedHotel
    } catch(err){
        res.status(500).json(err)
    }

})
//UPDATE
//DELETE
//GET
//GET ALL

export default router