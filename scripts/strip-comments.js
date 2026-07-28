const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const extensions = ['.js', '.jsx'];

const sourceDirs = [
  'backend/controllers',
  'backend/middleware',
  'backend/models',
  'backend/routes',
  'backend/config',
  'backend',
  'src/components/ui',
  'src/components',
  'src/pages',
  'src/context',
  'src/services',
  'src',
];

// Single-line comment: // ...
// Multi-line comment: /* ... */
// JSDoc: /** ... */

function stripComments(code) {
  // Remove multi-line comments (including JSDoc) - handles nested-ish cases
  // First, protect string contents by replacing them with placeholders
  const strings = [];
  let stringIndex = 0;
  
  // Replace strings with placeholders
  code = code.replace(/(['"`])(?:(?!\1|\\).|\\.)*\1/g, (match) => {
    const key = `__STRING_${stringIndex}__`;
    strings.push({ key, value: match });
    stringIndex++;
    return key;
  });
  
  // Replace template literals
  code = code.replace(/`(?:(?!`|\\).|\\.)*`/g, (match) => {
    const key = `__STRING_${stringIndex}__`;
    strings.push({ key, value: match });
    stringIndex++;
    return key;
  });
  
  // Remove multi-line comments (including JSDoc)
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove single-line comments (must be on their own line or at end of line)
  // This handles:
  //   // comment
  //   code // comment
  code = code.replace(/^\s*\/\/.*$/gm, '');  // whole line comment
  code = code.replace(/[ \t]+\/\/.*$/gm, ''); // trailing comment
  
  // Restore strings
  strings.reverse().forEach(({ key, value }) => {
    code = code.replace(key, value);
  });
  
  // Clean up multiple blank lines
  code = code.replace(/\n{3,}/g, '\n\n');
  code = code.replace(/^\s*\n/gm, '\n');
  
  return code;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleaned = stripComments(content);
  if (content !== cleaned) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    console.log(`Cleaned: ${path.relative(baseDir, filePath)}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  let count = 0;
  for (const subDir of sourceDirs) {
    const fullDir = path.join(baseDir, subDir);
    if (!fs.existsSync(fullDir)) continue;
    const entries = fs.readdirSync(fullDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          const filePath = path.join(fullDir, entry.name);
          if (processFile(filePath)) count++;
        }
      }
    }
  }
  return count;
}

const total = walkDir(baseDir);
console.log(`\nTotal files modified: ${total}`);