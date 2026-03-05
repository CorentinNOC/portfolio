const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface ContactFormData {
  prenom: string;
  email: string;
  sujet: string;
  message: string;
}

export const contactService = {
  async sendMessage(formData: ContactFormData): Promise<void> {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de l'envoi du message");
    }
  },
};
