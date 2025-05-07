import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAnimateOnScroll,
  useAnimateChildrenOnScroll,
} from "../hooks/useAnimateOnScroll";
import { useLanguage } from "../contexts/LanguageContext";
import emailjs from "@emailjs/browser";

interface FormInputs {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  file?: FileList;
}

const ContactForm: React.FC = () => {
  const { translations } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useAnimateOnScroll(titleRef as React.RefObject<HTMLElement>, "appear");
  useAnimateChildrenOnScroll(
    formRef as React.RefObject<HTMLElement>,
    ".form-group",
    "appear"
  );

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formElement = formRef.current;
    if (!formElement) return;

    try {
      const result = await emailjs.sendForm(
        "service_1r0v0jq", // ✅ Your actual service ID
        "template_q0bqfkh", // ✅ Your template ID
        formElement,
        "e0sU5MPVVIWfJVa-o" // ✅ Your public key
      );

      console.log("Email sent:", result.text);

      const file = data.file?.[0];
      if (file) {
        console.log("File:", file.name, file.type, file.size);
      }

      const formContainer = document.querySelector(".form-container");
      if (formContainer) {
        formContainer.innerHTML = `
          <div class="success-message scale-in appear">
            <div class="success-icon">✓</div>
            <h3>${translations.contact.successTitle}</h3>
            <p>${translations.contact.successMessage}</p>
          </div>
        `;
      }

      reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {/* <h2 ref={titleRef} className="section-title slide-in-left">
          {translations.contact.title}
        </h2> */}

        <div className="form-container">
          <h2 ref={titleRef} className="section-title slide-in-left">
            {translations.contact.subTitle}
          </h2>
          <p style={{marginBottom:'35px'}} >{translations.contact.subTitleContent}</p>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group fade-in">
              <label htmlFor="fullName">
                {translations.contact.fullName} *
              </label>
              <input
                id="fullName"
                type="text"
                className={`form-input ${
                  errors.fullName ? "error" : ""
                } hover-glow`}
                {...register("fullName", {
                  required: `${translations.contact.fullName} ${translations.contact.required}`,
                })}
                name="fullName" // IMPORTANT for EmailJS
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName.message}</span>
              )}
            </div>

            <div className="form-group fade-in">
              <label htmlFor="email">{translations.contact.email} *</label>
              <input
                id="email"
                type="email"
                className={`form-input ${
                  errors.email ? "error" : ""
                } hover-glow`}
                {...register("email", {
                  required: `${translations.contact.email} ${translations.contact.required}`,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: translations.contact.invalidEmail,
                  },
                })}
                name="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group fade-in">
              <label htmlFor="phone">{translations.contact.phone}</label>
              <input
                id="phone"
                type="tel"
                className="form-input hover-glow"
                {...register("phone")}
                name="phone"
              />
            </div>

            <div className="form-group fade-in">
              <label htmlFor="message">{translations.contact.message} *</label>
              <textarea
                id="message"
                className={`form-textarea ${
                  errors.message ? "error" : ""
                } hover-glow`}
                rows={5}
                {...register("message", {
                  required: `${translations.contact.message} ${translations.contact.required}`,
                })}
                name="message"
              ></textarea>
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>

            <div className="form-group fade-in">
              <label htmlFor="file">{translations.contact.fileUpload}</label>
              <input
                id="file"
                type="file"
                className="form-input hover-glow"
                accept=".pdf,.csv,.docx"
                {...register("file")}
                name="file" // for EmailJS attachment support
              />
              <small className="file-note">
                {translations.contact.fileTypes}
              </small>
            </div>

            <div className="form-group fade-in">
              <button type="submit" className="submit-button hover-lift pulse">
                {translations.contact.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
