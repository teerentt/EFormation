const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, '..');
const pattern = path.join(root, 'src', '**', '*.html');

const files = glob.sync(pattern, { nodir: true });
console.log(`Found ${files.length} HTML files`);

files.forEach((file) => {
  let s = fs.readFileSync(file, 'utf8');
  let original = s;

  // 1) Handle @if(...) { ... } @else {  -> convert to if and else containers
  s = s.replace(/@if\(([^)]+)\)\s*{([\s\S]*?)\}\s*@else\s*{/gms, (m, cond, ifBody) => {
    return `<ng-container *ngIf="${cond}">${ifBody}</ng-container>\n<ng-container *ngIf="!(${cond})">`;
  });

  // 2) Handle } @else { that may remain (edge cases). Try to replace pattern: } @else {
  s = s.replace(/}\s*@else\s*{/g, '</ng-container>\n<ng-container *ngIf="true">');

  // 3) Replace remaining @if(condition) {
  s = s.replace(/@if\(([^)]+)\)\s*{/g, (m, cond) => {
    return `<ng-container *ngIf="${cond}">`;
  });

  // 4) Replace @for(item of items; optional stuff) {
  s = s.replace(/@for\(\s*([^\s)]+)\s+of\s+([^\);]+)(?:;[^)]*)?\)\s*{/g, (m, item, list) => {
    return `<ng-container *ngFor=\"let ${item} of ${list.trim()}\">`;
  });

  // 5) Handle patterns like '} @if(...){' -> close then open
  s = s.replace(/}\s*@if\(([^)]+)\)\s*{/g, (m, cond) => {
    return `</ng-container>\n<ng-container *ngIf="${cond}">`;
  });

  // 6) Replace lone '}' lines with closing container
  s = s.replace(/^\s*}\s*$/gm, '</ng-container>');

  if (s !== original) {
    fs.writeFileSync(file, s, 'utf8');
    console.log(`Transformed (phase1): ${file}`);
  }

  // If there are still @if/@for patterns (complex nesting), perform a robust parse-by-index fallback
  if (/@if\(|@for\(/.test(s)) {
    let t = s;

    // helper: replace all occurrences of a pattern @if(...) {
    while (t.indexOf('@if(') !== -1) {
      const idx = t.indexOf('@if(');
      const tail = t.slice(idx);
      const m = tail.match(/\)\s*{/);
      if (!m) break; // malformed, give up
      const cond = tail.slice(4, m.index).trim();
      t = t.slice(0, idx) + `<div *ngIf="${cond}">` + t.slice(idx + m.index + m[0].length);
    }

    // helper for @for(...){
    while (t.indexOf('@for(') !== -1) {
      const idx = t.indexOf('@for(');
      const tail = t.slice(idx);
      const m = tail.match(/\)\s*{/);
      if (!m) break;
      const inside = tail.slice(5, m.index).trim();
      // inside typically: "item of items; track ..." or "item of items"
      const main = inside.split(';')[0].trim();
      // main should be like "x of y"; we will put it directly into *ngFor
      t = t.slice(0, idx) + `<div *ngFor="let ${main}">` + t.slice(idx + m.index + m[0].length);
    }

    // handle patterns like '} @if(' -> close div then open
    while (t.indexOf('} @if(') !== -1) {
      const idx = t.indexOf('} @if(');
      const tail = t.slice(idx + 3);
      const m = tail.match(/\)\s*{/);
      if (!m) break;
      const cond = tail.slice(6, m.index).trim();
      t = t.slice(0, idx) + `</div>\n<div *ngIf="${cond}">` + t.slice(idx + 3 + m.index + m[0].length);
    }

    // final pass: replace lone '}' lines with closing div tags
    t = t.replace(/^\s*}\s*$/gm, '</div>');

    if (t !== s) {
      fs.writeFileSync(file, t, 'utf8');
      console.log(`Transformed (phase2 fallback robust): ${file}`);
    }
  }
});

console.log('Preprocessing complete');
