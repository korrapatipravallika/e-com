import "./AuthForm.css";
function AuthForm({
  title,
  subtitle,
  fields,
  values,
  onChange,
  onSubmit,
  isLoading,
  submitLabel,
}) {
  return (
    <section className="auth-card">
      <p className="eyebrow">{subtitle}</p>
      <h2>{title}</h2>

      <form className="auth-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name}>
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={onChange}
              required
            />
          </label>
        ))}

        <button className="primary-button" type="submit" disabled={isLoading}>
          {isLoading ? "Please wait..." : submitLabel}
        </button>
      </form>
    </section>  
  );
}

export default AuthForm;
