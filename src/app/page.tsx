"use client";

import { createMachine } from "@zag-js/core";
import { useMachine } from "@zag-js/react";

type MachineState = {
  value: "inactive" | "active";
}

type MachineContext = {
  value: boolean,
}

const machine = createMachine<MachineContext, MachineState>({
  id: "toggle",
  initial: "inactive",
  context: {
    value: false,
  },
  states: {
    inactive: {
      on: {
        CLICK: {
          target: "active",
          actions: ["setActiveState"],
        },
      }
    },
    active: {
      on: {
        CLICK: {
          target: "inactive",
          actions: ["setInactiveState"],
        },
      }
    },

  },
},
  {
    actions: {
      setActiveState: (context) => {
        context.value = true;
      },
      setInactiveState: (context) => {
        context.value = false;
      }
    }
  }
)

export default function Page() {
  const [state, send] = useMachine(machine);

  return (
    <main className="p-5">
      <div className="py-3">
        {/*
      <div>
        {`state: ${JSON.stringify(state)}`}
      </div>
      */}
        <div>
          {`state value: ${JSON.stringify(state.value)}`}
        </div>
        <div>
          {`event: ${JSON.stringify(state.event)}`}
        </div>
        <div>
          {`context: ${JSON.stringify(state.context)}`}
        </div>
      </div>
      <button
        onClick={() => {
          send("CLICK");
        }}
        className={`
          px-4 py-2 rounded-full font-semibold text-sm
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${state.context.value
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
          }
        `}
      >
        {state.context.value ? "Active" : "Inactive"}
      </button>
    </main>
  );
}
