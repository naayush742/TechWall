const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (let file of files) {
  let fp = path.join(pagesDir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // Regex to match the sidebar list item linking to #images
  const linkRegex = /<li>\s*<a href="#images">.*?<\/a>\s*<\/li>/gi;
  
  if (linkRegex.test(content)) {
    content = content.replace(linkRegex, '');
    fs.writeFileSync(fp, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Successfully removed Visual Overview sidebar link from ${modifiedCount} files.`);