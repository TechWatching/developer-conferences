import { CalendarDate, parseDate, fromAbsolute, getLocalTimeZone } from '@internationalized/date'

export interface DeveloperAgendaConference {
    name: string;
    date: number[]; // Array of timestamps
    hyperlink: string;
    location: string;
}

export interface CalendarEvent {
    name: string;
    startDate: CalendarDate;
    endDate: CalendarDate;
    hyperlink: string;
    location: string;
}

export function convertEventToCalendarEvent(event: DeveloperAgendaConference): CalendarEvent {
    const startDate = fromAbsolute(event.date[0]!, getLocalTimeZone());
    const endDate = event.date[1] ? fromAbsolute(event.date[1]!, getLocalTimeZone()) : startDate;
    return {
        name: event.name,
        startDate: new CalendarDate(startDate.year, startDate.month, startDate.day),
        endDate: new CalendarDate(endDate.year, endDate.month, endDate.day),
        hyperlink: event.hyperlink,
        location: event.location
    };
}