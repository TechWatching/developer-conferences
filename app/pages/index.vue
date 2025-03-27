<script setup lang="ts">
import { getLocalTimeZone, type DateValue } from '@internationalized/date'
import { today } from '@internationalized/date'
import { convertEventToCalendarEvent, type CalendarEvent, type DeveloperAgendaConference } from '~~/types/events';
import type { TableColumn } from '@nuxt/ui'

const allEvents = await import('~/assets/all-events.json')
const conferences: CalendarEvent[] = allEvents.default.map((event: DeveloperAgendaConference) => convertEventToCalendarEvent(event))

function isConferenceDate(date: DateValue): boolean {
  return conferences.some(conference => date.compare(conference.startDate) >= 0 && date.compare(conference.endDate) <= 0);
}

const columnVisiblity = {
  name: true,
  startDate: false,
  endDate: false,
  location: true,
};
const columns: TableColumn<CalendarEvent>[] = [
  {
    accessorKey: 'name',
    header: 'Conference',
    cell: ({row}) => h('a', {
      href: row.getValue('hyperlink'),
      target: '_blank',
      class: 'text-primary hover:underline'
    }, row.getValue('name')),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'startDate',
  },
  {
    accessorKey: 'endDate',
  },
  {
    accessorKey: 'dates',
    header: 'Dates',
    cell: ({row}) => {
      const startDate = row.getValue('startDate') as DateValue;
      const endDate = row.getValue('endDate') as DateValue;
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: getLocalTimeZone(),
        day: 'numeric',
        month: 'long',
      });
      return startDate.compare(endDate) === 0
        ? formatter.format(startDate.toDate(getLocalTimeZone()))
        : `From ${formatter.format(startDate.toDate(getLocalTimeZone()))} to ${formatter.format(endDate.toDate(getLocalTimeZone()))}`;
    }
  },
]

const selectedDate = shallowRef(today(getLocalTimeZone()));
const conferencesForSelectedDate = computed(() => {
  if (!selectedDate.value) return [];
    return conferences.filter(conference => 
    (selectedDate.value.compare(conference.startDate) >= 0 && 
    selectedDate.value.compare(conference.endDate) <= 0)
  );
});

</script>

<template>
  <UPage>
    <UPageHero title="Developer Conferences Agenda" description="Explore upcoming developer conferences for 2025."
      :links="[{ label: '2025 Calendar', to: '#calendar', size: 'xl' }]" />
    
    <UPageSection id="calendar" title="2025" :description="`${conferences.length} events`">
      <div class="flex flex-row justify-center space-x-20 scale-150 mt-20">
        <UCalendar v-model="selectedDate">
          <template #day="{ day }">
            <UChip :show="isConferenceDate(day)" size="2xs">
              {{ day.day }}
            </UChip>
          </template>
        </UCalendar>
        <UTable :data="conferencesForSelectedDate" :columns="columns" :column-visibility="columnVisiblity">
        </UTable>
      </div>
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
