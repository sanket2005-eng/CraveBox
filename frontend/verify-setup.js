import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n' + '='.repeat(60));
console.log('🔍 Frontend Setup Verification');
console.log('='.repeat(60) + '\n');

const checks = [];

// Check 1: Required files exist
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'postcss.config.js',
  'tailwind.config.js',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/context/CartContext.jsx',
  'src/pages/Home.jsx',
  'src/pages/Menu.jsx',
  'src/pages/Cart.jsx',
  'src/pages/Checkout.jsx',
  'src/pages/OrderSuccess.jsx',
  'src/data/menuData.js'
];

console.log('📋 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  checks.push({ name: file, status: exists });
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
});

// Check 2: Node modules
console.log('\n📦 Checking node_modules...');
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
console.log(`  ${nodeModulesExists ? '✓' : '✗'} node_modules exists`);
checks.push({ name: 'node_modules', status: nodeModulesExists });

// Check 3: Build folder
console.log('\n📁 Checking build folder...');
const distExists = fs.existsSync(path.join(__dirname, 'dist'));
console.log(`  ${distExists ? '✓' : '✗'} dist folder exists (production build)`);
checks.push({ name: 'dist folder', status: distExists });

// Summary
console.log('\n' + '='.repeat(60));
const allPass = checks.every(c => c.status);
if (allPass) {
  console.log('✓ All checks passed! Frontend is ready.');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Open: http://localhost:3000');
} else {
  console.log('✗ Some checks failed. Please run:');
  console.log('  npm install');
}
console.log('='.repeat(60) + '\n');
