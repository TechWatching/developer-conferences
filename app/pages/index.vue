<script setup lang="ts">
import { getLocalTimeZone, type DateValue } from '@internationalized/date'
import { today } from '@internationalized/date'
import { convertEventToCalendarEvent, type CalendarEvent, type DeveloperAgendaConference } from '~~/types/events';
import type { TableColumn } from '@nuxt/ui'

const { data: allEvents } = await useFetch<DeveloperAgendaConference[]>('https://developers.events/all-events.json')
const conferences = computed<CalendarEvent[]>(() => {
  if (!allEvents.value) return []
  return allEvents.value.map(event => convertEventToCalendarEvent(event))
})

function isConferenceDate(date: DateValue): boolean {
  return conferences.value.some((conference: CalendarEvent) => date.compare(conference.startDate) >= 0 
    && date.compare(conference.endDate) <= 0 && 
    (selectedCountries.value.length === 0 || selectedCountries.value.includes(conference.country)));
}

const columnVisiblity = {
  name: true,
  startDate: false,
  endDate: false,
  location: true,
  country: false,
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
    accessorKey: 'country',
    header: 'Country',
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

const selectedCountries = ref<string[]>(['France']);

const countries = computed(() => {
  const uniqueCountries = new Set(
    conferences.value
      .map(conf => conf.country)
      .filter(Boolean)
  );
  return Array.from(uniqueCountries).sort();
});

const selectedDate = shallowRef(today(getLocalTimeZone()));
const conferencesForSelectedDate = computed(() => {
  if (!selectedDate.value) return [];
  
  return conferences.value.filter((conference: CalendarEvent) => 
    // Filter by date
    (selectedDate.value.compare(conference.startDate) >= 0 && 
    selectedDate.value.compare(conference.endDate) <= 0) && 
    // Filter by countries if any are selected
    (selectedCountries.value.length === 0 || 
    selectedCountries.value.includes(conference.country))
  );
});

</script>

<template>
  <UPage>
    <UPageHero title="Developer Conferences Agenda" description="Explore upcoming developer conferences for 2025."
      :links="[{ label: 'Calendar', to: '#calendar', size: 'xl' }]" />
    
    <UPageSection id="calendar" title="Conferences" :description="`${conferences.length} events`">
      <div class="mt-4 mx-auto">
        <UInputMenu
          v-model="selectedCountries"
          :items="countries"
          multiple
          placeholder="Filter by country"
        />
      </div>

      <div class="flex flex-col md:flex-row justify-center md:space-x-20 space-y-10 md:space-y-0 mt-10 overflow-y-auto">
        <div class="calendar-wrapper">
          <UCalendar 
            v-model="selectedDate" 
            size="xl"
            :ui="{ 
              cellTrigger: 'size-12 text-lg',
              headCell: 'text-lg py-2',
              heading: 'text-xl font-bold py-2'
            }"
          >
            <template #day="{ day }">
              <UChip :show="isConferenceDate(day)" size="xs">
                {{ day.day }}
              </UChip>
            </template>
          </UCalendar>
        </div>
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
