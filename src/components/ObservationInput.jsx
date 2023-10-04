function ObservationInput({
  label,
  name,
  placeholder,
  inputType,
  value,
  handleInputChange,
  id,
}) {
  return (
    <label className="flex justify-left">
      <span className="w-[145px]">{label}</span>
      <input
        className="py-2 pl-2 bg-slate-200 border-[1px] border-[#251430] outline-none w-[180px]"
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        id={id}
      />
    </label>
  );
}

export default ObservationInput;
