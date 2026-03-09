import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Video, Trash2, Edit, X, List } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface Participant {
  name: string;
  avatar?: string;
  initials: string;
  color: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'personal' | 'work' | 'health';
  location?: string;
  attendees?: number;
  isVirtual?: boolean;
  meetingPlatform?: 'zoom' | 'meet' | 'teams';
  meetingLink?: string;
  participants?: Participant[];
  calendarSource: 'Google Calendar' | 'Outlook' | 'Apple Calendar' | 'Personal';
  calendarColor: string;
}

const eventTypeColors = {
  meeting: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  personal: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  work: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  health: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
};

// Official meeting platform logos from Wikimedia Commons
const ZOOM_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 398 398'%3E%3Cpath fill='%232D8CFF' d='M199 0C89.5 0 0 89.5 0 199s89.5 199 199 199 199-89.5 199-199S308.5 0 199 0zm89.7 257.5c0 5.4-4.4 9.8-9.8 9.8H119.1c-5.4 0-9.8-4.4-9.8-9.8v-117c0-5.4 4.4-9.8 9.8-9.8h159.8c5.4 0 9.8 4.4 9.8 9.8v117zm56.4-15.8l-47-35.3v70.5l47-35.2z'/%3E%3C/svg%3E";

const MEET_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 87.5 72'%3E%3Cpath fill='%2300832d' d='M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z'/%3E%3Cpath fill='%230066da' d='M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z'/%3E%3Cpath fill='%23e94235' d='M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z'/%3E%3Cpath fill='%23ffba00' d='M20.5 20.5H0v31h20.5z'/%3E%3Cpath fill='%2300ac47' d='M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z'/%3E%3Cpath fill='%232684fc' d='M69.5 36V19.42L49.5 0H6C2.685 0 0 2.685 0 6v14.5h20.5V36z'/%3E%3C/svg%3E";

