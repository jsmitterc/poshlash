import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import 'react-router-dom'; // Ensure it's imported

export default defineConfig({
    plugins: [
        react(), // React plugin that we installed for vite.js
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});