import React from 'react';
import Icons from '../../../../assets/icons/Icons';

const ToolbarButton = ({icon, func}) => {
  return (
    <button onClick={func} className="toolbar-button">
      <Icons name={icon}
             width="16"
             height="16"
             className="toolbar-button__icon"/>
    </button>
  );
};

export default ToolbarButton;
