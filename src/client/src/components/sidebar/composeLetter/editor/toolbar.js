import {editorUiIcons} from '../../../../assets/icons';

export const toolbarButtons = [
  {
    icon: editorUiIcons.editor_bold_icon,
    func: () => {
      document.execCommand('bold', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_italic_icon,
    func: () => {
      document.execCommand('italic', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_underline_icon,
    func: () => {
      document.execCommand('underline', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_strike_through_icon,
    func: () => {
      document.execCommand('strikeThrough', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_undo_icon,
    func: () => {
      document.execCommand('undo', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_redo_icon,
    func: () => {
      document.execCommand('redo', false, null);
    },
  },
  {
    icon: editorUiIcons.editor_clear_format_icon,
    func: () => {
      document.execCommand('removeFormat', false, null);
    },
  },
];
