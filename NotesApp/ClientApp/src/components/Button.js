function Button(props) {
  const {disabled, onClick, children, color} = props;
  return (
      <button disabled={disabled}
              className={`${!disabled
                  ?
                  `${color ||
                  'bg-slate-400'} text-slate-50 transition-all active:scale-105 active:bg-slate-600 sm:hover:bg-slate-600 dark:bg-neutral-500 dark:text-neutral-50`
                  :
                  'bg-slate-100 text-slate-500 dark:bg-neutral-700 dark:text-gray-500'} border-1 rounded-xl py-1.5 px-2 text-base font-normal dark:border-neutral-700`}
              onClick={onClick}>
        {children}
      </button>
  );
}

export default Button;