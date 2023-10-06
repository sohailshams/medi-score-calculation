function ObservationCheckBox({
  label,
  inputType,
  name,
  checked,
  handleCheckBoxChange,
  id,
}) {
  return (
    <label className="flex justify-left">
      <span className="">{label}</span>
      <span>
        <input
          className="ml-3 py-8 bg-slate-200 border-[1px] border-[#251430] outline-none"
          type={inputType}
          name={name}
          checked={checked}
          onChange={handleCheckBoxChange}
          id={id}
        />
      </span>
    </label>
  );
}

export default ObservationCheckBox;
