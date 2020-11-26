export const type = {
  generic: (name = '', defaultOption = '') => {
    return (obj = {}, value = defaultOption) => {
      obj[name] = (value || defaultOption);
      return obj;
    };
  },

  event: (eventType = '', action = '', ignoreEmpty = false) => {
    return (obj = {}, value = '') => {
      if (ignoreEmpty && !value) return false;
      obj[`${eventType}Event`] = { action, value };
      return obj;
    };
  },
};

export default {
  // ---------------------------- //
  //   Generic Text Formatting    //
  // ---------------------------- //

  t: type.generic('text'),
  text: type.generic('text'),
  f: type.generic('font', 'minecraft:default'),
  font: type.generic('font', 'minecraft:default'),
  c: type.generic('color', 'white'),
  color: type.generic('color', 'white'),
  b: type.generic('bold'),
  bold: type.generic('bold'),
  i: type.generic('italic'),
  italic: type.generic('italic'),
  u: type.generic('underlined'),
  underlined: type.generic('underlined'),
  s: type.generic('strikethrough'),
  strikethrough: type.generic('strikethrough'),
  o: type.generic('obfuscated'),
  obfuscated: type.generic('obfuscated'),


  // ---------------------------- //
  //        Event Handlers        //
  // ---------------------------- //

  // Click Events
  copy: type.event('click', 'copy_to_clipboard', true),
  copytoclipboard: type.event('click', 'copy_to_clipboard', true),
  url: type.event('click', 'open_url', true),
  openurl: type.event('click', 'open_url', true),
  cmd: type.event('click', 'run_command', true),
  runcmd: type.event('click', 'run_command', true),
  suggest: type.event('click', 'suggest_command', true),
  suggestcmd: type.event('click', 'suggest_command', true),
  page: type.event('click', 'change_page', true),
  changepage: type.event('click', 'change_page', true),

  // Hover Events
  tip: type.event('hover', 'show_text'),
  tooltip: type.event('hover', 'show_text'),
  tipitem: type.event('hover', 'show_item'),
  tooltipitem: type.event('hover', 'show_item'),
  tipentity: type.event('hover', 'show_entity'),
  tooltipentity: type.event('hover', 'show_entity'),
};