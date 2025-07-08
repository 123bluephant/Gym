import GymOwner from "../Models/GymOwner.js";
import generateCookie from "../utils/helper/generateCookie.js";

export const updateGymController = async (req, res) => {
  try {
    const ownerId = req.user._id.toString();

    const currentOwner = await GymOwner.findById(ownerId);
    if (!currentOwner) {
      return res.status(404).json({ message: "Gym Owner not found" });
    }

    const {
      name,
      email,
      phone,
      bio,
      gymName,
      location,
      established,
      hours,
      membershipPlans,
      socialMedia,
    } = req.body;

    const fieldsToUpdate = {
      name,
      email,
      phone,
      bio,
      gymName,
      location,
      established,
      hours,
      membershipPlans,
      socialMedia,
    };

    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const updatedOwner = await GymOwner.findByIdAndUpdate(
      ownerId,
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!updatedOwner) {
      return res
        .status(404)
        .json({ message: "Gym Owner not found after update" });
    }

    generateCookie(req.user._id, res);

    res.status(200).json({
      message: "Profile updated successfully",
      updatedOwner,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};
