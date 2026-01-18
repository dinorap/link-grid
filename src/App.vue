<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Video -->
    <video
      ref="backgroundVideo"
      autoplay
      muted
      loop
      playsinline
      class="fixed top-0 left-0 w-full h-full object-cover"
      style="z-index: -1;"
      @loadedmetadata="setVideoSpeed"
    >
      <source src="/background.mp4" type="video/mp4" />
    </video>

    <!-- Overlay để làm nền tối hơn một chút -->
    <div class="fixed inset-0 bg-black/20" style="z-index: 0;"></div>

    <!-- Content -->
    <div class="relative z-10">
    <!-- Header -->
    <header class="max-w-[1536px] mx-auto px-4 py-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <h1 class="jimmy-jason-logo text-3xl md:text-4xl lg:text-5xl" data-text="JimmyJason">
          JimmyJason
        </h1>

        <div class="flex items-center gap-3">
          
          <template v-if="!editMode">
            <button
              @click="showUnlockModal = true"
              class="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              title="Mở khóa chỉnh sửa"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span class="hidden sm:inline">Mở khóa</span>
            </button>
          </template>

          <template v-else>
            <button
              @click="editMode = false"
              class="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              title="Thoát chế độ chỉnh sửa"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span class="hidden sm:inline">Thoát</span>
            </button>
            <button
              v-if="editMode"
              @click="showAddModal = true"
              class="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              title="Thêm card mới"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="hidden sm:inline">Thêm mới</span>
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- Cards Grid -->
    <main class="max-w-[1536px] mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          :draggable="editMode"
          @dragstart="editMode && startDrag(index, $event)"
          @dragover.prevent="editMode && onDragOver($event, index)"
          @drop="editMode && onDrop(index, $event)"
          @dragend="endDrag"
          :class="[
            'group relative bg-gradient-to-br from-gray-700/70 to-gray-800/80 rounded-3xl overflow-hidden border border-gray-600/50 hover:border-cyan-400/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/30 flex flex-col backdrop-blur-sm',
            editMode ? 'cursor-move' : 'cursor-pointer',
            draggingIndex === index ? 'opacity-50 scale-95' : '',
            dragOverIndex === index ? 'border-cyan-400 border-2 ring-2 ring-cyan-400/50' : ''
          ]"
        >
          <!-- Drag handle indicator (only in edit mode) -->
          <div 
            v-if="editMode"
            class="absolute top-3 left-3 w-10 h-10 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center opacity-100 z-20 shadow-lg touch-none select-none"
            @touchstart.stop="startTouch(index, $event)"
            @touchmove.stop="onTouchMove($event)"
            @touchend.stop="endTouch($event)"
            @mousedown.stop="editMode && startDrag(index, $event)"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
            </svg>
          </div>

          <!-- Image -->
          <div class="relative h-52 md:h-64 overflow-hidden">
            <img
              v-if="card.image"
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-600/50 to-blue-600/50 text-white text-6xl">
              🖼️
            </div>
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
            
            <!-- Title overlay on image -->
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <h2 class="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl group-hover:translate-y-[-2px] transition-transform duration-300">
                {{ card.title }}
          </h2>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-100 font-medium text-base md:text-lg mb-4 leading-relaxed drop-shadow-md">
              {{ card.description }}
            </p>
            
            <!-- Action buttons -->
            <div class="space-y-3 mt-auto">
              <!-- View button -->
              <a
                :href="card.url"
                target="_blank"
                class="block w-full inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-[1.02] active:scale-[0.98] bg-[length:200%_auto] hover:bg-[length:100%_auto]"
              >
                <span>Xem thêm</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
              
              <!-- Edit/Delete buttons (only in edit mode) -->
              <div v-if="editMode" class="flex gap-2">
                <button
                  @click.stop="editCard(card)"
                  class="flex-1 inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg gap-2"
                  title="Sửa card"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span>Sửa</span>
                </button>

                <button
                  @click.stop="deleteCard(card.id)"
                  class="flex-1 inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg gap-2"
                  title="Xóa card"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>Xóa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="cards.length === 0" class="text-center py-20">
        <div class="text-7xl mb-6">📦</div>
        <h2 class="text-3xl font-bold text-white mb-3">Chưa có card nào</h2>
        <p class="text-gray-400 text-lg">Nhấn nút chỉnh sửa và thêm card mới</p>
      </div>

      <!-- Drag hint (only in edit mode) -->
      <div v-if="editMode && cards.length > 1" class="mt-8 text-center">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
          <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
          </svg>
          <p class="text-cyan-200 font-medium">Chạm vào icon ⬌ ở góc trên trái mỗi card để kéo thả</p>
        </div>
      </div>
    </main>

    <!-- Unlock Modal -->
    <div
      v-if="showUnlockModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
      @click.self="showUnlockModal = false"
    >
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Mở khóa chỉnh sửa</h2>
          <p class="text-gray-400">Nhập mật khẩu để bật chế độ chỉnh sửa</p>
        </div>
        <input
          v-model="unlockPassword"
          type="password"
          placeholder="Nhập mật khẩu..."
          class="w-full px-5 py-4 bg-slate-700/50 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 mb-4 text-lg transition-all"
          @keyup.enter="checkUnlockPassword"
          autofocus
        />
        <p v-if="unlockError" class="text-red-400 text-sm mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ unlockError }}
        </p>
        <div class="flex gap-3">
          <button
            @click="checkUnlockPassword"
            class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Mở khóa
          </button>
          <button
            @click="showUnlockModal = false"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Card Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-start justify-center p-4 z-50 overflow-y-auto"
      @click.self="closeAddModal"
    >
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 w-full max-w-2xl border border-white/20 shadow-2xl my-auto">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg v-if="editingCard" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <svg v-else class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white">{{ editingCard ? 'Sửa card' : 'Thêm card mới' }}</h2>
        </div>
        
        <div class="space-y-6">
          <!-- Image URL or File -->
          <div>
            <label class="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Hình ảnh (URL hoặc chọn file)
            </label>
            <div class="flex gap-3">
              <input
                v-model="newCard.image"
                type="url"
                placeholder="https://example.com/image.jpg hoặc chọn file bên dưới"
                class="flex-1 px-5 py-4 bg-slate-700/50 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-lg"
              />
              <label class="px-6 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                <span class="hidden sm:inline">Chọn file</span>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
              </label>
            </div>
            <p class="text-gray-400 text-sm mt-2">Nhập URL hoặc chọn ảnh từ máy tính</p>
          </div>

          <!-- Title -->
          <div>
            <label class="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m-4 4h10m2 5H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"></path>
              </svg>
              Mô tả lớn (Tiêu đề)
            </label>
            <input
              v-model="newCard.title"
              type="text"
              placeholder="Nhập tiêu đề..."
              class="w-full px-5 py-4 bg-slate-700/50 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-lg"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Mô tả chi tiết
            </label>
            <textarea
              v-model="newCard.description"
              placeholder="Nhập mô tả..."
              rows="5"
              class="w-full px-5 py-4 bg-slate-700/50 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all text-lg"
            ></textarea>
          </div>

          <!-- URL -->
          <div>
            <label class="block text-white font-semibold mb-3 flex items-center gap-2 text-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              Đường dẫn (URL)
            </label>
            <input
              v-model="newCard.url"
              type="url"
              placeholder="https://example.com"
              class="w-full px-5 py-4 bg-slate-700/50 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-lg"
            />
          </div>
        </div>

        <!-- Preview -->
        <div v-if="newCard.image || newCard.title" class="mt-8 p-5 bg-slate-700/30 rounded-2xl border border-white/10">
          <p class="text-white font-semibold mb-4 text-base flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Xem trước:
          </p>
          <div class="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
            <div class="h-48 bg-gradient-to-br from-cyan-500 to-blue-500 overflow-hidden">
              <img
                v-if="newCard.image"
                :src="newCard.image"
                alt="Preview"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="p-5">
              <h3 class="text-white font-bold mb-2 text-xl">{{ newCard.title || 'Tiêu đề' }}</h3>
              <p class="text-gray-300 text-sm">{{ newCard.description || 'Mô tả' }}</p>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-8">
          <button
            @click="saveCard"
            :disabled="!isFormValid"
            class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ editingCard ? 'Lưu thay đổi' : 'Thêm card' }}
          </button>
          <button
            @click="closeAddModal"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Xác nhận xóa</h2>
          <p class="text-gray-400 text-lg">Bạn có chắc muốn xóa card này?</p>
        </div>
        <div class="flex gap-4">
          <button
            @click="confirmDelete"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Xóa
          </button>
          <button
            @click="showDeleteModal = false"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg"
          >
            Hủy
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const PASSWORD = '04122003'

