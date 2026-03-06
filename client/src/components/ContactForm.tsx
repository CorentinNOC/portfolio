import type { FormEvent } from "react";
import React, { useState } from "react";
import { contactService } from "../services/contactService";

interface FormData {
  prenom: string;
  email: string;
  sujet: string;
  message: string;
}

interface FormErrors {
  prenom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    prenom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.sujet.trim()) {
      newErrors.sujet = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await contactService.sendMessage(formData);

      setSubmitSuccess(true);
      setFormData({
        prenom: "",
        email: "",
        sujet: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full border border-secondary mt-8 p-6">
      <h3 className="text-xl font-bold mb-4">Contactez-moi</h3>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-500">
          <p className="font-medium text-green-700">
            ✓ Message envoyé avec succès !
          </p>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-500">
          <p className="font-medium text-red-700">✕ {submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.prenom ? "border-red-500" : "border-secondary"
            } focus:bg-secondary/25 transition duration-200 outline-none`}
            placeholder="Votre prénom"
          />
          {errors.prenom && (
            <p className="mt-2 text-sm text-red-600">{errors.prenom}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.email ? "border-red-500" : "border-secondary"
            } focus:bg-secondary/25 transition duration-200 outline-none`}
            placeholder="votre.email@exemple.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="sujet" className="block text-sm font-medium mb-2">
            Sujet
          </label>
          <input
            type="text"
            id="sujet"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.sujet ? "border-red-500" : "border-secondary"
            } focus:bg-secondary/25 transition duration-200 outline-none`}
            placeholder="Sujet de votre message"
          />
          {errors.sujet && (
            <p className="mt-2 text-sm text-red-600">{errors.sujet}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 border ${
              errors.message ? "border-red-500" : "border-secondary"
            } focus:bg-secondary/25 transition duration-200 outline-none resize-none`}
            placeholder="Votre message..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 border border-secondary font-medium transition duration-200 ${
              isSubmitting
                ? "bg-primary cursor-not-allowed"
                : "bg-primary hover:bg-secondary/25 active:bg-secondary/25"
            } focus:outline-none focus:bg-secondary/25`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </span>
            ) : (
              "Envoyer le message"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
