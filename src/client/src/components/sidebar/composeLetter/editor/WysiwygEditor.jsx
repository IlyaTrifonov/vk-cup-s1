import React from 'react';
import './WysiwygEditor.sass';
import {toolbarButtons} from './toolbar';
import ToolbarButton from './ToolbarButton';

const WysiwygEditor = () => {

  // const [content, setContent] = useState('');

  // const contentRef = useRef(null);
  //
  // const handleContentChange = (e) => {
  //   // setContent(e.target.innerHTML);
  //   contentRef.current.innerHTML = e.target.innerHTML.replace(/([^<a\s]+)([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)([^<\/a\s]+)/gi, '$1<a href="mailto:$2">$2</a>$3');
  // };


  return (
    <div className="popup__scroll-view__editor">

      <div className="editor__toolbar">
        {toolbarButtons.map((v, index) =>
          <ToolbarButton icon={v.icon} func={v.func} key={index}/>
        )}
      </div>

      <div className="editor__editable"
           contentEditable
           // onInput={handleContentChange}
           // ref={contentRef}
           suppressContentEditableWarning>
        <div>Hello world!</div>
        <div><br/></div>
        <div><br/></div>
        <div>——</div>
        <div>Илья Трифонов</div>
        <div><a href="mailto:ilya.trifonov.official@vk.com">ilya.trifonov.official@vk.com</a></div>
        <div>Отправлено из почты VK Cup</div>
      </div>
    </div>
  );
};

export default WysiwygEditor;