const backgroundVideo = ref(null)
const cards = ref([])
const editMode = ref(false)
const showUnlockModal = ref(false)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const unlockPassword = ref('')
const unlockError = ref('')
const editingCard = ref(null)
const cardToDelete = ref(null)
const draggingIndex = ref(null)
const dragOverIndex = ref(null)
const touchStartIndex = ref(null)
const touchStartY = ref(null)
const touchStartX = ref(null)
const isDragging = ref(false)
const autoScrollInterval = ref(null)

const newCard = ref({
  image: '',
  title: '',
  description: '',
  url: ''
})

// Validate form
const isFormValid = computed(() => {
  return newCard.value.title.trim() !== '' && 
         newCard.value.description.trim() !== '' && 
         newCard.value.url.trim() !== ''
})

// Load cards from localStorage
const loadCards = () => {
  const saved = localStorage.getItem('linkGridCards')
  if (saved) {
    try {
      cards.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error loading cards:', e)
      cards.value = []
    }
  } else {
    // Default cards
    cards.value = [
      {
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
        title: 'Scan tiktok',
        description: 'Có thể lấy 10.000 tài khoản / ngày',
        url: 'https://drive.google.com/drive/folders/12Qd5T0QwKDYNL3rhByrj_HHG6Fw7bhlN?usp=sharing'
      },
      {
        id: Date.now() + 1,
        image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
        title: 'Google',
        description: 'Công cụ tìm kiếm phổ biến nhất với nhiều dịch vụ hữu ích',
        url: 'https://google.com'
      },
      {
        id: Date.now() + 2,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        title: 'YouTube',
        description: 'Nền tảng chia sẻ video lớn nhất với hàng tỷ video',
        url: 'https://youtube.com'
      }
    ]
    saveCards()
  }
}

