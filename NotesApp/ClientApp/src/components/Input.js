function Input(props) {
  const {value, onChange} = props;

  return (
      <input
          className="border-2 border-slate-100 focus:outline-none focus:border-slate-300 rounded w-full p-1 dark:border-neutral-700"
          type="text" value={value} onChange={onChange}/>
  );
}

export default Input;