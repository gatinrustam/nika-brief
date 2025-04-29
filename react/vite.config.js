import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const tempDir = path.resolve(__dirname, './.vite-tmp');
const preservedFiles = ['.htaccess', 'bootstrap.php', 'index.php'];
const templateDest = path.resolve(__dirname, '../app/views/index/index.template.php');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'preserve-and-move-index',
      async buildStart() {
        await fs.mkdir(tempDir, { recursive: true });
        for (const file of preservedFiles) {
          const from = path.join(publicDir, file);
          const to = path.join(tempDir, file);
          try {
            await fs.copyFile(from, to);
          } catch (err) {
            console.warn(`⚠️  Не смог сохранить ${file}: ${err.message}`);
          }
        }
      },
      async closeBundle() {
        try {
          await fs.mkdir(path.dirname(templateDest), { recursive: true });
          await fs.copyFile(
            path.join(publicDir, 'index.html'),
            templateDest
          );
          console.log(`📄 index.html → ${templateDest}`);
        } catch (err) {
          console.warn(`⚠️  Не смог перенести index.html: ${err.message}`);
        }

        for (const file of preservedFiles) {
          const from = path.join(tempDir, file);
          const to = path.join(publicDir, file);
          try {
            await fs.copyFile(from, to);
            console.log(`♻️  Восстановлен: ${file}`);
          } catch (err) {
            console.warn(`⚠️  Не смог восстановить ${file}: ${err.message}`);
          }
        }

        try {
          await fs.unlink(path.join(publicDir, 'index.html'));
          console.log(`🗑  Удалён index.html из public`);
        } catch (err) {
          console.warn(`⚠️  Не смог удалить public/index.html: ${err.message}`);
        }

        await fs.rm(tempDir, { recursive: true, force: true });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: publicDir,
    emptyOutDir: true,
  },
});