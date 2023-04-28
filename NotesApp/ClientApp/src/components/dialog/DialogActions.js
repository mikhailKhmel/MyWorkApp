function DialogActions(props) {
  return (
      <div className="flex flex-row gap-1 justify-end">
        {props.children}
      </div>
  );
}

export default DialogActions;