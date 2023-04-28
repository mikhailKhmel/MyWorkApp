import React, {memo, useEffect} from 'react';
import EditorJS from '@editorjs/editorjs';
import {EditorTools} from './EditorTools';
import {i18in} from './EditorI18n';

const Editor = ({refValue, data, onChange, holder}) => {

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (refValue && refValue.current === null && data) {
      refValue.current = new EditorJS({
        holder: holder,
        tools: EditorTools,
        i18n: i18in,
        placeholder: 'Что нового?',
        data,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
    }

  }, [data, holder, onChange, refValue]);

  return <div className="prose max-w-full p-2 dark:bg-neutral-100 rounded-lg"
              id={holder}/>;
};

export default memo(Editor);