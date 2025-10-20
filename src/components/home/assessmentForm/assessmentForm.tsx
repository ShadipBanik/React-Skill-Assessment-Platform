import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  checkbox1: boolean;
  checkbox2: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  checkbox2?: string;
}

const AssessmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    checkbox1: false,
    checkbox2: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    status: string;
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Clear error immediately if field becomes valid
    setErrors((prev) => {
      const updated = { ...prev };
      if (newValue && prev[name as keyof FormErrors]) {
        delete updated[name as keyof FormErrors];
      }
      return updated;
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.checkbox2)
      newErrors.checkbox2 = "You must accept terms & privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const email = localStorage.getItem(`user`);
    if (formData.email === email)
      return setMessage({
        status: "error",
        text: "This assessment has already been completed. Thank you for your time. For any inquiries, please contact the hiring company.",
      });
    setLoading(true);
    console.log(formData);
    setTimeout(() => {
      localStorage.setItem(`user`, formData.email);
      navigate("assessment");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        checkbox1: false,
        checkbox2: false,
      });
      setErrors({});
      setLoading(false);
    }, 2000);
  };

  // Utility classes for error/normal inputs
  const inputClasses = (field: keyof FormErrors) =>
    `peer block w-full bg-transparent pt-5 pb-2  text-sm placeholder-transparent 
     focus:outline-none border-0 border-b 
     ${
       errors[field]
         ? "border-red-500 focus:border-red-500"
         : "border-gray-300 focus:border-purple-600"
     }`;

  const labelClasses = (field: keyof FormErrors) =>
    `absolute  top-1 text-sm transition-all 
     peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
     peer-focus:top-1 peer-focus:text-sm
     ${
       errors[field]
         ? "text-red-500 peer-focus:text-red-500"
         : "text-gray-500 peer-focus:text-purple-600"
     }`;

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-12 assessmentForm">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Before we start, please fill your details:
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full p-6 rounded-lg md:shadow-none"
      >
        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={inputClasses("first_name")}
              placeholder=" "
            />
            <label htmlFor="first_name" className={labelClasses("first_name")}>
              First Name
            </label>
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
            )}
          </div>

          <div className="relative z-0 w-full">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={inputClasses("last_name")}
              placeholder=" "
            />
            <label htmlFor="last_name" className={labelClasses("last_name")}>
              Last Name
            </label>
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses("email")}
              placeholder=" "
            />
            <label htmlFor="email" className={labelClasses("email")}>
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative z-0 w-full">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses("phone")}
              placeholder=" "
            />
            <label htmlFor="phone" className={labelClasses("phone")}>
              Phone
            </label>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Checkbox 1 */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="checkbox1"
            checked={formData.checkbox1}
            onChange={handleChange}
            className="mt-1 w-4 h-4 shrink-0 accent-[#6c5ce7]"
          />
          <label className="text-gray-700 text-sm sm:text-base">
            Enable accessibility plugin
          </label>
        </div>

        {/* Checkbox 2 */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="checkbox2"
            checked={formData.checkbox2}
            onChange={handleChange}
            className={`mt-1 w-4 h-4 shrink-0 accent-[#6c5ce7]  ${
              errors.checkbox2 ? "border-red-500" : ""
            }`}
          />
          <label className="text-gray-700 text-sm sm:text-base">
            I have read and agree to the{" "}
            <Link to="/terms" className="text-blue-600 underline">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 underline">
              privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.checkbox2 && (
          <p className="text-red-500 text-xs mt-1">{errors.checkbox2}</p>
        )}
        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-[rgb(114,103,240)] flex items-center justify-center gap-2 
                        text-white rounded hover:bg-[rgb(114,103,240)] disabled:opacity-70 
                        w-[221px] h-[44px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Start Assessment"
            )}
          </button>
        </div>
        {message && (
          <div
            className={`p-4 border-l-6 flex rounded-md px-4 py-3   relative ${
              message.status === "error"
                ? "bg-red-100 border-red-300 text-red-700"
                : "bg-green-100 border-green-300 text-green-700"
            }`}
            role="alert"
          >
            <span className="flex mt-2  h-7 w-7 rounded-full bg-red-500 px-1 py-0.5">
              <svg
                className="fill-current h-6 w-6 text-white"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>

            <p className="py-3 px-6 text-sm">{message.text}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default AssessmentForm;
