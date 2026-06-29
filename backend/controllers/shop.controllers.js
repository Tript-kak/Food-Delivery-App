import Shop from "../models/shop.model.js";
import uploadOnCLoudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";
export const createEditShop = async (req, res) => {
  console.log("reached createEditShop");
  console.log("body:", req.body);
  console.log("file:", req.file);
  try {
    const { name, city, state, address } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCLoudinary(req.file.path); // returns a string
    }
    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });

      await shop.populate("owner");
      return res.status(201).json(shop);
    } else {
      shop = await Shop.findByIdAndUpdate(shop._id, {
        name,
        city,
        state,
        address,
        ...(image && { image }),
        owner: req.userId,
      });

      await shop.populate("owner", "item");
      return res.status(200).json(shop);
    }
  } catch (error) {
    return res.status(500).json({ message: `create shop error ${error}` });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } },
      });

    if (!shop) {
      return res.status(200).json(null);
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Get my shop error ${error}` });
  }
  };

  

