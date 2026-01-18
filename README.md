# Link Grid

Ứng dụng web để quản lý và hiển thị các card với hình ảnh, mô tả và liên kết. Hỗ trợ kéo thả để sắp xếp lại, thêm/sửa/xóa card với chế độ chỉnh sửa được bảo vệ bằng mật khẩu.

## ✨ Tính năng

- 📱 Responsive design (Desktop & Mobile)
- 🎨 UI/UX hiện đại với video background
- 🔐 Chế độ chỉnh sửa được bảo vệ bằng mật khẩu
- 🖱️ Kéo thả để sắp xếp lại cards (Desktop & Mobile)
- ➕ Thêm/Sửa/Xóa cards
- 💾 Lưu trữ dữ liệu trong localStorage
- 📤 Upload hình ảnh từ URL hoặc file local
- 🎯 Auto-scroll khi kéo thả gần mép màn hình

## 🚀 Hướng dẫn Deploy lên GitHub Pages

Xem file [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) để biết hướng dẫn chi tiết từng bước.

### Tóm tắt nhanh:

1. **Cấu hình base path** trong `vite.config.js` (đúng với tên repo của bạn)
2. **Settings → Pages → Source**: Chọn "GitHub Actions"
3. **Push code** lên branch `main`
4. **Đợi workflow** chạy xong (2-5 phút)
5. **Truy cập website** tại: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## 📦 Cài đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 🔑 Mật khẩu chỉnh sửa


## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- LocalStorage

## 📄 License

MIT
