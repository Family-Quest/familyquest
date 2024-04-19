<script lang="ts" setup>
import { ref } from 'vue'
import { kPage, kNavbar, kTabbar, kTabbarLink, kBlock, kIcon, kFab, kPopup, kLink } from 'konsta/vue'
import QuestPannel from '~/components/admin/QuestPannel.vue'
import RewardPannel from '~/components/admin/RewardPannel.vue'

const activeTab = ref('tab-1')
const isTabbarLabels = ref(true)
const isTabbarIcons = ref(true)
const popupOpened = ref(false)
const isQuestActive = ref(true)
const title =  computed(() => activeTab.value === 'tab-1' ? 'Création d\'une quête' : 'Création d\'une récompense')
</script>

<template>
    <k-page class="pt-13">
      <k-navbar title="Administration" />

      <k-tabbar
        class="fixed bottom-0 left-0"
        :icons="isTabbarIcons"
        :labels="isTabbarLabels"
      >
        <k-tabbar-link
          :active="activeTab === 'tab-1'"
          @click="() => {(activeTab = 'tab-1'); isQuestActive = true}"
        >
          <template v-if="isTabbarLabels" #label> Quest </template>
          <template v-if="isTabbarIcons" #icon>
            <k-icon>
              <template #ios>
                <Icon
                  class="mr-2 h-full w-8 rounded-full p-1"
                  name="game-icons:newspaper"
                />
              </template>
              <template #material>
                <Icon
                  class="mr-2 h-full w-8 rounded-full p-1"
                  name="game-icons:newspaper"
                />
              </template>
            </k-icon>
          </template>
        </k-tabbar-link>
        <k-tabbar-link
          :active="activeTab === 'tab-2'"
          @click="() => { activeTab = 'tab-2'; isQuestActive = false }"
        >
          <template v-if="isTabbarLabels" #label> Reward </template>
          <template v-if="isTabbarIcons" #icon>
            <k-icon>
              <template #ios>
                <Icon
                  class="mr-2 h-full w-8 rounded-full p-1"
                  name="game-icons:wanted-reward"
                />
              </template>
              <template #material>
                <Icon
                  class="mr-2 h-full w-8 rounded-full p-1"
                  name="game-icons:wanted-reward"
                />
              </template>
            </k-icon>
          </template>
        </k-tabbar-link>
      </k-tabbar>

      <k-fab class="fixed left-[45%] z-20 bottom-4-safe">
        <template #icon>
          <Icon
            class="!block h-full rounded-full"
            name="heroicons-solid:plus"
            @click="() => (popupOpened = true)"
          />
        </template>
      </k-fab>

      <k-block v-if="activeTab === 'tab-1'" class="space-y-4" inset strong>
        <p>
          <b>Quests</b>
        </p>
        <quest-pannel />
      </k-block>

      <k-block v-if="activeTab === 'tab-2'" class="space-y-4" inset strong>
        <p>
          <b>Reward</b>
        </p>
        <reward-pannel />
      </k-block>

      <k-popup :opened="popupOpened" @backdropclick="() => (popupOpened = false)">
        <k-page class="pt-13">
          <k-navbar :title>
            <template #right>
              <k-link navbar @click="() => (popupOpened = false)">
                <Icon name="heroicons-solid:x" />
              </k-link>
            </template>
          </k-navbar>

          <QuestForm
            v-if="isQuestActive"
           family-id="2bae7e29-a46a-4d3c-970e-7672b7e4ed78"
           @close-modal="popupOpened = false"
          />

          <RewardForm
            v-else
            family-id="2bae7e29-a46a-4d3c-970e-7672b7e4ed78"
            @close-modal ="popupOpened = false"
          />
        </k-page>
      </k-popup>
    </k-page>
</template>
