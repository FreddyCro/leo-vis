<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section3.json';

type MoonSiteCategory = 'all' | 'soviet' | 'us' | 'cn' | 'others';

const currentCategory = ref<MoonSiteCategory>('soviet');
const isMoonSvgEnter = ref(false);
const isSatelliteEnter = ref(false);
const isSpaceEnter = ref<boolean>(false);
const isArticleEnter = ref<boolean>(false);
const labels = {
  soviet: { text: str.moonLabelSoviet, color: '#FFFB18' },
  us: { text: str.moonLabelUSA, color: '#0800FF' },
  cn: { text: str.moonLabelChina, color: '#FF0037' },
  india: { text: str.moonLabelIndia, color: '#FF7700' },
  japan: { text: str.moonLabelJapan, color: '#D069FF' },
  private: { text: str.moonLabelPrivate, color: '#00F4DC' },
};

function handleChangeSpace(isIntersecting: boolean) {
  isSpaceEnter.value = isIntersecting;
}

function handleChangeArticle(isIntersecting: boolean) {
  isArticleEnter.value = isIntersecting;
}

function handleChangeCategory(
  isIntersecting: boolean,
  category: MoonSiteCategory,
) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}

function handleSvgContent(isIntersecting: boolean) {
  isMoonSvgEnter.value = isIntersecting;
}

function handleSatelliteContent(isIntersecting: boolean) {
  isSatelliteEnter.value = isIntersecting;
}
</script>

