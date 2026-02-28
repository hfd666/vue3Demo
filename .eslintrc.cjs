module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  globals: {
    // Vue 3 Composition API (auto-imported by unplugin-auto-import)
    ref: 'readonly',
    reactive: 'readonly',
    computed: 'readonly',
    watch: 'readonly',
    watchEffect: 'readonly',
    onMounted: 'readonly',
    onUnmounted: 'readonly',
    onBeforeMount: 'readonly',
    onBeforeUnmount: 'readonly',
    onUpdated: 'readonly',
    onBeforeUpdate: 'readonly',
    nextTick: 'readonly',
    defineComponent: 'readonly',
    defineAsyncComponent: 'readonly',
    getCurrentInstance: 'readonly',
    inject: 'readonly',
    provide: 'readonly',
    toRefs: 'readonly',
    toRef: 'readonly',
    unref: 'readonly',
    isRef: 'readonly',
    isReactive: 'readonly',
    isProxy: 'readonly',
    markRaw: 'readonly',
    toRaw: 'readonly',
    shallowRef: 'readonly',
    shallowReactive: 'readonly',
    readonly: 'readonly',
    shallowReadonly: 'readonly',
    customRef: 'readonly',
    triggerRef: 'readonly',
    effectScope: 'readonly',
    getCurrentScope: 'readonly',
    onScopeDispose: 'readonly',

    // Vue 3 Script Setup API (auto-imported by unplugin-auto-import)
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',

    // Vue Router (auto-imported by unplugin-auto-import)
    useRoute: 'readonly',
    useRouter: 'readonly',
    onBeforeRouteLeave: 'readonly',
    onBeforeRouteUpdate: 'readonly',

    // Element Plus (auto-imported by unplugin-auto-import)
    ElMessage: 'readonly',
    ElNotification: 'readonly'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ]
  },
  overrides: []
}
