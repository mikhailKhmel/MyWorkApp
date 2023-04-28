import {useEffect, useState} from 'react';

function Dropdown(props) {
  const {open, children} = props;

  const [shouldRender, setRender] = useState(false);

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) {
      setRender(false);
    }
  };

  return (
      shouldRender &&
      (
          <div
              onTransitionEnd={onAnimationEnd}
              className={`${open
                  ?
                  'translate-x-0 opacity-100'
                  :
                  'translate-x-96 opacity-0'} transition-all duration-300 fixed top-12 right-4 flex flex-col gap-2 w-56 text-left mt-1 bg-white py-2 px-2 shadow-lg rounded-lg animate-drop dark:bg-neutral-700`}>
            <div className="relative">
              {children}
            </div>

          </div>)
  );
}

export default Dropdown;