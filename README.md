# leo-vis

## Development

- node: v18.16+
- sass@1.76
- 開發: copy .env.development.example => .env
- nmdap: copy .env.nmdap.example => .env
- vip.udn: copy .env.production.example => .env

## Deployment

本專案提供三個部署腳本，對應不同的環境：

### `deploy-nmdap.sh`

- **用途**: 部署到 NMDAP 環境
- **環境配置**: 使用 `.env.nmdap.example`
- **部署分支**: `nmdap`
- **執行**: `bash deploy-nmdap.sh`

### `deploy-prod.sh`

- **用途**: 部署到正式環境 (Production)
- **環境配置**: 使用 `.env.production.example`
- **部署分支**: `production`
- **執行**: `bash deploy-prod.sh`

### `deploy-staging.sh`

- **用途**: 部署到測試環境 (Staging/GitHub Pages)
- **環境配置**: 使用 `.env.ghpage.example`
- **部署分支**: `staging`
- **執行**: `bash deploy-staging.sh`

布署的檔案會放在站台對應 branch 的 `docs/` 目錄下。

## Other Notes

使用 `node get-image-info.js` 可以取得 `public/img/` 目錄下圖片的寬高資訊。
