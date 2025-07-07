import GymOwner from "../Models/GymOwner.js";

export const updateGymController = async (req, res) => {
  try {
    console.log(req.user._id);
    const ownerId = req.user._id;
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

    const updatedOwner = await GymOwner.findByIdAndUpdate(
      ownerId,
      {
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
      },
      { new: true }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Gym Owner not found" });
    }
    generateCookie(user._id, res);
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedOwner });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};