// Save cards to localStorage
const saveCards = () => {
  localStorage.setItem('linkGridCards', JSON.stringify(cards.value))
}

// Check unlock password
const checkUnlockPassword = () => {
  if (unlockPassword.value === PASSWORD) {
    unlockError.value = ''
    editMode.value = true
    showUnlockModal.value = false
    unlockPassword.value = ''
  } else {
    unlockError.value = 'Mật khẩu không đúng!'
  }
}

// Close add modal
const closeAddModal = () => {
  showAddModal.value = false
  editingCard.value = null
  newCard.value = {
    image: '',
    title: '',
    description: '',
    url: ''
  }
}

// Edit card
const editCard = (card) => {
  editingCard.value = card
  newCard.value = {
    image: card.image,
    title: card.title,
    description: card.description,
    url: card.url
  }
  showAddModal.value = true
}

// Save card (add or edit)
const saveCard = () => {
  if (!isFormValid.value) return

  if (editingCard.value) {
    // Update existing card
    const index = cards.value.findIndex(c => c.id === editingCard.value.id)
    if (index !== -1) {
      cards.value[index] = {
        ...editingCard.value,
        image: newCard.value.image.trim(),
        title: newCard.value.title.trim(),
        description: newCard.value.description.trim(),
        url: newCard.value.url.trim()
      }
      saveCards()
    }
  } else {
    // Add new card
    const card = {
      id: Date.now(),
      image: newCard.value.image.trim(),
      title: newCard.value.title.trim(),
      description: newCard.value.description.trim(),
      url: newCard.value.url.trim()
    }
    cards.value.unshift(card)
    saveCards()
  }
  
  closeAddModal()
}

// Delete card
const deleteCard = (id) => {
  cardToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (cardToDelete.value) {
    cards.value = cards.value.filter(card => card.id !== cardToDelete.value)
    saveCards()
    cardToDelete.value = null
  }
  showDeleteModal.value = false
}

// Drag and Drop
const startDrag = (index, event) => {
  draggingIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/html', event.target)
}

const onDragOver = (event, index) => {
  event.preventDefault()
  if (draggingIndex.value !== index) {
    dragOverIndex.value = index
  }
}

