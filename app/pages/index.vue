<script setup lang="ts">
import { convertEventToCalendarEvent, type CalendarEvent, type DeveloperAgendaConference } from '~~/types/events';
import { useLocalStorage } from '@vueuse/core';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const cachedConferences = useLocalStorage<{ data: DeveloperAgendaConference[]; timestamp: number }>('developer-conferences-cachedConferences', {
  data: [],
  timestamp: 0
});

const isCacheValid = computed(() => 
  cachedConferences.value.data.length > 0 && 
  (Date.now() - cachedConferences.value.timestamp) < ONE_DAY_MS
);

const { data: conferencesData } = await useAsyncData<DeveloperAgendaConference[]>(
  'conferences',
  async () => {
    if (isCacheValid.value) {
      return cachedConferences.value.data;
    }
    
    const developerEvents = await $fetch<DeveloperAgendaConference[]>('https://developers.events/all-events.json');
    
    if (developerEvents) {
      cachedConferences.value = {
        data: developerEvents,
        timestamp: Date.now()
      };
    }
    
    return developerEvents || [];
  }
);

const conferences = computed<CalendarEvent[]>(() => 
  (conferencesData.value || []).map(event => convertEventToCalendarEvent(event))
);
</script>

<template>
  <UPage>
    <UPageHero
      title="Developer Conferences"
      description="Explore previous and upcoming developer conferences from around the world."
      :links="[{ label: 'Calendar', to: '#calendar', size: 'xl' }]" />
    
    <UPageSection id="calendar" title="Conferences" :description="`${conferences.length} events`">
      <ConferenceCalendar :conferences="conferences" />
    </UPageSection>
    
    <UPageSection>
      <UPageCTA title="Resources & Inspiration"
        description="This website uses the data made available by the developers-conferences-agenda GitHub repository which is an amazing project that you should definitely check. Give it a start, contribute with your events, and talk about it. This website is also inspired by the developers.events website."
        variant="subtle" 
        :links="[
          {
            label: 'Developers Conferences Agenda',
            to: 'https://github.com/scraly/developers-conferences-agenda',
            target: '_blank',
            trailingIcon: 'i-simple-icons-github',
            color: 'neutral',
            variant: 'subtle'
          },
          {
            label: 'Developer Events',
            to: 'https://developers.events/#/2025/calendar',
            target: '_blank',
            icon: 'i-ph-globe-light',
            color: 'neutral'
          },
        ]" />
    </UPageSection>
  </UPage>
</template>
