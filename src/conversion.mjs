import { curry, assignMethodAlias } from './util/conversion.util.mjs';

const methods = {
  //  Generic Text Formatting
  text: curry.generic({ prop: 'text' }),
  font: curry.generic({ prop: 'font', _default: 'minecraft:default' }),
  color: curry.generic({ prop: 'color', _default: 'white' }),
  bold: curry.generic({ prop: 'bold' }),
  italic: curry.generic({ prop: 'italic' }),
  underlined: curry.generic({ prop: 'underlined' }),
  strikethrough: curry.generic({ prop: 'strikethrough' }),
  obfuscated: curry.generic({ prop: 'obfuscated' }),


  //  Content Handlers
  value: curry.generic({ prop: 'value' }),
  contents: curry.generic({ prop: 'contents' }),


  //  Event Handlers

  // Click Events
  insertion: curry.generic({ prop: 'insertion' }), // shift + click (appends to user chat)
  copytoclipboard: curry.event({ type: 'click', action: 'copy_to_clipboard', ignoreEmpty: true }),
  openurl: curry.event({ type: 'click', action: 'open_url', ignoreEmpty: true }),
  runcmd: curry.event({ type: 'click', action: 'run_command', ignoreEmpty: true }),
  suggestcmd: curry.event({ type: 'click', action: 'suggest_command', ignoreEmpty: true }),
  changepage: curry.event({ type: 'click', action: 'change_page', ignoreEmpty: true }),

  // Hover Events
  hover: curry.event({ type: 'hover', action: 'show_text' }),
  hoveritem: curry.event({ type: 'hover', action: 'show_item' }),
  hoverentity: curry.event({ type: 'hover', action: 'show_entity' }),
};

assignMethodAlias(methods, {
  t: 'text',
  f: 'font',
  c: 'color',
  b: 'bold',
  i: 'italic',
  u: 'underlined',
  s: 'strikethrough',
  o: 'obfuscated',
  v: 'value',
  insert: 'insertion',
  copy: 'copytoclipboard',
  url: 'openurl',
  cmd: 'runcmd',
  suggest: 'suggestcmd',
  page: 'changepage',
  hov: 'hover',
  hovitem: 'hoveritem',
  hoventity: 'hoverentity'
});

export default methods;