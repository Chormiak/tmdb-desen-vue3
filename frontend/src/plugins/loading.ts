import { ref, type Ref } from 'vue';

export const isLoading: Ref<boolean> = ref(false);
export const changeLoading = (bool: boolean) => (isLoading.value = bool);
