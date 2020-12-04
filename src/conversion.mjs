import { curry, assignMethodAliases } from './util/conversion.util.mjs';

// TODO - Methods like score should *only* accept embedded objects
// and throw an error out otherwise. I should probably make another
// curry, i.e. curry.embedded
const methods = {
  // Generic Text Formatting
  font: curry.generic({ prop: 'font', fallback: 'minecraft:default' }),
  color: curry.generic({ prop: 'color', fallback: 'white' }),
  bold: curry.generic({ prop: 'bold' }),
  italic: curry.generic({ prop: 'italic' }),
  underlined: curry.generic({ prop: 'underlined' }),
  strikethrough: curry.generic({ prop: 'strikethrough' }),
  obfuscated: curry.generic({ prop: 'obfuscated' }),

  // Content Methods
  text: curry.generic({ prop: 'text' }),
  value: curry.generic({ prop: 'value' }),
  contents: curry.generic({ prop: 'contents' }),
  extra: curry.generic({ prop: 'extra' }),
  translate: curry.generic({ prop: 'translate' }),
  with: curry.generic({ prop: 'with' }),
  score: curry.generic({ prop: 'score' }),
  objective: curry.generic({ prop: 'objective' }),
  name: curry.generic({ prop: 'name' }),
  selector: curry.generic({ prop: 'selector' }),
  keybind: curry.generic({ prop: 'keybind' }),
  nbt: curry.generic({ prop: 'nbt' }),
  block: curry.generate({ prop: 'block' }),
  entity: curry.genreate({ prop: 'entity' }),
  storage: curry.generate({ prop: 'storage' }),
  extra: curry.generate({ prop: 'extra' }),

  // Shift Click Event
  insertion: curry.generic({ prop: 'insertion' }), // appends text to user's chatbox

  // Click Events
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

assignMethodAliases(methods, {
  t: 'text',
  f: 'font',
  c: 'color',
  b: 'bold',
  i: 'italic',
  u: 'underlined',
  s: 'strikethrough',
  o: 'obfuscated',
  v: 'value',
  key: 'keybind',
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