const onDrop = (index, event) => {
  event.preventDefault()
  if (draggingIndex.value !== null && draggingIndex.value !== index) {
    const draggedCard = cards.value[draggingIndex.value]
    cards.value.splice(draggingIndex.value, 1)
    cards.value.splice(index, 0, draggedCard)
    saveCards()
  }
  dragOverIndex.value = null
}

const endDrag = () => {
  draggingIndex.value = null
  dragOverIndex.value = null
}

// Touch events for mobile drag and drop (chỉ từ drag handle)
const startTouch = (index, event) => {
  event.preventDefault()
  event.stopPropagation()
  touchStartIndex.value = index
  touchStartY.value = event.touches[0].clientY
  touchStartX.value = event.touches[0].clientX
  isDragging.value = true
  draggingIndex.value = index
}

const onTouchMove = (event) => {
  if (touchStartIndex.value === null || !isDragging.value) return
  event.preventDefault()
  event.stopPropagation()
  
  if (!event.touches || event.touches.length === 0) return
  
  const touch = event.touches[0]
  const touchY = touch.clientY
  const windowHeight = window.innerHeight
  const scrollThreshold = 80 // Khoảng cách từ mép để bắt đầu scroll
  const scrollSpeed = 15 // Tốc độ scroll
  
  // Dừng auto-scroll cũ nếu có
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
  
  // Auto-scroll khi kéo gần mép trên
  if (touchY < scrollThreshold && window.scrollY > 0) {
    const distanceFromEdge = scrollThreshold - touchY
    const speed = Math.max(5, Math.min(20, distanceFromEdge / 4))
    autoScrollInterval.value = setInterval(() => {
      if (window.scrollY <= 0) {
        clearInterval(autoScrollInterval.value)
        autoScrollInterval.value = null
        return
      }
      window.scrollBy(0, -speed)
    }, 16) // ~60fps
  }
  // Auto-scroll khi kéo gần mép dưới
  else if (touchY > windowHeight - scrollThreshold) {
    const distanceFromEdge = touchY - (windowHeight - scrollThreshold)
    const speed = Math.max(5, Math.min(20, distanceFromEdge / 4))
    autoScrollInterval.value = setInterval(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll) {
        clearInterval(autoScrollInterval.value)
        autoScrollInterval.value = null
        return
      }
      window.scrollBy(0, speed)
    }, 16) // ~60fps
  }
  
  // Find element at touch point
  const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
  if (elementBelow) {
    const targetCard = elementBelow.closest('[draggable="true"]')
    if (targetCard) {
      const allCards = Array.from(document.querySelectorAll('[draggable="true"]'))
      const targetIndex = allCards.indexOf(targetCard)
      
      if (targetIndex !== -1 && touchStartIndex.value !== targetIndex) {
        dragOverIndex.value = targetIndex
      }
    }
  }
}

const endTouch = (event) => {
  if (touchStartIndex.value === null) return
  
  event.preventDefault()
  event.stopPropagation()
  
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    const touchEndElement = document.elementFromPoint(touch.clientX, touch.clientY)
    
    if (touchEndElement) {
      const targetCard = touchEndElement.closest('[draggable="true"]')
      if (targetCard) {
        const allCards = Array.from(document.querySelectorAll('[draggable="true"]'))
        const targetIndex = allCards.indexOf(targetCard)
        
        if (targetIndex !== -1 && touchStartIndex.value !== targetIndex) {
          const draggedCard = cards.value[touchStartIndex.value]
          cards.value.splice(touchStartIndex.value, 1)
          cards.value.splice(targetIndex, 0, draggedCard)
          saveCards()
        }
      }
    }
  }
  
  // Dừng auto-scroll
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
  
  touchStartIndex.value = null
  touchStartY.value = null
  touchStartX.value = null
  isDragging.value = false
  draggingIndex.value = null
  dragOverIndex.value = null
}

// Handle image error
const handleImageError = (event) => {
  event.target.style.display = 'none'
}

// Handle image file upload
const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newCard.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
  // Reset input để có thể chọn lại file cùng tên
  event.target.value = ''
}

// Set video playback speed to 0.5
const setVideoSpeed = () => {
  if (backgroundVideo.value) {
    backgroundVideo.value.playbackRate = 0.5
  }
}

// Initialize
onMounted(() => {
  loadCards()
  // Set video speed after mount
  if (backgroundVideo.value) {
    backgroundVideo.value.playbackRate = 0.5
  }
})
</script>

<style scoped>
</style>