const TEAMS_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2228.833 2073.333'%3E%3Cpath fill='%235059c9' d='M1554.637 777.5h575.713c54.391 0 98.483 44.092 98.483 98.483v524.398c0 199.901-162.051 361.952-361.952 361.952h-1.711c-199.901.028-361.975-162-362.004-361.901V828.971c.001-28.427 23.045-51.471 51.471-51.471z'/%3E%3Ccircle fill='%235059c9' cx='1943.75' cy='440.583' r='233.25'/%3E%3Ccircle fill='%237b83eb' cx='1218.083' cy='336.917' r='336.917'/%3E%3Cpath fill='%237b83eb' d='M1667.323 777.5H717.01c-53.743 1.33-96.257 45.931-95.01 99.676v598.105c-7.505 322.519 247.657 590.16 570.167 598.053 322.51-7.893 577.671-275.534 570.167-598.053V877.176c1.245-53.745-41.268-98.346-95.011-99.676z'/%3E%3Cpath opacity='.1' d='M1244 777.5v838.145c-.258 38.435-23.549 72.964-59.09 87.598a91.856 91.856 0 01-35.765 7.257H667.613c-6.738-17.105-12.958-34.21-18.142-51.833a631.287 631.287 0 01-27.472-183.49V877.02c-1.246-53.659 41.198-98.19 94.855-99.52H1244z'/%3E%3Cpath opacity='.2' d='M1192.167 777.5v889.978a91.802 91.802 0 01-7.257 35.765c-14.634 35.541-49.163 58.833-87.598 59.09H691.975c-8.812-17.105-17.105-34.21-24.362-51.833-7.257-17.623-12.958-34.21-18.142-51.833a631.282 631.282 0 01-27.472-183.49V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h475.313z'/%3E%3Cpath opacity='.2' d='M1192.167 777.5v786.312c-.395 52.223-42.632 94.46-94.855 94.855h-447.84A631.282 631.282 0 01622 1475.177V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h475.312z'/%3E%3Cpath opacity='.2' d='M1140.333 777.5v786.312c-.395 52.223-42.632 94.46-94.855 94.855H649.472A631.282 631.282 0 01622 1475.177V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h423.478z'/%3E%3Cpath opacity='.1' d='M1244 509.522v163.275c-8.812.518-17.105 1.037-25.917 1.037s-17.105-.518-25.917-1.037c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 01-233.25-198.003 288.02 288.02 0 01-16.587-51.833h258.648c52.305.198 94.657 42.549 94.856 94.854z'/%3E%3Cpath opacity='.2' d='M1192.167 561.355v111.442a880.28 880.28 0 01-77.75-1.037 80.04 80.04 0 00-2.074-2.074c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 01-233.25-198.003h270.051c52.305.198 94.657 42.549 94.856 94.965z'/%3E%3Cpath opacity='.2' d='M1192.167 561.355v111.442a880.28 880.28 0 01-77.75-1.037 80.04 80.04 0 00-2.074-2.074c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 01-233.25-198.003h270.051c52.305.198 94.657 42.549 94.856 94.965z'/%3E%3Cpath opacity='.2' d='M1140.333 561.355v103.148c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 01-233.25-198.003h190.228c52.304.198 94.656 42.55 94.855 94.148z'/%3E%3Cpath fill='%2328a8ea' d='M1667.323 777.5H717.01c-53.743 1.33-96.257 45.931-95.01 99.676v347.098c0 322.519 261.481 584 584 584s584-261.481 584-584V877.176c1.245-53.745-41.268-98.346-95.011-99.676z'/%3E%3Cpath fill='%23fff' d='M1244 509.522v163.275c-8.812.518-17.105 1.037-25.917 1.037s-17.105-.518-25.917-1.037V509.522c0-52.305 42.408-94.713 94.713-94.713h103.148c52.305 0 94.713 42.408 94.713 94.713-.518 17.105-1.037 34.21-1.037 51.315 0 8.293.518 16.587 1.037 24.88.518 17.105 1.037 34.21 1.037 51.315 0 2.074-.518 3.629-.518 5.703v164.312c0 2.074.518 3.629.518 5.703 0 17.105-.518 34.21-1.037 51.315-.518 8.293-1.037 16.587-1.037 24.88 0 17.105.518 34.21 1.037 51.315v2.074c-54.391 1.161-98.483 45.253-98.483 99.676v297.32c0 17.105-13.927 31.032-31.032 31.032h-3.111c-17.105 0-31.032-13.927-31.032-31.032v-176.22c0-17.105-13.927-31.032-31.032-31.032h-176.22c-17.105 0-31.032 13.927-31.032 31.032v176.22c0 17.105-13.927 31.032-31.032 31.032h-3.111c-17.105 0-31.032-13.927-31.032-31.032v-297.32c0-54.422-44.092-98.514-98.483-99.676v-2.074c.518-17.105 1.037-34.21 1.037-51.315 0-8.293-.518-16.587-1.037-24.88-.518-17.105-1.037-34.21-1.037-51.315 0-2.074.518-3.629.518-5.703V672.797c0-2.074-.518-3.629-.518-5.703 0-17.105.518-34.21 1.037-51.315.518-8.293 1.037-16.587 1.037-24.88 0-17.105-.518-34.21-1.037-51.315 52.305-.518 94.713-42.926 94.713-95.231v-103.148c0-52.305 42.408-94.713 94.713-94.713h103.148c52.305 0 94.713 42.408 94.713 94.713z'/%3E%3C/svg%3E";

const getMeetingLogo = (platform: 'zoom' | 'meet' | 'teams') => {
  switch (platform) {
    case 'zoom':
      return ZOOM_LOGO;
    case 'meet':
      return MEET_LOGO;
    case 'teams':
      return TEAMS_LOGO;
  }
};

const getMeetingPlatformName = (platform: 'zoom' | 'meet' | 'teams') => {
  switch (platform) {
    case 'zoom':
      return 'Zoom';
    case 'meet':
      return 'Google Meet';
    case 'teams':
      return 'Microsoft Teams';
  }
};

