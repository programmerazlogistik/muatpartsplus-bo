import React, { useState } from "react";

import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";

export default {
  title: "Components/Calendar/DateTimePickerWeb",
  component: DateTimePickerWeb,
  parameters: {
    docs: {
      description: {
        component:
          "A web-based date and time picker component with popover interface. Features integrated calendar and time selection wheels.",
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
    onCancel: {
      action: "cancelled",
      description: "Callback when date/time selection is cancelled",
    },
    minDate: {
      control: "object",
      description: "Minimum selectable date",
    },
    maxDate: {
      control: "object",
      description: "Maximum selectable date",
    },
    disabled: {
      control: "boolean",
      description: "Whether the picker is disabled",
      defaultValue: false,
    },
    status: {
      control: "select",
      options: ["error", "success"],
      description: "Status state for styling",
    },
    dateFormat: {
      control: "text",
      description: "Date format string",
      defaultValue: "dd MMM yyyy, HH:mm",
    },
    showTime: {
      control: "boolean",
      description: "Whether to show time selection",
      defaultValue: true,
    },
    showSeconds: {
      control: "boolean",
      description: "Whether to show seconds in time selection",
      defaultValue: false,
    },
    timeStep: {
      control: "number",
      description: "Step interval for time selection",
      defaultValue: 1,
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
      <DateTimePickerWeb
        {...args}
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  showTime: true,
  dateFormat: "dd MMM yyyy, HH:mm",
};
Default.parameters = {
  docs: {
    description: {
      story:
        "Default DateTimePickerWeb with current date and time. Click the input field to open the popover with calendar and time selection.",
    },
  },
};

export const WithInitialDate = Template.bind({});
WithInitialDate.args = {
  value: new Date(2024, 5, 15, 14, 30),
  showTime: true,
};
WithInitialDate.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb with pre-set date and time (June 15, 2024 at 2:30 PM).",
    },
  },
};

export const DateOnly = Template.bind({});
DateOnly.args = {
  value: new Date(),
  showTime: false,
  dateFormat: "dd MMM yyyy",
};
DateOnly.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb in date-only mode. Time selection is hidden and only calendar is shown.",
    },
  },
};

export const WithDateRange = Template.bind({});
WithDateRange.args = {
  value: new Date(),
  minDate: new Date(2024, 0, 1),
  maxDate: new Date(2024, 11, 31),
  showTime: true,
};
WithDateRange.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb with restricted date range. Only dates between January 1, 2024 and December 31, 2024 can be selected.",
    },
  },
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  value: new Date(),
  status: "error",
  showTime: true,
};
ErrorState.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb in error state. The component displays with error styling (red border).",
    },
  },
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  value: new Date(),
  status: "success",
  showTime: true,
};
SuccessState.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb in success state. The component displays with success styling (green border).",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: new Date(),
  disabled: true,
  showTime: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story:
        "Disabled DateTimePickerWeb component. The input field is disabled and cannot be interacted with.",
    },
  },
};

export const CustomDateFormat = Template.bind({});
CustomDateFormat.args = {
  value: new Date(),
  dateFormat: "yyyy-MM-dd HH:mm:ss",
  showTime: true,
};
CustomDateFormat.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb with custom date format. The displayed date format is changed to ISO-like format.",
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

  const handleCancel = (date) => {
    setLastAction(
      `Date selection cancelled. Current value: ${date.toLocaleString("id-ID")}`
    );
  };

  return (
    <div className="mx-auto max-w-md space-y-4 p-4">
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

      <DateTimePickerWeb
        {...args}
        value={selectedDate}
        onChange={handleChange}
        onApply={handleApply}
        onCancel={handleCancel}
      />
    </div>
  );
};

InteractiveDemo.args = {
  showTime: true,
  dateFormat: "dd MMM yyyy, HH:mm",
};
InteractiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Interactive demo showing the component's behavior with real-time feedback on date changes, apply, and cancel actions.",
    },
  },
};

export const FormIntegration = (args) => {
  const [formData, setFormData] = useState({
    appointmentDate: new Date(),
    name: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, appointmentDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Appointment Date & Time
          </label>
          <DateTimePickerWeb
            {...args}
            value={formData.appointmentDate}
            onChange={handleDateChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Schedule Appointment
        </button>

        {isSubmitted && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-sm text-green-800">
              Appointment scheduled for{" "}
              {formData.appointmentDate.toLocaleString("id-ID")}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

FormIntegration.args = {
  showTime: true,
  dateFormat: "dd MMM yyyy, HH:mm",
};
FormIntegration.parameters = {
  docs: {
    description: {
      story:
        "Integration example showing how DateTimePickerWeb works in a form context with other form elements.",
    },
  },
};

export const MultiplePickers = (args) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="mx-auto max-w-lg space-y-6 p-4">
      <h3 className="text-center text-lg font-semibold text-neutral-900">
        Date Range Selection
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Start Date
          </label>
          <DateTimePickerWeb
            {...args}
            value={startDate}
            onChange={setStartDate}
            maxDate={endDate}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            End Date
          </label>
          <DateTimePickerWeb
            {...args}
            value={endDate}
            onChange={setEndDate}
            minDate={startDate}
          />
        </div>
      </div>

      <div className="rounded-lg bg-neutral-50 p-4 text-center">
        <p className="mb-1 text-sm text-neutral-600">Selected Range:</p>
        <p className="font-medium text-neutral-900">
          {startDate.toLocaleDateString("id-ID")} -{" "}
          {endDate.toLocaleDateString("id-ID")}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
        </p>
      </div>
    </div>
  );
};

MultiplePickers.args = {
  showTime: false,
  dateFormat: "dd MMM yyyy",
};
MultiplePickers.parameters = {
  docs: {
    description: {
      story:
        "Example showing two DateTimePickerWeb components working together for date range selection with mutual constraints.",
    },
  },
};

export const LocalizationDemo = Template.bind({});
LocalizationDemo.args = {
  value: new Date(),
  dateFormat: "dd MMMM yyyy, HH:mm",
  showTime: true,
};
LocalizationDemo.parameters = {
  docs: {
    description: {
      story:
        "DateTimePickerWeb with Indonesian localization. The component displays dates and times in Indonesian format.",
    },
  },
};

export const TimePickerFocus = Template.bind({});
TimePickerFocus.args = {
  value: new Date(2024, 11, 25, 9, 0),
  showTime: true,
  dateFormat: "HH:mm - dd MMM yyyy",
};
TimePickerFocus.parameters = {
  docs: {
    description: {
      story:
        "Focus on time selection functionality. The component highlights the time picker wheels with smooth scrolling and infinite loop.",
    },
  },
};

export const ResponsiveDemo = (args) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mx-auto max-w-xs p-4">
      <DateTimePickerWeb
        {...args}
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </div>
  );
};

ResponsiveDemo.args = {
  showTime: true,
  dateFormat: "dd MMM yyyy, HH:mm",
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Responsive behavior demonstration. The popover adapts to different screen sizes.",
    },
  },
  viewport: {
    defaultViewport: "mobile1",
  },
};
