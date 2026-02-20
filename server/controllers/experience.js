const Experience = require("../models/Experience");

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createExperience = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Données manquantes" });
    }

    const experience = new Experience({
      ...req.body,
    });

    await experience.save();

    res.status(201).json({
      message: "Expérience enregistrée !",
      experience,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.modifyExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: "Expérience non trouvée" });
    }

    const experienceObject = req.body.experience || req.body;

    await Experience.updateOne(
      { _id: req.params.id },
      { ...experienceObject, _id: req.params.id },
    );

    res.status(200).json({ message: "Expérience modifiée !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: "Expérience non trouvée" });
    }

    await Experience.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Expérience supprimée !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
