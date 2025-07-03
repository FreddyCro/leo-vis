<script setup lang="ts"></script>

<template>
  <div class="app">
    <div class="font-demo">
      <h2>字體展示 Font Demo</h2>

      <div class="demo-section">
        <h3>Noto Sans TC</h3>
        <p class="noto-sans-tc">
          這是無襯線字體 Noto Sans TC 的展示。This is a demo of Noto Sans TC
          font. 數字測試：12345 67890
        </p>
      </div>

      <div class="demo-section">
        <h3>Noto Serif TC</h3>
        <p class="noto-serif-tc">
          這是有襯線字體 Noto Serif TC 的展示。This is a demo of Noto Serif TC
          font. 數字測試：12345 67890
        </p>
      </div>

      <div class="demo-section">
        <h3>Montserrat</h3>
        <p class="montserrat">
          這是英文字體 Montserrat 的展示。This is a demo of Montserrat font.
          數字測試：12345 67890
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app {
  max-width: 2560px;
  margin: 0 auto;
  padding: 2rem;

  .font-demo {
    h2 {
      color: #333;
      margin-bottom: 2rem;
      text-align: center;
    }

    .demo-section {
      margin-bottom: 3rem;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;

      h3 {
        color: #666;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0;
        color: #333;
      }
    }
  }

  .noto-serif-tc {
    font-family: 'Noto Serif TC', serif;
  }

  .noto-sans-tc {
    font-family: 'Noto Sans TC', sans-serif;
  }

  .montserrat {
    font-family: 'Montserrat', sans-serif;
  }
}
</style>
