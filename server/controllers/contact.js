const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactEmail = async (req, res) => {
  console.log("📧 Requête de contact reçue");

  try {
    const { prenom, email, sujet, message } = req.body;

    if (!prenom || !email || !sujet || !message) {
      console.log("❌ Validation échouée");
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    console.log("✅ Validation OK, envoi email...");

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact - ${sujet}`,
      html: `
        <h2>Nouveau message depuis votre portfolio</h2>
        <p><strong>De :</strong> ${prenom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <hr>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("❌ Erreur Resend:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ Email envoyé:", data);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("❌ Erreur:", error);
    res.status(500).json({
      error: "Erreur lors de l'envoi de l'email",
      details: error.message,
    });
  }
};
