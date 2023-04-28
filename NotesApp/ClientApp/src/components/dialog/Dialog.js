import {useEffect, useState} from 'react';

function Dialog(props) {
  const {open, children} = props;

  const [shouldRender, setRender] = useState(open);

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) setRender(false);
  };

  return (
      shouldRender &&
      (<div onTransitionEnd={onAnimationEnd}>
        <div
            className={`${open
                ? 'opacity-50' : 'opacity-0 '
            }  transition-all duration-300 z-20 fixed inset-0 bg-gray-600  h-full w-full animate-bgdialog`}/>
        <div
            className={` ${open
                ?
                'translate-x-0 '
                :
                '-translate-x-96 opacity-0'} transition-all duration-300 z-30 fixed inset-0 m-auto bg-white border-2 rounded-xl flex flex-col gap-1 w-80 h-min p-3 animate-dialog dark:bg-neutral-600 dark:border-neutral-600`}>
          {children}
        </div>
      </div>)
  );

}

export default Dialog;