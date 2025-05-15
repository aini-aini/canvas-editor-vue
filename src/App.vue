<script setup lang="ts">
import CanvasEditor from "./components/CanvasEditor/CanvasEditor.vue";
import { ref, onMounted, nextTick } from "vue";

const canvasEditorRef = ref();
</script>

<template>
  <CanvasEditor ref="canvasEditorRef" />
</template>

<style scoped></style>
