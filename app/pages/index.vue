<script setup lang="ts">
import { convertEventToCalendarEvent, type CalendarEvent, type DeveloperAgendaConference } from '~~/types/events';

const { data: allEvents } = await useFetch<DeveloperAgendaConference[]>('https://developers.events/all-events.json')
const conferences = computed<CalendarEvent[]>(() => {
  if (!allEvents.value) return []
  return allEvents.value.map(event => convertEventToCalendarEvent(event))
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Developer Conferences Agenda"
      description="Explore upcoming developer conferences for 2025."
      :links="[{ label: 'Calendar', to: '#calendar', size: 'xl' }]" />
    
    <UPageSection id="calendar" title="Conferences" :description="`${conferences.length} events`">
      <ConferenceCalendar :conferences="conferences" />
    </UPageSection>
    
    <UPageSection>
      <UPageCTA title="Resources & Inspiration"
        description="This project is based on the data available on the developers-conferences-agenda GitHub repository and inspired from the developers.events website. Check them and give the repository a star."
        variant="subtle" 
        :links="[
          {
            label: 'Original Website',
            to: 'https://developers.events/#/2025/calendar',
            target: '_blank',
            icon: 'i-ph-globe-light',
            color: 'neutral'
          },
          {
            label: 'GitHub',
            to: 'https://github.com/scraly/developers-conferences-agenda',
            target: '_blank',
            trailingIcon: 'i-simple-icons-github',
            color: 'neutral',
            variant: 'subtle'
          }
        ]" />
    </UPageSection>
  </UPage>
</template>
