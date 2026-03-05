const Project = require("../models/Project");
const fs = require("fs");

const cleanupFiles = (files) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Impossible de supprimer ${file.path}:`, err.message);
        }
      });
    });
  }
};

const deleteImage = async (imageUrl) => {
  try {
    const filename = imageUrl.split("/images/")[1];

    if (!filename) {
      console.error("Nom de fichier invalide:", imageUrl);
      return;
    }

    const filePath = `images/${filename}`;

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`✅ Image supprimée: ${filename}`);
    } else {
      console.warn(`⚠️ Fichier introuvable: ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ Impossible de supprimer l'image:`, err.message);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createProject = async (req, res) => {
  try {
    if (!req.body.project) {
      cleanupFiles(req.files);
      return res.status(400).json({ error: "Données manquantes" });
    }

    const projectObject = JSON.parse(req.body.project);
    delete projectObject._id;

    const imageUrls = req.files.map(
      (file) => `${process.env.BASE_URL}/images/${file.filename}`,
    );

    const project = new Project({
      ...projectObject,
      imageUrls,
    });

    await project.save();
    res.status(201).json({ message: "Projet enregistré !", project });
  } catch (error) {
    cleanupFiles(req.files);
    res.status(400).json({ error: error.message });
  }
};

exports.modifyProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      cleanupFiles(req.files);
      return res.status(404).json({ error: "Projet introuvable" });
    }

    let imageUrls = [...project.imageUrls];

    if (req.body.imagesToDelete) {
      const imagesToDelete = JSON.parse(req.body.imagesToDelete);

      await Promise.all(imagesToDelete.map(deleteImage));

      imageUrls = imageUrls.filter((url) => !imagesToDelete.includes(url));
    }

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(
        (file) => `${process.env.BASE_URL}/images/${file.filename}`,
      );
      imageUrls = [...imageUrls, ...newImageUrls];
    }

    const projectObject = {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag ? JSON.parse(req.body.tag) : project.tag,
      link: req.body.link,
      imageUrls,
    };

    await Project.updateOne(
      { _id: req.params.id },
      { ...projectObject, _id: req.params.id },
    );

    res.status(200).json({ message: "Projet modifié !" });
  } catch (error) {
    cleanupFiles(req.files);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Projet introuvable" });
    }

    await Promise.all(project.imageUrls.map(deleteImage));
    await Project.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Projet supprimé !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
