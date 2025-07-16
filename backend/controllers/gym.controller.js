import GymOwner from "../Models/GymOwner.js";
import Trainer from "../Models/Trainer.js";
import generateCookie from "../utils/helper/generateCookie.js";

export const updateGymController = async (req, res) => {
  try {
    console.log("Updating gym profile with data:", req.body);
    console.log("Files received:", req.files);

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
      existingGymImages,
      avatarUrl,
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
    };
    if (typeof membershipPlans === "string") {
      try {
        fieldsToUpdate.membershipPlans = JSON.parse(membershipPlans);
      } catch (e) {
        console.error("Failed to parse membershipPlans:", e);
      }
    } else if (membershipPlans) {
      fieldsToUpdate.membershipPlans = membershipPlans;
    }
    if (typeof socialMedia === "string") {
      try {
        fieldsToUpdate.socialMedia = JSON.parse(socialMedia);
      } catch (e) {
        console.error("Failed to parse socialMedia:", e);
      }
    } else if (socialMedia) {
      fieldsToUpdate.socialMedia = socialMedia;
    }
    if (req.files?.avatar?.[0]) {
      fieldsToUpdate.avatar = req.files.avatar[0].path;
    } else if (avatarUrl) {
      fieldsToUpdate.avatar = avatarUrl;
    }
    let updatedGymImages = [];
    if (existingGymImages) {
      try {
        const existing = JSON.parse(existingGymImages);
        updatedGymImages = [...existing];
      } catch (e) {
        console.error("Failed to parse existing gym images:", e);
      }
    }
    if (req.files?.gymImg) {
      const newImageUrls = req.files.gymImg.map((file) => file.path);
      updatedGymImages = [...updatedGymImages, ...newImageUrls];
    }
    if (updatedGymImages.length > 5) {
      return res.status(400).json({
        message: "You can upload a maximum of 5 gym images",
      });
    }
    fieldsToUpdate.gymImg = updatedGymImages;

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
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

export const addTrainerController = async (req, res) => {
  try {
    const ownerId = req.user._id.toString();
    const image = req.file ? req.file.path : null;
    console.log("Image path:", image);
    const { fullName, email, experience, status, specializations, bio } =
      req.body;

    const newTrainer = new Trainer({
      fullName,
      email,
      experience,
      status,
      specializations,
      bio,
      image,
      gymOwner: ownerId,
    });

    await newTrainer.save();

    await GymOwner.findByIdAndUpdate(ownerId, {
      $push: { trainers: newTrainer._id },
    });

    res.status(201).json({ message: "Trainer added successfully", newTrainer });
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ message: "Failed to add trainer", error });
  }
};

export const editTrainerController = async (req, res) => {
  try {
    const {
      trainerId,
      fullName,
      email,
      experience,
      status,
      specializations,
      bio,
    } = req.body;
    const image = req.file ? req.file.path : null;
    console.log("Editing trainer with ID:", image, req.file);
    if (!trainerId) {
      return res.status(400).json({ message: "Trainer ID is required" });
    }
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      trainerId,
      { fullName, email, experience, status, specializations, bio, image },
      { new: true }
    );

    if (!updatedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res
      .status(200)
      .json({ message: "Trainer updated successfully", updatedTrainer });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Failed to update trainer", error });
  }
};

export const deleteTrainerController = async (req, res) => {
  try {
    const trainerId = req.params.id;
    console.log("Deleting trainer with ID:", trainerId);
    const deletedTrainer = await Trainer.findByIdAndDelete(trainerId);

    if (!deletedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    await GymOwner.findByIdAndUpdate(req.user._id, {
      $pull: { trainers: trainerId },
    });

    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Failed to delete trainer", error });
  }
};

export const getTrainersController = async (req, res) => {
  try {
    const ownerId = req.user._id.toString();
    const trainers = await Trainer.find({ gymOwner: ownerId });

    if (!trainers || trainers.length === 0) {
      return res.status(404).json({ message: "No trainers found" });
    }

    res.status(200).json({ trainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Failed to fetch trainers", error });
  }
};

export const getTrainersInfoController = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json({ trainer });
  } catch (error) {
    console.error("Error fetching trainer info:", error);
    res.status(500).json({ message: "Failed to fetch trainer info", error });
  }
};

export const getGymController = async (req, res) => {
  try {
    const gyms = await GymOwner.find().populate("trainers");
    if (!gyms || gyms.length === 0) {
      return res.status(404).json({ message: "No gyms found" });
    }
    res.status(200).json({ gyms });
  } catch (error) {
    console.error("Error fetching gym owner:", error);
    res.status(500).json({ message: "Failed to fetch gym owner", error });
  }
}

export const getGymByIdController = async (req, res) => {
  try {
    const gymId = req.params.id;
    const gym = await GymOwner.findById(gymId).populate("trainers");
    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }
    res.status(200).json({ gym });
  } catch (error) {
    console.error("Error fetching gym by ID:", error);
    res.status(500).json({ message: "Failed to fetch gym", error });
  }
};