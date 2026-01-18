# Hướng dẫn Deploy lên GitHub Pages

## 📋 Bước 1: Chuẩn bị Repository trên GitHub

1. **Tạo repository mới trên GitHub** (nếu chưa có)
   - Vào [GitHub](https://github.com) → Click **New repository**
   - Đặt tên repo (ví dụ: `link-grid`)
   - Chọn **Public** hoặc **Private** (Private vẫn dùng GitHub Pages được)
   - **KHÔNG** tích vào "Add a README file" nếu bạn sẽ push code từ local

2. **Nếu repo đã tồn tại**, đảm bảo bạn đã có quyền write vào repo

## 📋 Bước 2: Push code lên GitHub (nếu chưa có)

Nếu bạn chưa có git remote, chạy các lệnh sau:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: Link Grid app"

# Thêm remote (thay YOUR_USERNAME và REPO_NAME bằng thông tin của bạn)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

## 📋 Bước 3: Cấu hình Base Path trong vite.config.js

**QUAN TRỌNG**: Cần đảm bảo `base` path đúng với tên repo của bạn.

1. Mở file `vite.config.js`
2. Kiểm tra dòng `base`:
   ```js
   base: '/link-grid/'  // Thay 'link-grid' bằng tên repo của bạn
   ```
3. Nếu repo của bạn tên là `my-awesome-app`, thì sửa thành:
   ```js
   base: '/my-awesome-app/'
   ```
4. Nếu deploy lên user/organization page (username.github.io), sửa thành:
   ```js
   base: '/'
   ```

## 📋 Bước 4: Cấu hình GitHub Pages Settings

1. Vào repository trên GitHub
2. Click **Settings** (góc trên bên phải)
3. Trong menu bên trái, scroll xuống tìm **Pages**
4. Trong phần **Source**:
   - Chọn **GitHub Actions** (không chọn "Deploy from a branch")
5. Lưu lại (không cần thay đổi gì khác)

## 📋 Bước 5: Push code lên branch main

Workflow sẽ tự động chạy khi bạn push code lên branch `main`:

```bash
# Thêm thay đổi (nếu có)
git add .

# Commit
git commit -m "Update code"

# Push lên GitHub
git push origin main
```

## 📋 Bước 6: Kiểm tra Workflow đang chạy

1. Vào repository trên GitHub
2. Click tab **Actions** (ở menu trên cùng)
3. Bạn sẽ thấy workflow "Deploy to GitHub Pages" đang chạy
4. Click vào workflow run để xem chi tiết
5. Đợi đến khi thấy dấu ✅ (thường mất 2-5 phút)

## 📋 Bước 7: Truy cập website

Sau khi workflow chạy thành công:

1. Vào **Settings → Pages** trong repository
2. Bạn sẽ thấy URL của website, ví dụ:
   - `https://YOUR_USERNAME.github.io/REPO_NAME/`
3. Click vào URL để mở website
4. **Lưu ý**: Có thể mất vài phút để website cập nhật sau lần deploy đầu tiên

## 🔄 Cập nhật website sau này

Mỗi khi bạn push code mới lên branch `main`, workflow sẽ tự động:
1. Build lại project
2. Deploy lên GitHub Pages
3. Website sẽ được cập nhật sau 2-5 phút

Chỉ cần:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## ⚠️ Troubleshooting

### Website hiển thị 404 hoặc blank page

1. **Kiểm tra base path**: Đảm bảo `base` trong `vite.config.js` đúng với tên repo
2. **Kiểm tra workflow**: Vào **Actions** tab xem có lỗi gì không
3. **Kiểm tra build**: Trong workflow logs, xem step "Build" có chạy thành công không
4. **Đợi vài phút**: Lần deploy đầu tiên có thể mất 10-15 phút

### Workflow bị lỗi

1. Click vào workflow run bị lỗi
2. Xem logs để tìm lỗi cụ thể
3. Lỗi thường gặp:
   - **Permission denied**: Cần enable GitHub Pages trong Settings
   - **Build failed**: Kiểm tra `package.json` và dependencies
   - **Node version**: Đảm bảo Node version tương thích

### Assets (hình ảnh, CSS) không load

- Kiểm tra lại `base` path trong `vite.config.js`
- Đảm bảo đường dẫn assets là relative paths
- Clear browser cache (Ctrl+Shift+R hoặc Cmd+Shift+R)

## 📝 Lưu ý

- GitHub Pages hỗ trợ cả Public và Private repositories
- Website sẽ được update tự động mỗi khi push code
- URL sẽ là: `https://YOUR_USERNAME.github.io/REPO_NAME/`
- Nếu repo là user/organization page (tên repo = `USERNAME.github.io`), URL sẽ là: `https://USERNAME.github.io/`

## ✅ Checklist

- [ ] Repository đã được tạo trên GitHub
- [ ] Code đã được push lên GitHub (branch `main`)
- [ ] Base path trong `vite.config.js` đã đúng
- [ ] GitHub Pages Settings đã chọn "GitHub Actions"
- [ ] Workflow đã chạy thành công (có dấu ✅)
- [ ] Website đã có thể truy cập được