<template>
  <div id="moon" class="ls-three leo-article">
    <LeoSectionLayout
      @change-space="handleChangeSpace"
      @change-article="handleChangeArticle"
    >
      <template #space>
        <div class="relative w-full h-[calc(var(--init-screen-height)*1)]">
          <div
            class="ls-three__space-pic-1"
            :class="{
              'ls-three__space-pic-1--enter': isSpaceEnter,
              'ls-three__space-pic-1--under': isArticleEnter,
            }"
          >
            <LeoPic
              src="img/newspaceera2025_pic8_1_bg"
              :webp="false"
              :use2x="false"
              :width="450"
              :height="450"
            />
          </div>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="03">
          <h2 class="max-w-[448px]">
            <span class="block leo-intro-h2">{{ str.title }}</span>
            <span class="block leo-intro-h2-sub">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <!-- satellite fall down -->
        <div class="leo-section leo-section--no-mt leo-section--pt">
          <div class="ls-three__fall-down relative overflow-hidden">
            <!-- text -->
            <div class="leo-container relative z-10 leading-[2]">
              <p>{{ str.p1t1 }}</p>
              <p>{{ str.p1t2 }}</p>
              <p></p>
              <div>{{ str.p1ChartTitle }}</div>
              <ul>
                <li class="flex gap-2">
                  <span
                    class="rounded-full w-[18px] h-[18px] block shrink-0 mt-2 bg-white"
                  />
                  <span>{{ str.p1ChartText1 }}</span>
                </li>
                <li class="flex gap-2">
                  <span
                    class="rounded-full w-[18px] h-[18px] block shrink-0 mt-2 bg-white"
                  />
                  <span>{{ str.p1ChartText2 }}</span>
                </li>
                <li class="flex gap-2">
                  <span
                    class="rounded-full w-[18px] h-[18px] block shrink-0 mt-2 bg-white"
                  />
                  <span>{{ str.p1ChartText3 }}</span>
                </li>
                <li class="flex gap-2">
                  <span
                    class="rounded-full w-[18px] h-[18px] block shrink-0 mt-2 bg-white"
                  />
                  <span>{{ str.p1ChartText4 }}</span>
                </li>
                <li class="flex gap-2">
                  <span
                    class="rounded-full w-[18px] h-[18px] block shrink-0 mt-2 bg-white"
                  />
                  <span>{{ str.p1ChartText5 }}</span>
                </li>
              </ul>
              <p class="leo-caption">{{ str.p1ChartCaption }}</p>
            </div>

            <div
              class="h-[calc(var(--init-screen-height)*0.55)] sm:h-[calc(var(--init-screen-height)*0.5)] md:h-[calc(var(--init-screen-height)*0.6)] lg:h-[calc(var(--init-screen-height)*0.75)] 3xl:h-[calc(var(--init-screen-height)*0.5)] lg:min-h-[600px]"
            >
              <div class="absolute bottom-0 left-0 w-full h-full">
                <!-- bg -->
                <LeoPic
                  class="ls-three__fall-down-bg"
                  src="img/newspaceera2025_pic9_1_bg"
                  :use2x="false"
                  :webp="false"
                />

                <!-- workaround: 覆蓋掉當 bg image 因尺寸不是整數造成白色邊框  -->
                <div class="absolute bottom-0 left-0 w-full h-[2px] bg-black" />

                <!-- machine -->
                <div class="ls-three__fall-down-satellite">
                  <LeoPic
                    src="img/newspaceera2025_pic9_2"
                    ext="png"
                    :webp="false"
                    :use2x="false"
                    :width="430"
                    :height="120"
                  />
                  <div
                    class="ls-three__fall-down-satellite-text"
                    :class="{
                      'ls-three__fall-down-satellite-text--fade-in':
                        isSatelliteEnter,
                    }"
                  >
                    <!-- indicator -->
                    <div
                      class="ls-three__fall-down-indicator-wrap"
                      role="presentation"
                    >
                      <div class="ls-three__fall-down-indicator-dot"></div>
                      <div class="ls-three__fall-down-indicator-line"></div>
                    </div>

                    <!-- text -->
                    <div>
                      <div class="leo-h3 leo-h3--no-mb text-[#00F4DC]">
                        {{ str.falldownTitle }}
                      </div>
                      <div>{{ str.falldownDesc }}</div>
                    </div>
                  </div>

                  <!-- location pin -->
                  <div
                    class="absolute left-[50%] bottom-0 flex items-center gap-2 mt-2 text-[#8D41D9] leading-bold whitespace-nowrap"
                  >
                    <svg
                      width="13"
                      height="19"
                      viewBox="0 0 13 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5 0C10.0898 0 12.9999 2.9102 13 6.5C13 10.0899 6.5 18.0557 6.5 18.0557C6.5 18.0557 0 10.0899 0 6.5C5.85057e-05 2.9102 2.91019 8.05325e-08 6.5 0ZM6.5 2.88867C4.50567 2.88867 2.88873 4.50569 2.88867 6.5C2.88867 8.49436 4.50564 10.1113 6.5 10.1113C8.49436 10.1113 10.1113 8.49436 10.1113 6.5C10.1113 4.50569 8.49433 2.88867 6.5 2.88867Z"
                        fill="#8D41D9"
                      />
                    </svg>
                    {{ str.satelliteLocation }}
                  </div>
                </div>
              </div>
            </div>

            <!-- show machine label -->
            <LeoScrollTrigger @change="handleSatelliteContent" />
          </div>
        </div>

        <div class="leo-section">
          <div class="leo-container">
            <p>{{ str.p2t1 }}</p>
          </div>
        </div>

        <!-- 3d moon site -->
        <div class="grid">
          <!-- moon -->
          <div
            class="sticky top-0 w-full min-h-[calc(var(--init-screen-height)*1)] bg-[url('/img/bg_star.jpg')] bg-repeat"
          >
            <div class="ls-three__3d-moon-site">
              <Leo3dMoonSite :current-category="currentCategory" />

              <!-- label -->
              <div
                class="absolute left-[50%] bottom-auto md:bottom-[16%] top-[20%] md:top-auto flex gap-1 xxs:gap-2 translate-x-[-50%] whitespace-nowrap"
              >
                <div
                  v-for="country in labels"
                  :key="country.text"
                  class="flex gap-1 items-center"
                >
                  <span
                    class="w-[12px] xxs:w-[15px] h-[12px] xxs:h-[15px] rounded-full"
                    :style="{ backgroundColor: country.color }"
                  />
                  <span>
                    {{ country.text }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- article -->
          <div
            class="relative flex justify-end mt-[calc(var(--init-screen-height)*-0.8)]"
          >
            <!-- reset 3d moon site -->
            <!-- <div class="w-[0]">
              <LeoScrollTrigger
                @change="handleChangeCategory($event, 'all')"
              />
            </div> -->

            <div class="w-full md:w-[50%]">
              <div class="md:max-w-[800px]">
                <!-- 3d moon site part soviet -->
                <LeoScrollTrigger
                  @change="handleChangeCategory($event, 'soviet')"
                >
                  <div
                    class="ls-three__moon-text-box my-[calc(var(--init-screen-height)*1)] md:mt-0 md:mb-[500px] mx-auto"
                  >
                    <p>{{ str.p3t1 }}</p>

                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_1"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p3Caption }}
                      </p>
                    </div>
                    <p>{{ str.p3t2 }}</p>
                  </div>
                </LeoScrollTrigger>

                <!-- 3d moon site part us -->
                <LeoScrollTrigger @change="handleChangeCategory($event, 'us')">
                  <div
                    class="ls-three__moon-text-box my-[calc(var(--init-screen-height)*1)] sm:my-[500px] mx-auto"
                  >
                    <p>{{ str.p4t1 }}</p>

                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_2"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p4Caption1 }}
                      </p>
                    </div>
                    <p>{{ str.p4t2 }}</p>

                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_3"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p4Caption2 }}
                      </p>
                    </div>
                    <p>{{ str.p4t3 }}</p>
                  </div>
                </LeoScrollTrigger>

                <!-- 3d moon site part cn-2 -->
                <LeoScrollTrigger
                  @change="handleChangeCategory($event, 'cn-1')"
                >
                  <div
                    class="ls-three__moon-text-box my-[calc(var(--init-screen-height)*1)] sm:my-[500px] mx-auto"
                  >
                    <p>{{ str.p5t1 }}</p>
                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_4"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p5Caption1 }}
                      </p>
                    </div>
                  </div>
                </LeoScrollTrigger>

                <!-- 3d moon site part cn-1 -->
                <LeoScrollTrigger
                  @change="handleChangeCategory($event, 'cn-2')"
                >
                  <div
                    class="ls-three__moon-text-box my-[calc(var(--init-screen-height)*1)] sm:my-[500px] mx-auto"
                  >
                    <p>{{ str.p5t2 }}</p>
                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_5"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p5Caption2 }}
                      </p>
                    </div>
                  </div>
                </LeoScrollTrigger>

                <!-- 3d moon site part others -->
                <LeoScrollTrigger
                  @change="handleChangeCategory($event, 'others')"
                >
                  <div class="ls-three__moon-text-box mx-auto">
                    <p>{{ str.p6t1 }}</p>
                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_6"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p6Caption1 }}
                      </p>
                    </div>
                    <p>{{ str.p6t2 }}</p>
                    <div class="leo-section-sm">
                      <LeoPic
                        src="img/newspaceera2025_pic10_7"
                        :webp="false"
                        :use-prefix="false"
                        :width="430"
                        :height="120"
                      />
                      <p class="leo-caption leo-caption--white pt-[6px]">
                        {{ str.p6Caption2 }}
                      </p>
                    </div>
                  </div>
                </LeoScrollTrigger>
              </div>

              <div
                class="h-[calc(var(--init-screen-height)*0.5)] sm:h-[calc(var(--init-screen-height)*0.25)]"
              />
            </div>
          </div>
        </div>

        <!-- moon svg content -->
        <div class="overflow-hidden">
          <LeoScrollTrigger @change="handleSvgContent">
            <div class="ls-three__moon-svg-wrap">
              <h3 class="ls-three__moon-svg-title">
                {{ str.moonTitle }}
              </h3>
              <div class="ls-three__moon-svg-imgs">
                <div
                  class="ls-three__moon-svg-img"
                  :class="{
                    'ls-three__moon-svg-img--enter': !isMoonSvgEnter,
                  }"
                >
                  <LeoPic
                    src="img/newspaceera2025_pic11_1_chart"
                    ext="svg"
                    :pc-breakpoint="1024"
                    :use2x="false"
                    :webp="false"
                    :width="430"
                    :height="120"
                  />
                </div>
                <div
                  class="ls-three__moon-svg-img"
                  :class="{
                    'ls-three__moon-svg-img--enter': isMoonSvgEnter,
                  }"
                >
                  <LeoPic
                    src="img/newspaceera2025_pic11_2_chart"
                    ext="svg"
                    :pc-breakpoint="1024"
                    :use2x="false"
                    :webp="false"
                    :width="430"
                    :height="120"
                  />
                </div>
                <div class="ls-three__moon-svg-labels">
                  <div
                    class="ls-three__moon-svg-label ls-three__moon-svg-label--1"
                    :class="{
                      'ls-three__moon-svg-label--enter': isMoonSvgEnter,
                    }"
                  >
                    <h4 class="ls-three__moon-svg-label-title">
                      {{ str.moon1t1 }}
                    </h4>
                    <div>{{ str.moon1t2 }}</div>
                    <div>{{ str.moon1t3 }}</div>
                  </div>
                  <div
                    class="ls-three__moon-svg-label ls-three__moon-svg-label--2"
                    :class="{
                      'ls-three__moon-svg-label--enter': isMoonSvgEnter,
                    }"
                  >
                    <h4 class="ls-three__moon-svg-label-title">
                      {{ str.moon2t1 }}
                    </h4>
                    <div>{{ str.moon2t2 }}</div>
                    <div>{{ str.moon2t3 }}</div>
                  </div>
                  <div
                    class="ls-three__moon-svg-label ls-three__moon-svg-label--3"
                    :class="{
                      'ls-three__moon-svg-label--enter': isMoonSvgEnter,
                    }"
                  >
                    <h4 class="ls-three__moon-svg-label-title">
                      {{ str.moon3t1 }}
                    </h4>
                    <div>{{ str.moon3t2 }}</div>
                    <div>{{ str.moon3t3 }}</div>
                  </div>
                  <div
                    class="ls-three__moon-svg-label ls-three__moon-svg-label--4"
                    :class="{
                      'ls-three__moon-svg-label--enter': isMoonSvgEnter,
                    }"
                  >
                    <h4 class="ls-three__moon-svg-label-title">
                      {{ str.moon4t1 }}
                    </h4>
                    <div>{{ str.moon4t2 }}</div>
                    <div>{{ str.moon4t3 }}</div>
                  </div>
                  <div
                    class="ls-three__moon-svg-label ls-three__moon-svg-label--5"
                    :class="{
                      'ls-three__moon-svg-label--enter': isMoonSvgEnter,
                    }"
                  >
                    <h4 class="ls-three__moon-svg-label-title">
                      {{ str.moon5t1 }}
                    </h4>
                    <div>{{ str.moon5t2 }}</div>
                    <div>{{ str.moon5t3 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </LeoScrollTrigger>
        </div>

        <div class="leo-container-card24">
          <div class="leo-section">
            <p>{{ str.p7t1 }}</p>
          </div>

          <div class="leo-section leo-section--no-mb leo-section--pb">
            <LeoReadMore
              chapter="ch3"
              :title="str.relatedTitle"
              :data="[
                {
                  title: str.related1Title,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic12_1',
                },
                {
                  title: str.related2Title,
                  link: str.related2Link,
                  bg: 'img/newspaceera2025_pic12_2',
                },
              ]"
            />
          </div>
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins';

.ls-three {
  &__space-pic-1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(1.15) rotate(-5deg);

    &--enter {
      /* rotate 15deg => 0 */
      transform: scale(1) rotate(0deg);
      opacity: 1;
      transition: 2s ease;
    }

    &--under {
      transform: rotate(0deg);
      opacity: 1;
      transition: 2s ease;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }
  }

  &__space-pic-2 {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, 0);

    &--enter {
      transition: 3.5s ease;
      transform: translate(100%, 25%);
    }

    &--under {
      transition: 3.5s ease;
      transform: translate(150%, 100%);
    }

    img {
      width: auto;
    }
  }

  &__3d-moon-site {
    position: relative;

    @include rwd-min(md) {
      transform: translateX(-20%);
    }
  }

  &__fall-down-bg {
    img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  &__fall-down-satellite {
    z-index: 10;
    position: absolute;
    left: 0;
    bottom: 0;
    width: auto;

    @include rwd-min(pad) {
      left: 10%;
      bottom: 0;
    }

    @include rwd-min(pc) {
      bottom: 5.5%;
    }

    @include rwd-min(xl) {
      left: 20%;
    }

    @include rwd-min(3xl) {
      left: 28%;
    }
  }

  &__fall-down-satellite-text {
    position: absolute;
    z-index: 20;
    top: -5%;
    left: 78%;
    width: calc(100vw - 200px);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    @include rwd-min(pad) {
      top: 0%;
      left: 80%;
      width: 265px;
    }

    @include rwd-min(md) {
      left: 82%;
      width: 450px;
    }

    @include rwd-min(lg) {
      left: 82%;
    }

    &--fade-in {
      opacity: 1;
    }
  }

  &__fall-down-indicator-wrap {
    position: absolute;
    left: 0%;
    bottom: -15px;
    width: 70px;
    height: 100%;
    transform: translateX(-110%);

    @include rwd-min(pad) {
      width: 110px;
      transform: translateX(-100%);
    }

    @include rwd-min(lg) {
      width: 145px;
      transform: translateX(-110%);
    }
  }

  &__fall-down-indicator-dot {
    position: absolute;
    left: 0;
    top: -4px;
    width: 9px;
    height: 9px;
    background-color: #00f4dc;
    border-radius: 50%;
    transform: none;
  }

  &__fall-down-indicator-line {
    position: absolute;
    left: 0%;
    top: 0;
    height: 2px;
    width: 100%;
    /* max-width: 100px; */
    background-color: #00f4dc;
    transform: none;
  }

  &__moon-svg-wrap {
    position: relative;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  &__moon-svg-imgs {
    position: relative;
  }

  &__moon-svg-img {
    opacity: 0.3;

    &:first-child {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    &--enter {
      opacity: 1;
      transition: opacity 1s 0.1s ease-in-out;
    }
  }

  &__moon-svg-title {
    padding: 0 20px;
    font-size: 28px;
    line-height: 40px;
    font-weight: 500;
    transform: translateY(100%);

    @include rwd-min(sm) {
      font-size: 32px;
      line-height: 48px;
      text-align: center;
    }

    @include rwd-min(md) {
      position: absolute;
      z-index: 10;
      left: 24.5%;
      top: 50%;
      width: 232px;
      transform: translate(-25%, -50%);
    }
  }

  &__moon-svg-label {
    $base-x-mob: 30%;
    $base-y-mob: 15%;
    $base-width-mob: 60%;
    $base-x-pad: 30%;
    $base-y-pad: 15%;
    $base-width-pad: 60%;
    $base-x-pc: 52%;
    $base-y-pc: 7%;
    $base-width-pc: 343px;

    position: absolute;
    top: 0;
    left: 0;
    width: $base-width-mob;
    line-height: 1.1;
    opacity: 0.3;

    @include rwd-min(pad) {
      width: $base-width-pad;
      line-height: 1.5;
    }

    @include rwd-min(pc) {
      width: $base-width-pc;
    }

    &--enter {
      opacity: 1;
      transition: opacity 1s 0.3s ease-in-out;
    }

    &--1 {
      left: $base-x-mob;
      top: $base-y-mob;

      @include rwd-min(pad) {
        left: $base-x-pad;
        top: $base-y-pad + 1%;
      }

      @include rwd-min(md) {
        left: $base-x-pc;
        top: $base-y-pc - 2.5%;
      }

      @include rwd-min(lg) {
        left: $base-x-pc;
        top: $base-y-pc - 0.5%;
      }
    }

    &--2 {
      left: $base-x-mob + 6%;
      top: $base-y-mob + 16%;

      @include rwd-min(pad) {
        left: $base-x-pad + 7%;
        top: $base-y-pad + 16%;
      }

      @include rwd-min(pc) {
        left: $base-x-pc + 6%;
        top: $base-y-pc + 18.5%;
      }
    }

    &--3 {
      left: $base-x-mob + 8%;
      top: $base-y-mob + 29%;

      @include rwd-min(xxs) {
        left: $base-x-mob + 8%;
        top: $base-y-mob + 32%;
      }

      @include rwd-min(pad) {
        left: $base-x-pad + 9%;
        top: $base-y-pad + 30%;
      }

      @include rwd-min(pc) {
        left: $base-x-pc + 9%;
        top: $base-y-pc + 34%;
      }
    }

    &--4 {
      left: $base-x-mob + 6%;
      top: $base-y-mob + 49%;

      @include rwd-min(pad) {
        left: $base-x-pad + 7%;
        top: $base-y-pad + 45%;
      }

      @include rwd-min(pc) {
        left: $base-x-pc + 6%;
        top: $base-y-pc + 54.5%;
      }
    }

    &--5 {
      left: $base-x-mob;
      top: $base-y-mob + 64%;

      @include rwd-min(pad) {
        left: $base-x-pad;
        top: $base-y-pad + 59%;
      }

      @include rwd-min(pc) {
        left: $base-x-pc;
        top: $base-y-pc + 71%;
      }
    }
  }

  &__moon-svg-label-title {
    font-weight: 700;
  }

  &__moon-text-box {
    padding: 40px 20px;
    border: solid 1px #808080;

    @include rwd-min(sm) {
      padding: 40px;
      width: 100%;
      max-width: 530px;
    }

    @include rwd-max(md) {
      @include mixins.blur(10px);
    }

    @include rwd-min(md) {
      width: 100%;
      max-width: 100%;
      padding: 0 110px;
      border: 0;
    }
  }
}
</style>
