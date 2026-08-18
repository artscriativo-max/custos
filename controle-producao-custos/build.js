const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Criar pasta www de destino caso não exista
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Arquivos de produção a serem copiados
const filesToCopy = ['index.html', 'style.css', 'app.js'];

filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Sucesso: ${file} copiado para www/${file}`);
    } else {
        console.error(`Erro: Arquivo original ${file} não encontrado na raiz!`);
    }
});

console.log("Compilação estática concluída com sucesso.");
