"use client";

import { Button } from "@/components/ui/button";
import { Scheduler } from "@aldabil/react-scheduler";

export const EVENTS = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4],
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: "#50b500",
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false,
  },
  {
    event_id: 4,
    title: "Event 4",
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    color: "#900000",
  },
  {
    event_id: 5,
    title: "Event 5",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    editable: true,
  },
  {
    event_id: 6,
    title: "Event 6",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 4
      )
    ),
    end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
    admin_id: 2,
  },
];

export default function SchedulePage() {
  return (
    <div>
      <Scheduler
        events={EVENTS}
        view="week"
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 9,
          endHour: 17,
          step: 60,
          cellRenderer: ({ start, onClick, ...props }) => {
            // Fake some condition up
            const hour = start.getHours();
            const disabled = hour === 14;
            const restProps = disabled ? {} : props;
            return (
              <Button
                style={{
                  height: "100%",
                  background: disabled ? "#eee" : "transparent",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (disabled) {
                    return alert("Opss");
                  }
                  onClick();
                }}
                {...restProps}
              ></Button>
            );
          },
        }}
      />
    </div>
  );
}
