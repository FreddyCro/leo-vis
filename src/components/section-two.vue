<script setup lang="ts">
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import LeoPic from '@/components/leo-pic.vue';
import str from '@/locales/section2.json';
</script>

<template>
  <div class="ls-two leo-article">
    <LeoSectionLayout>
      <template #space>
        <LeoPic
          class="leo-section-bg"
          src="img/newspaceera2025_pic5_1_bg"
          :webp="false"
          :use2x="false"
          :width="620"
          :height="450"
        />
        <div class="relative z-10">
          <div class="absolute inset-0">
            <LeoPic
              class="ls-two__moon"
              src="img/newspaceera2025_pic5_2_bg"
              ext="png"
              :webp="false"
              :use2x="false"
              :width="620"
              :height="450"
            />
          </div>
          <LeoSvgPathAnimation :element-number="1">
            <template #element-1>
              <LeoPic
                src="img/newspaceera2025_pic5_3_bg"
                ext="png"
                :webp="false"
                :use2x="false"
                :width="620"
                :height="450"
              />
            </template>
          </LeoSvgPathAnimation>
        </div>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="02">
          <h2 class="max-w-[448px]">
            <span class="block text-4xl md:text-6xl mb-5">{{ str.title }}</span>
            <span class="block text-2xl">{{ str.subTitle }}</span>
          </h2>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <div class="leo-section leo-section--pt leo-section--no-mt">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <p role="presentation"></p>
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23266793"
              />
            </figure>
            <p>{{ str.p2t1 }}</p>
            <p role="presentation"></p>
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23267137"
              />
            </figure>
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
            <p role="presentation"></p>
          </div>
          <div class="leo-section">
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23265551"
              />
            </figure>
            <p>{{ str.p4t1 }}</p>
          </div>
        </div>

        <figure>
          <figcaption>
            {{ str.g4Title }}
          </figcaption>

          <LeoPic
            src="img/newspaceera2025_pic6_chart"
            ext="svg"
            :use2x="false"
            :webp="false"
            :width="430"
            :height="120"
          />

          <figcaption>
            {{ str.g4Caption }}
          </figcaption>
        </figure>

        <div class="leo-container">
          <p>{{ str.p5t1 }}</p>
          <p>{{ str.p5t2 }}</p>

          <div class="leo-section">
            <LeoReadMore
              :title="str.relatedTitle"
              :data="[
                {
                  title: str.related1Title,
                  link: str.related1Link,
                  bg: 'img/newspaceera2025_pic7_1',
                },
                {
                  title: str.related2Title,
                  link: str.related2Link,
                  bg: 'img/newspaceera2025_pic7_2',
                },
                {
                  title: str.related3Title,
                  link: str.related3Link,
                  bg: 'img/newspaceera2025_pic7_3',
                },
                {
                  title: str.related4Title,
                  link: str.related4Link,
                  bg: 'img/newspaceera2025_pic7_4',
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
.ls-two {
  &__moon {
    img {
      width: auto;
    }
  }
}
</style>
