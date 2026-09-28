import fs from 'node:fs';
console.log('font sizes',fs.statSync('public/brand/type-0.woff2').size,fs.statSync('public/brand/type-1.woff2').size);
