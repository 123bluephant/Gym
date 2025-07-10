import GymOwner from "../Models/GymOwner.js";
import Trainer from "../Models/Trainer.js";
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
    const { trainerId, fullName, email, experience, status, specializations, bio } = req.body;
    const image = req.file ? req.file.path : null; 
    console.log("Editing trainer with ID:", image,req.file);
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

    res.status(200).json({ message: "Trainer updated successfully", updatedTrainer });
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