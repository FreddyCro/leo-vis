#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { fileURLToPath } from 'url';

// 取得當前文件的目錄路徑（ES modules 中需要這樣做）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 支援的圖片格式
const SUPPORTED_FORMATS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.bmp',
  '.tiff',
];

// 輸出文件
const OUTPUT_FILE = 'image-info.json';

// 檢查目錄是否存在
function checkDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Error: ${dir} directory not found!`);
    process.exit(1);
  }
}

// 獲取所有圖片文件
function getAllImageFiles(dir) {
  const files = [];

  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (SUPPORTED_FORMATS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  scanDir(dir);
  return files.sort();
}

// 使用 image-size 套件獲取圖片尺寸
function getImageDimensions(filePath) {
  try {
    // 讀取文件作為 Buffer 傳給 image-size
    const buffer = fs.readFileSync(filePath);
    const dimensions = sizeOf(buffer);
    return {
      width: dimensions.width || 'unknown',
      height: dimensions.height || 'unknown',
      type: dimensions.type || 'unknown',
    };
  } catch (error) {
    console.warn(
      `Warning: Could not read dimensions for ${filePath}: ${error.message}`,
    );
    return { width: 'error', height: 'error', type: 'error' };
  }
}

// 獲取文件大小
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 'unknown';
  }
}

// 處理單個圖片文件
function processImageFile(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  // 使用 image-size 套件獲取所有圖片格式的尺寸（包括 SVG）
  const dimensions = getImageDimensions(filePath);
  const fileSize = getFileSize(filePath);

  console.log(
    `Processed: ${filename} (${dimensions.width} x ${dimensions.height}) [${dimensions.type}]`,
  );

  return {
    filename,
    path: filePath.replace(/\\/g, '/'), // 統一使用斜線
    width: dimensions.width,
    height: dimensions.height,
    type: dimensions.type,
    file_size_bytes: fileSize,
  };
}

// 主函數
function main() {
  console.log(' Checking directories...');
  checkDirectory('public/img');

  console.log('🖼️  Finding image files...');
  const imageFiles = getAllImageFiles('public/img');

  if (imageFiles.length === 0) {
    console.log('No image files found in public/img directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} image files. Processing...`);
  console.log('');

  const images = [];

  for (const filePath of imageFiles) {
    const imageInfo = processImageFile(filePath);
    images.push(imageInfo);
  }

  // 生成 JSON 輸出
  const output = {
    images,
    total_images: images.length,
    generated_at: new Date().toISOString(),
  };

  // 寫入文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

  console.log('');
  console.log(`✅ Image information has been exported to: ${OUTPUT_FILE}`);
  console.log(`📊 Total images processed: ${images.length}`);
  console.log('');
  console.log('To view the JSON file:');
  console.log(`cat ${OUTPUT_FILE}`);
  console.log('');
  console.log('To format and view nicely (if jq is installed):');
  console.log(`cat ${OUTPUT_FILE} | jq .`);
}

// 執行主函數
main();
