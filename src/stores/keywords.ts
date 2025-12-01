import { defineStore } from "pinia";
import { ref, computed } from "vue";
import keywordGroups from "@/config/keywordGroups";

type OptionKeys = keyof typeof keywordGroups.options;

const useKeywordsStore = defineStore("keywords", () => {
  const selectedKeywordOptions = ref<Set<OptionKeys>>(new Set());

  const hasSelectedKeywords = computed(() => selectedKeywordOptions.value.size > 0);
  const selectedKeywordsCount = computed(() => selectedKeywordOptions.value.size);

  const allSelectedKeywordIds = computed(() => {
    const set = new Set<number>();

    // Sempre incluir o default
    keywordGroups.default.ids.forEach(id => set.add(id));
    
    // Adicionar opções selecionadas
    selectedKeywordOptions.value.forEach(key => {
      keywordGroups.options[key].ids.forEach(id => set.add(id));
    });

    return Array.from(set);
  });

  const selectedGroupNames = computed(() => [
    `Default: ${keywordGroups.default.name}`,
    ...Array.from(selectedKeywordOptions.value).map(key => keywordGroups.options[key].name)
  ]);

  const isOptionSelected = computed(() => (key: OptionKeys) => 
    selectedKeywordOptions.value.has(key)
  );

  const toggleKeywordOption = (key: OptionKeys) => {
    const set = selectedKeywordOptions.value;
    set.has(key) ? set.delete(key) : set.add(key);
  };

  const resetToDefault = () => selectedKeywordOptions.value.clear();

  return {
    selectedKeywordOptions: computed(() => selectedKeywordOptions.value),
    
    hasSelectedKeywords,
    selectedKeywordsCount,
    selectedGroupNames,
    allSelectedKeywordIds,
    isOptionSelected,
    
    toggleKeywordOption,
    resetToDefault,
    
    collectUniqueKeywordIds: allSelectedKeywordIds
  };
});

export default useKeywordsStore;