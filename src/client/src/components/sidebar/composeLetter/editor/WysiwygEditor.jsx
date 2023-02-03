import React, {useContext} from 'react';
import './WysiwygEditor.sass';
import {toolbarButtons} from './toolbar';
import ToolbarButton from './ToolbarButton';
import {initialComposeContent, MailContext} from '../../../../context/MailContext';

const WysiwygEditor = () => {

  const {composeLetter, setComposeLetter} = useContext(MailContext);

  const handleContentChange = (e) => {
    setComposeLetter({...composeLetter, content: e.target.innerHTML});
  };


  return (
    <div className="popup__scroll-view__editor">

      <div className="editor__toolbar">
        {toolbarButtons.map((buttonObj, index) =>
          <ToolbarButton icon={buttonObj.icon} func={buttonObj.func} key={index}/>
        )}
      </div>

      <div className="editor__editable"
           contentEditable={true}
           onInput={handleContentChange}
           dangerouslySetInnerHTML={{__html: initialComposeContent}}
           suppressContentEditableWarning/>
    </div>
  );
};

export default WysiwygEditor;
