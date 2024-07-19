import PropTypes from "prop-types"

export const Input = ({field, 
    label, 
    value, 
    onChangeHandler, 
    type, 
    showErrorMessage, 
    validationMessage, 
    onBlurHandler, 
    textarea,
    inputClassName="ejemplo"}) => {

    const handleValueChange = (e) => {
        onChangeHandler(e.target.value, field)
    }

    const handleOnBlur = (e) => {
        onBlurHandler(e.target.value, field)
    }
  return (
    <>
    <div className="">
      <label className="block text-#1f1f20-900">{label}</label>
    </div>
    {textarea ? (
      <textarea
        className={`w-full px-3 py-4  focus:outline-none focus:border-green-500 ${inputClassName}`}
        value={value}
        onChange={handleValueChange}
        onBlur={handleOnBlur}
        rows={5}
        style={{ maxWidth: "400px" }}

      />
    ) : (
      <input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500px ${inputClassName}`}
        type={type}
        value={value}
        onChange={handleValueChange}
        onBlur={handleOnBlur}
      />
    )}
    {showErrorMessage && (
      <span className="spansito text-red-500">{validationMessage}</span>
    )}
  </>
  )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool
}
