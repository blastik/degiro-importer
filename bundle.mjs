import { copyFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

// Wealthfolio's (Rust) manifest parser rejects a UTF-8 BOM or invalid JSON with
// "expected value at line 1 column 1" — fail here instead of at install time.
const manifest = readFileSync('manifest.json', 'utf8');
if (manifest.charCodeAt(0) === 0xfeff) {
  throw new Error('manifest.json starts with a UTF-8 BOM; save it as UTF-8 without BOM');
}
JSON.parse(manifest);

copyFileSync('manifest.json', 'dist/manifest.json');

// Simple zip using PowerShell on Windows
execSync(
  'powershell -Command "Compress-Archive -Path dist\\* -DestinationPath degiro-importer.zip -Force"',
);
console.log('Created degiro-importer.zip');
