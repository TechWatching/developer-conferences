<script setup lang="ts">
import { getLocalTimeZone, type DateValue } from '@internationalized/date'
import { today } from '@internationalized/date'
import type { TableColumn } from '@nuxt/ui'
import type { CalendarEvent } from '~~/types/events'

const props = defineProps<{
  conferences: CalendarEvent[]
}>()

const selectedDate = shallowRef(today(getLocalTimeZone()))
const selectedCountries = ref<string[]>(['France'])

const countries = computed(() => {
  const uniqueCountries = new Set(
    props.conferences
      .map(conf => conf.country)
      .filter(Boolean)
  )
  return Array.from(uniqueCountries).sort()
})

function isConferenceDate(date: DateValue): boolean {
  return props.conferences.some((conference: CalendarEvent) =>
    date.compare(conference.startDate) >= 0
    && date.compare(conference.endDate) <= 0
    && (selectedCountries.value.length === 0 || selectedCountries.value.includes(conference.country))
  )
}

const columnVisiblity = {
  name: true,
  location: true,
  country: false,
  startDate: false,
  endDate: false,
  hyperlink: false,
  dates: true
}

const columns: TableColumn<CalendarEvent>[] = [
  {
    accessorKey: 'name',
    header: 'Conference',
    cell: ({ row }) => h('a', {
      href: row.getValue('hyperlink'),
      target: '_blank',
      class: 'text-primary hover:underline'
    }, row.getValue('name'))
  },
  {
    accessorKey: 'location',
    header: 'Location'
  },
  {
    accessorKey: 'country',
    header: 'Country'
  },
  {
    accessorKey: 'startDate'
  },
  {
    accessorKey: 'endDate'
  },
  {
    accessorKey: 'hyperlink'
  },
  {
    accessorKey: 'dates',
    header: 'Dates',
    cell: ({ row }) => {
      const startDate = row.getValue('startDate') as DateValue
      const endDate = row.getValue('endDate') as DateValue
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: getLocalTimeZone(),
        day: 'numeric',
        month: 'long'
      })
      return startDate.compare(endDate) === 0
        ? formatter.format(startDate.toDate(getLocalTimeZone()))
        : `From ${formatter.format(startDate.toDate(getLocalTimeZone()))} to ${formatter.format(endDate.toDate(getLocalTimeZone()))}`
    }
  }
]

const conferencesForSelectedDate = computed(() => {
  if (!selectedDate.value) return []

  return props.conferences.filter((conference: CalendarEvent) =>
    // Filter by date
    (selectedDate.value.compare(conference.startDate) >= 0
      && selectedDate.value.compare(conference.endDate) <= 0)
    // Filter by countries if any are selected
    && (selectedCountries.value.length === 0
      || selectedCountries.value.includes(conference.country))
  )
})
</script>

<template>
  <div>
    <div class="flex justify-center">
      <UInputMenu
        v-model="selectedCountries"
        :items="countries"
        multiple
        placeholder="Filter by country"
        class="w-full max-w-md"
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
            <UChip
              :show="isConferenceDate(day)"
              size="xs"
            >
              {{ day.day }}
            </UChip>
          </template>
        </UCalendar>
      </div>
      <UTable
        :data="conferencesForSelectedDate"
        :columns="columns"
        :column-visibility="columnVisiblity"
      />
    </div>
  </div>
</template>
