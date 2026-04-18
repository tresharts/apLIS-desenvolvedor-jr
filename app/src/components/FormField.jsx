function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  maxLength,
  inputMode,
}) {
  return (
    <label className="form-field" htmlFor={id}>
      <span className="form-field__label">{label}</span>
      <input
        id={id}
        className={`form-field__input ${error ? 'is-error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
      />
      <span className="form-field__error">{error ?? '\u00A0'}</span>
    </label>
  )
}

export default FormField
