const mongoose=require("mongoose");
const Merchant=require("../models/merchant");
const Item=require("../models/item");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//Edit Canteen API
exports.editCanteen= async(req,res) =>{
    try{
      const { token } = req.cookies;
      if (!token) {
        return res.status(200).json({
          sucess: false,
          message: "Your Token is Expired Kindly login first",
        });
      }
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      const { shopid, canteenName, canteenContact, Address, openingTime, closingTime } =req.body;
      if (!mongoose.Types.ObjectId.isValid(shopid)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID(does not satisfy mongoose criteria)",
        });
      }
      if (!shopid) {
        return res.status.json({
          success: false,
          message: "Please Give Canteen ID",
        });
      }
      //Commented  because in front end we have protected route for owner and customer so if this api route is called then cookie must have authenticated token consiting of role:owner 

    //   const existingMerchant = await User.find({ email: payload.email });
    //   console.log(payload.role);
    //   if (!existingMerchant || payload.role != "Owner") {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Merchant is Not Created",
    //     });
    //   }

      const existingCanteen = await Merchant.findOne({ _id: shopid });
      if (!existingCanteen) {
        return res.status(404).json({
          success: false,
          message: "Canteen Is Not Present means your id is not valid",
        });
      }
      //checking if same canteen Name already present in the database
    const existingCanteenName= await Merchant.findOne({canteenName});
    if(existingCanteenName){
        return res.status(200).json({
            success:false,
            message:"Canteen Name already exist"
        })
    }
    //checking if the same canteen Contact Number is already present in the database

        const existingCanteenContact = await Merchant.findOne({ canteenContact });
        if (existingCanteenContact) {
          return res.status(200).json({
            success: false,
            message: "Canteen Contact Number already exist",
          });
        }
      // Update the canteen details
      const updatedCanteen = await Merchant.findByIdAndUpdate(
        shopid,
        {
          canteenName,
          canteenContact,
          Address,
          openingTime,
          closingTime,
        },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        data: updatedCanteen,
        success: true,
        message: "Update SuccessFully",
      });
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

//edit Item API

//Delte Item API

//Delete Canteen API
