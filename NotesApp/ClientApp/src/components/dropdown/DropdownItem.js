function DropdownItem(props) {
  return (
      <div
          className="text-base font-normal p-2 cursor-pointer rounded-lg sm:hover:bg-slate-100 hover:dark:bg-neutral-500"
          onClick={props.onClick}>
        {props.children}
      </div>
  );
}

export default DropdownItem;