export function Calendar() {
  const { isDarkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting' as 'meeting' | 'personal' | 'work' | 'health',
    location: '',
    isVirtual: false,
    meetingPlatform: 'zoom' as 'zoom' | 'meet' | 'teams',
    meetingLink: '',
    calendarSource: 'Personal' as 'Google Calendar' | 'Outlook' | 'Apple Calendar' | 'Personal',
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Standup',
      date: '2026-03-09',
      startTime: '09:00',
      endTime: '09:30',
      type: 'meeting',
      isVirtual: true,
      attendees: 8,
      meetingPlatform: 'zoom',
      meetingLink: 'https://zoom.us/j/1234567890',
      participants: [
        { name: 'Alice Johnson', initials: 'AJ', color: 'bg-blue-500' },
        { name: 'Bob Smith', initials: 'BS', color: 'bg-green-500' },
        { name: 'Charlie Brown', initials: 'CB', color: 'bg-red-500' },
        { name: 'David Wilson', initials: 'DW', color: 'bg-yellow-500' },
        { name: 'Eve Davis', initials: 'ED', color: 'bg-purple-500' },
        { name: 'Frank Lee', initials: 'FL', color: 'bg-cyan-500' },
        { name: 'Grace White', initials: 'GW', color: 'bg-orange-500' },
        { name: 'Hannah Green', initials: 'HG', color: 'bg-pink-500' },
      ],
      calendarSource: 'Google Calendar',
      calendarColor: 'bg-blue-500/20',
    },
    {
      id: 2,
      title: 'Gym Session',
      date: '2026-03-09',
      startTime: '18:00',
      endTime: '19:30',
      type: 'health',
      location: 'Fitness Center',
      calendarSource: 'Outlook',
      calendarColor: 'bg-green-500/20',
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: '2026-03-10',
      startTime: '14:00',
      endTime: '15:30',
      type: 'work',
      location: 'Conference Room A',
      attendees: 5,
      isVirtual: true,
      meetingPlatform: 'meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      participants: [
        { name: 'John Doe', initials: 'JD', color: 'bg-indigo-500' },
        { name: 'Jane Smith', initials: 'JS', color: 'bg-teal-500' },
        { name: 'Mike Johnson', initials: 'MJ', color: 'bg-amber-500' },
        { name: 'Sarah Williams', initials: 'SW', color: 'bg-rose-500' },
        { name: 'Tom Brown', initials: 'TB', color: 'bg-violet-500' },
      ],
      calendarSource: 'Apple Calendar',
      calendarColor: 'bg-orange-500/20',
    },
    {
      id: 4,
      title: 'Lunch with Sarah',
      date: '2026-03-11',
      startTime: '12:30',
      endTime: '13:30',
      type: 'personal',
      location: 'Downtown Cafe',
      calendarSource: 'Personal',
      calendarColor: 'bg-cyan-500/20',
    },
    {
      id: 5,
      title: 'Project Planning Meeting',
      date: '2026-03-12',
      startTime: '10:00',
      endTime: '11:30',
      type: 'meeting',
      isVirtual: true,
      meetingPlatform: 'teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting',
      attendees: 6,
      participants: [
        { name: 'Emma Wilson', initials: 'EW', color: 'bg-fuchsia-500' },
        { name: 'Oliver Taylor', initials: 'OT', color: 'bg-lime-500' },
        { name: 'Sophia Moore', initials: 'SM', color: 'bg-sky-500' },
        { name: 'James Anderson', initials: 'JA', color: 'bg-red-500' },
        { name: 'Isabella Thomas', initials: 'IT', color: 'bg-emerald-500' },
        { name: 'William Jackson', initials: 'WJ', color: 'bg-orange-500' },
      ],
      calendarSource: 'Outlook',
      calendarColor: 'bg-purple-500/20',
    },
    {
      id: 6,
      title: 'Yoga Class',
      date: '2026-03-13',
      startTime: '07:00',
      endTime: '08:00',
      type: 'health',
      location: 'Wellness Studio',
      calendarSource: 'Personal',
      calendarColor: 'bg-green-500/20',
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, firstDay, lastDay };
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.startTime.localeCompare(b.startTime);
      })
      .slice(0, 10);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const weekDays = getWeekDays(selectedDate);
  const upcomingEvents = getUpcomingEvents();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const previousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const previousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleCreateEvent = () => {
    const calendarColors = {
      'Google Calendar': 'bg-blue-500/20',
      'Outlook': 'bg-green-500/20',
      'Apple Calendar': 'bg-orange-500/20',
      'Personal': 'bg-cyan-500/20',
    };

    const newEventData: Event = {
      id: events.length + 1,
      ...newEvent,
      calendarColor: calendarColors[newEvent.calendarSource],
    };

    setEvents([...events, newEventData]);
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      type: 'meeting',
      location: '',
      isVirtual: false,
      meetingPlatform: 'zoom',
      meetingLink: '',
      calendarSource: 'Personal',
    });
  };

  const joinMeeting = (link: string) => {
    window.open(link, '_blank');
  };

  const getMeetingButtonStyle = (platform: 'zoom' | 'meet' | 'teams') => {
    switch (platform) {
      case 'zoom':
        return isDarkMode
          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
          : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border border-blue-500/30';
      case 'meet':
        return isDarkMode
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
          : 'bg-green-500/20 text-green-600 hover:bg-green-500/30 border border-green-500/30';
      case 'teams':
        return isDarkMode
          ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
          : 'bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 border border-purple-500/30';
    }
  };

  const EventCard = ({ event, compact = false }: { event: Event; compact?: boolean }) => {
    const eventStyle = eventTypeColors[event.type];
    
    if (compact) {
      return (
        <div className={`p-3 rounded-lg border ${eventStyle.border} ${eventStyle.bg} smooth-transition hover:scale-[1.02]`}>
          <div className="mb-2">
            <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {event.title}
            </h4>
            <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
              {event.startTime} - {event.endTime}
            </div>
          </div>
          
          {event.isVirtual && event.meetingLink && event.meetingPlatform && (
            <>
              <button
                onClick={() => joinMeeting(event.meetingLink!)}
                className={`w-full px-2 py-1.5 rounded text-xs font-medium smooth-transition mb-2 ${getMeetingButtonStyle(event.meetingPlatform)}`}
              >
                Join Meeting
              </button>
              <div className="flex items-center justify-center pt-2 border-t border-white/10">
                <img 
                  src={getMeetingLogo(event.meetingPlatform)} 
                  alt={getMeetingPlatformName(event.meetingPlatform)}
                  className="h-4 w-auto opacity-70"
                />
              </div>
            </>
          )}
        </div>
      );
    }
    
    return (
      <div className={`p-4 rounded-lg border ${eventStyle.border} ${eventStyle.bg} smooth-transition hover:scale-[1.01]`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {event.title}
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded ${event.calendarColor} ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                {event.calendarSource}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${eventStyle.bg} ${eventStyle.text} capitalize`}>
                {event.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
              <Edit className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} />
            </button>
            <button
              onClick={() => deleteEvent(event.id)}
              className={`p-1.5 rounded smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <Clock className={`w-3.5 h-3.5 ${eventStyle.text}`} />
            <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
              {event.startTime} - {event.endTime}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className={`w-3.5 h-3.5 ${eventStyle.text}`} />
              <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {event.location}
              </span>
            </div>
          )}

          {event.isVirtual && event.meetingPlatform && (
            <div className="flex items-center gap-2">
              <Video className={`w-3.5 h-3.5 ${eventStyle.text}`} />
              <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {getMeetingPlatformName(event.meetingPlatform)}
              </span>
            </div>
          )}

          {event.attendees && (
            <div className="flex items-center gap-2">
              <Users className={`w-3.5 h-3.5 ${eventStyle.text}`} />
              <span className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                {event.attendees} attendees
              </span>
            </div>
          )}
        </div>

        {/* Participants */}
        {event.participants && event.participants.length > 0 && (
          <div className="mb-3">
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Participants:</p>
            <div className="flex items-center -space-x-2">
              {event.participants.slice(0, 5).map((participant, idx) => (
                <div
                  key={idx}
                  className={`w-7 h-7 rounded-full ${participant.color} border-2 ${isDarkMode ? 'border-gray-800' : 'border-white'} flex items-center justify-center text-xs font-medium text-white`}
                  title={participant.name}
                >
                  {participant.initials}
                </div>
              ))}
              {event.participants.length > 5 && (
                <div className={`w-7 h-7 rounded-full ${isDarkMode ? 'bg-white/20 border-gray-800' : 'bg-black/20 border-white'} border-2 flex items-center justify-center text-xs font-medium ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                  +{event.participants.length - 5}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Join Meeting Button */}
        {event.isVirtual && event.meetingLink && event.meetingPlatform && (
          <div>
            <button
              onClick={() => joinMeeting(event.meetingLink!)}
              className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition ${getMeetingButtonStyle(event.meetingPlatform)}`}
            >
              Join {getMeetingPlatformName(event.meetingPlatform)}
            </button>
            
            {/* Platform Logo */}
            <div className={`flex items-center justify-center mt-3 pt-3 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <img 
                src={getMeetingLogo(event.meetingPlatform)} 
                alt={getMeetingPlatformName(event.meetingPlatform)}
                className="h-6 w-auto opacity-60"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold m-0 ${isDarkMode ? 'text-white/95' : 'text-black/95'}`}>
            Calendar
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            Manage your schedule and events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center rounded-lg overflow-hidden border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium smooth-transition capitalize ${
                  view === v
                    ? isDarkMode
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-cyan-500/20 text-cyan-600'
                    : isDarkMode
                    ? 'text-white/60 hover:text-white/90'
                    : 'text-black/60 hover:text-black/90'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewEventModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition ${
              isDarkMode
                ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Event</span>
          </button>
        </div>
      </div>

      {/* Month View */}
      {view === 'month' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 glass-card p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                >
                  <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    setCurrentDate(today);
                    setSelectedDate(today);
                  }}
                  className={`px-3 py-1 text-sm rounded-lg smooth-transition ${
                    isDarkMode
                      ? 'text-cyan-400 hover:bg-cyan-500/10'
                      : 'text-cyan-600 hover:bg-cyan-500/10'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                >
                  <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day names */}
              {dayNames.map(day => (
                <div key={day} className="text-center py-2">
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {day}
                  </span>
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayEvents = getEventsForDate(date);
                const today = isToday(day);
                const selected = isSelected(day);

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square p-2 rounded-lg smooth-transition relative ${
                      today
                        ? 'bg-cyan-500/20 border-2 border-cyan-400'
                        : selected
                        ? isDarkMode
                          ? 'bg-white/10 border-2 border-white/30'
                          : 'bg-black/10 border-2 border-black/30'
                        : isDarkMode
                        ? 'hover:bg-white/5 border-2 border-transparent'
                        : 'hover:bg-black/5 border-2 border-transparent'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      today
                        ? 'text-cyan-400'
                        : isDarkMode
                        ? 'text-white/80'
                        : 'text-black/80'
                    }`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-1 mt-1 justify-center">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${eventTypeColors[event.type].text.replace('text-', 'bg-')}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events for Selected Day */}
          <div className="glass-card p-6 max-h-[600px] overflow-y-auto">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h3>

            <div className="space-y-3">
              {todayEvents.length > 0 ? (
                todayEvents.map(event => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    No events scheduled
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              Week of {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={previousWeek}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  setCurrentDate(today);
                  setSelectedDate(today);
                }}
                className={`px-3 py-1 text-sm rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'text-cyan-400 hover:bg-cyan-500/10'
                    : 'text-cyan-600 hover:bg-cyan-500/10'
                }`}
              >
                Today
              </button>
              <button
                onClick={nextWeek}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day, idx) => {
              const dayEvents = getEventsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              
              return (
                <div key={idx} className="flex flex-col">
                  <div className={`text-center mb-3 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className={`text-xs mb-1 font-medium ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                      {dayNames[day.getDay()]}
                    </div>
                    <div className={`text-xl font-bold ${
                      isToday
                        ? 'text-cyan-400'
                        : isDarkMode
                        ? 'text-white/90'
                        : 'text-black/90'
                    }`}>
                      {day.getDate()}
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    {dayEvents.map(event => (
                      <EventCard key={event.id} event={event} compact />
                    ))}
                    {dayEvents.length === 0 && (
                      <div className={`text-center py-4 text-xs ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
                        No events
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={previousDay}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  setCurrentDate(today);
                  setSelectedDate(today);
                }}
                className={`px-3 py-1 text-sm rounded-lg smooth-transition ${
                  isDarkMode
                    ? 'text-cyan-400 hover:bg-cyan-500/10'
                    : 'text-cyan-600 hover:bg-cyan-500/10'
                }`}
              >
                Today
              </button>
              <button
                onClick={nextDay}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {todayEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
                <p className={`text-base ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                  No events scheduled for this day
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Agenda View */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <List className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
            Upcoming Agenda
          </h3>
        </div>

        <div className="space-y-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const eventStyle = eventTypeColors[event.type];
              const eventDate = new Date(event.date);
              const isEventToday = eventDate.toDateString() === new Date().toDateString();
              const isTomorrow = eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
              
              let dateLabel = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              if (isEventToday) dateLabel = 'Today';
              if (isTomorrow) dateLabel = 'Tomorrow';

              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border ${eventStyle.border} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} smooth-transition hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      {/* Date */}
                      <div className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-3 rounded ${eventStyle.bg} ${eventStyle.border} border`}>
                        <div className={`text-xs font-medium ${eventStyle.text}`}>
                          {dateLabel}
                        </div>
                        <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                          {event.startTime}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>
                          {event.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className={`px-2 py-0.5 rounded ${event.calendarColor} ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                            {event.calendarSource}
                          </span>
                          <span className={isDarkMode ? 'text-white/60' : 'text-black/60'}>
                            {event.startTime} - {event.endTime}
                          </span>
                          {event.location && (
                            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          )}
                          {event.attendees && (
                            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                              <Users className="w-3 h-3" />
                              {event.attendees}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Join Button */}
                      <div className="flex flex-col items-end gap-2">
                        {event.isVirtual && event.meetingLink && event.meetingPlatform && (
                          <>
                            <button
                              onClick={() => joinMeeting(event.meetingLink!)}
                              className={`px-4 py-2 rounded-lg text-xs font-medium smooth-transition ${getMeetingButtonStyle(event.meetingPlatform)}`}
                            >
                              Join Meeting
                            </button>
                            <img 
                              src={getMeetingLogo(event.meetingPlatform)} 
                              alt={getMeetingPlatformName(event.meetingPlatform)}
                              className="h-5 w-auto opacity-50"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <List className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} />
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                No upcoming events
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="glass-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: isDarkMode ? 'rgba(15, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(40px)' }}
          >
            <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white/90' : 'text-black/90'}`}>Create New Event</h3>
              <button
                onClick={() => setShowNewEventModal(false)}
                className={`p-2 rounded-lg smooth-transition ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Event Title *
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Event Type *
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                        : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Calendar Source *
                </label>
                <select
                  value={newEvent.calendarSource}
                  onChange={(e) => setNewEvent({ ...newEvent, calendarSource: e.target.value as any })}
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                  }`}
                >
                  <option value="Personal">Personal</option>
                  <option value="Google Calendar">Google Calendar</option>
                  <option value="Outlook">Outlook</option>
                  <option value="Apple Calendar">Apple Calendar</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                  Location
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Add location or meeting room"
                  className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                      : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                  }`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.isVirtual}
                    onChange={(e) => setNewEvent({ ...newEvent, isVirtual: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                    Virtual Meeting
                  </span>
                </label>
              </div>

              {newEvent.isVirtual && (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      Meeting Platform
                    </label>
                    <select
                      value={newEvent.meetingPlatform}
                      onChange={(e) => setNewEvent({ ...newEvent, meetingPlatform: e.target.value as any })}
                      className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-white/90 focus:border-cyan-400/50'
                          : 'bg-white/30 border-black/10 text-black/90 focus:border-cyan-400/50'
                      }`}
                    >
                      <option value="zoom">Zoom</option>
                      <option value="meet">Google Meet</option>
                      <option value="teams">Microsoft Teams</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
                      Meeting Link
                    </label>
                    <input
                      type="url"
                      value={newEvent.meetingLink}
                      onChange={(e) => setNewEvent({ ...newEvent, meetingLink: e.target.value })}
                      placeholder="https://zoom.us/j/..."
                      className={`w-full px-4 py-2.5 rounded-lg border smooth-transition text-sm ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-white/90 placeholder-white/40 focus:border-cyan-400/50'
                          : 'bg-white/30 border-black/10 text-black/90 placeholder-black/40 focus:border-cyan-400/50'
                      }`}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={`flex justify-end gap-3 p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <button
                onClick={() => setShowNewEventModal(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
                  isDarkMode
                    ? 'bg-white/5 text-white/70 hover:bg-white/10'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${
                  !newEvent.title || !newEvent.date
                    ? isDarkMode
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-black/5 text-black/30 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30'
                    : 'bg-cyan-500/20 text-cyan-600 hover:bg-cyan-500/30 border border-cyan-500/30'
                }`}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
