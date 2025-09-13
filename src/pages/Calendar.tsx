import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as RBCEvent,
  View,
  Navigate,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import type { AxiosResponse } from "axios"; // 👈 import type riêng

// Localizer cơ bản
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {},
});

// Kiểu dữ liệu cho Task
interface TaskEvent extends RBCEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

// Custom Toolbar
function CustomToolbar({
  label,
  onNavigate,
  onView,
}: {
  label: string;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY" | "DATE") => void; // 👈 sửa type
  onView: (view: View) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Nhóm trái: Today, Prev, Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate("PREV")}
          className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
        >
          ›
        </button>
        <span className="ml-4 text-lg font-semibold">{label}</span>
      </div>

      {/* Nhóm phải: chọn view */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView("month")}
          className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
        >
          Month
        </button>
        <button
          onClick={() => onView("week")}
          className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
        >
          Week
        </button>
      </div>
    </div>
  );
}

export default function CalendarView() {
  const [events, setEvents] = useState<TaskEvent[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("month");

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res: AxiosResponse<any>) => {
        const tasks = res.data.flatMap((p: any) => p.tasks);

        const formatted: TaskEvent[] = tasks
          .filter((t: any) => t.deadline)
          .map((t: any) => ({
            id: t._id,
            title: t.title,
            start: new Date(t.deadline),
            end: new Date(t.deadline),
          }));

        setEvents(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">📅 Calendar View</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        view={view}
        onView={(newView) => setView(newView)}
        style={{ height: 600 }}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              label={props.label}
              onNavigate={props.onNavigate}
              onView={props.onView}
            />
          ),
        }}
      />
    </div>
  );
}
