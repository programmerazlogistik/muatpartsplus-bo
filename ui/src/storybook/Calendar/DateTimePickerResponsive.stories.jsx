import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { DateTimePickerResponsive } from "@muatmuat/ui/Calendar";

export default {
  title: "Components/Calendar/DateTimePickerResponsive",
  component: DateTimePickerResponsive,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive date and time picker component with modal interface. Opens a modal for date selection with an integrated time picker.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "object",
      description: "Initial date/time value",
    },
    onChange: {
      action: "changed",
      description: "Callback when date/time changes",
    },
    onApply: {
      action: "applied",
      description: "Callback when date/time is applied",
    },
    useModal: {
      control: "boolean",
      description: "Whether to use modal interface",
      defaultValue: false,
    },
    title: {
      control: "text",
      description: "Title for the modal",
    },
    showClear: {
      control: "boolean",
      description: "Whether to show clear button",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "Whether the picker is disabled",
      defaultValue: false,
    },
    showOutsideDays: {
      control: "boolean",
      description: "Whether to show days from outside the current month",
      defaultValue: true,
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown"],
      description: "Layout for the month/year caption",
      defaultValue: "label",
    },
  },
};

const Template = (args) => {
  const [selectedDate, setSelectedDate] = useState(args.value || new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
    if (args.onChange) args.onChange(date);
  };

  return (
    <div className="p-4">
      <DateTimePickerResponsive
        {...args}
        value={selectedDate}
        onChange={handleChange}
      >
        <Button variant="muatparts-primary">
          {selectedDate
            ? selectedDate.toLocaleString("id-ID")
            : "Select Date & Time"}
        </Button>
      </DateTimePickerResponsive>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  useModal: false,
  showClear: true,
  showOutsideDays: true,
  captionLayout: "label",
};
Default.parameters = {
  docs: {
    description: {
      story:
        "Default DateTimePickerResponsive with current date and time. Click the button to open the date picker modal.",
    },
  },
};

export const WithInitialDate = Template.bind({});
WithInitialDate.args = {
  value: new Date(2024, 5, 15, 14, 30),
  useModal: false,
  showClear: true,
};
WithInitialDate.parameters = {
  docs: {
    description: {
      story:
        "DateTimePicker with pre-set date and time (June 15, 2024 at 2:30 PM).",
    },
  },
};

export const ModalInterface = Template.bind({});
ModalInterface.args = {
  value: new Date(),
  useModal: true,
  title: "Select Date & Time",
  showClear: true,
};
ModalInterface.parameters = {
  docs: {
    description: {
      story:
        "DateTimePicker with modal interface enabled. The modal provides a more prominent interface for date and time selection.",
    },
  },
};

export const WithoutClearButton = Template.bind({});
WithoutClearButton.args = {
  value: new Date(),
  useModal: false,
  showClear: false,
};
WithoutClearButton.parameters = {
  docs: {
    description: {
      story: "DateTimePicker without the clear button option.",
    },
  },
};

export const WithCustomCalendarProps = Template.bind({});
WithCustomCalendarProps.args = {
  value: new Date(),
  useModal: false,
  showOutsideDays: false,
  captionLayout: "dropdown",
};
WithCustomCalendarProps.parameters = {
  docs: {
    description: {
      story:
        "DateTimePicker with custom calendar properties - hidden outside days and dropdown caption layout.",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: new Date(),
  disabled: true,
  useModal: false,
};
Disabled.parameters = {
  docs: {
    description: {
      story:
        "Disabled DateTimePicker component. The trigger button is disabled and cannot be clicked.",
    },
  },
};

export const InteractiveDemo = (args) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastAction, setLastAction] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    setLastAction(`Date changed to: ${date.toLocaleString("id-ID")}`);
  };

  const handleApply = (date) => {
    setLastAction(`Date applied: ${date.toLocaleString("id-ID")}`);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <p className="mb-2 text-sm text-neutral-600">Selected Date & Time:</p>
        <p className="text-lg font-semibold text-neutral-900">
          {selectedDate.toLocaleString("id-ID")}
        </p>
      </div>

      {lastAction && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
          <p className="text-sm text-blue-800">{lastAction}</p>
        </div>
      )}

      <div className="flex justify-center">
        <DateTimePickerResponsive
          {...args}
          value={selectedDate}
          onChange={handleChange}
          onApply={handleApply}
        >
          <Button variant="muatparts-primary">Select Date & Time</Button>
        </DateTimePickerResponsive>
      </div>
    </div>
  );
};

InteractiveDemo.args = {
  useModal: false,
  showClear: true,
};
InteractiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Interactive demo showing the component's behavior with real-time feedback on date changes and apply actions.",
    },
  },
};

export const ResponsiveBehavior = (args) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-4">
      <div className="mx-auto max-w-xs">
        <DateTimePickerResponsive
          {...args}
          value={selectedDate}
          onChange={handleChange}
        >
          <Button variant="muatparts-primary" className="w-full">
            📅 Select Date & Time
          </Button>
        </DateTimePickerResponsive>
      </div>
    </div>
  );
};

ResponsiveBehavior.args = {
  useModal: false,
  showClear: true,
};
ResponsiveBehavior.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the responsive behavior of the component. The modal adapts to different screen sizes.",
    },
  },
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const LocalizationDemo = Template.bind({});
LocalizationDemo.args = {
  value: new Date(),
  useModal: false,
  showClear: true,
};
LocalizationDemo.parameters = {
  docs: {
    description: {
      story:
        "DateTimePicker with Indonesian localization support. The component displays dates and times in Indonesian format.",
    },
  },
};

export const TimeSelectionFocus = Template.bind({});
TimeSelectionFocus.args = {
  value: new Date(2024, 11, 25, 9, 0),
  useModal: false,
  showClear: true,
};
TimeSelectionFocus.parameters = {
  docs: {
    description: {
      story:
        "Focus on time selection functionality. Click the time button to open the time picker modal with hour and minute wheels.",
    },
  },
};

export const EmptyState = (args) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <p className="mb-2 text-sm text-neutral-600">No date selected</p>
        <p className="text-lg font-semibold text-neutral-900">
          {selectedDate
            ? selectedDate.toLocaleString("id-ID")
            : "Please select a date"}
        </p>
      </div>

      <div className="flex justify-center">
        <DateTimePickerResponsive
          {...args}
          value={selectedDate}
          onChange={handleChange}
        >
          <Button variant="muatparts-primary">
            {selectedDate ? "Change Date & Time" : "Select Date & Time"}
          </Button>
        </DateTimePickerResponsive>
      </div>
    </div>
  );
};

EmptyState.args = {
  useModal: false,
  showClear: true,
};
EmptyState.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the component behavior when no date is initially selected.",
    },
  },
};
