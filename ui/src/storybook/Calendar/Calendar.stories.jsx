import { Calendar, CalendarDayButton } from "@muatmuat/ui/Calendar";

export default {
  title: "Components/Calendar",
  component: Calendar,
  subcomponents: { CalendarDayButton },
  parameters: {
    docs: {
      description: {
        component:
          "A customizable calendar component for date selection built on react-day-picker with Indonesian locale support.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the calendar",
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
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "default"],
      description: "Variant for navigation buttons",
      defaultValue: "ghost",
    },
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Selection mode for the calendar",
    },
    selected: {
      control: "object",
      description: "Currently selected date(s)",
    },
    disabled: {
      control: "object",
      description: "Dates to disable",
    },
    modifiers: {
      control: "object",
      description: "Custom modifiers for styling specific dates",
    },
    onDayClick: {
      action: "dayClicked",
      description: "Callback when a day is clicked",
    },
    onSelect: {
      action: "selected",
      description: "Callback when selection changes",
    },
  },
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  showOutsideDays: true,
  captionLayout: "label",
};

export const SingleSelection = Template.bind({});
SingleSelection.args = {
  mode: "single",
  selected: new Date(),
  showOutsideDays: true,
};
SingleSelection.parameters = {
  docs: {
    description: {
      story:
        "Calendar with single date selection mode. Click on any date to select it.",
    },
  },
};

export const RangeSelection = Template.bind({});
RangeSelection.args = {
  mode: "range",
  selected: {
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  showOutsideDays: true,
};
RangeSelection.parameters = {
  docs: {
    description: {
      story:
        "Calendar with date range selection mode. Click on a start date, then click on an end date to select a range.",
    },
  },
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  mode: "multiple",
  selected: [new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)],
  showOutsideDays: true,
};
MultipleSelection.parameters = {
  docs: {
    description: {
      story:
        "Calendar with multiple date selection mode. Click on multiple dates to select them.",
    },
  },
};

export const WithDisabledDates = Template.bind({});
WithDisabledDates.args = {
  mode: "single",
  disabled: [
    new Date(),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    { before: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { after: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  ],
  showOutsideDays: true,
};
WithDisabledDates.parameters = {
  docs: {
    description: {
      story:
        "Calendar with disabled dates. Disabled dates cannot be selected and appear grayed out.",
    },
  },
};

export const WithCustomModifiers = Template.bind({});
WithCustomModifiers.args = {
  mode: "single",
  modifiers: {
    weekend: { dayOfWeek: [0, 6] },
    today: new Date(),
  },
  modifiersClassNames: {
    weekend: "bg-red-100 text-red-700",
    today: "border-2 border-blue-500",
  },
  showOutsideDays: true,
};
WithCustomModifiers.parameters = {
  docs: {
    description: {
      story:
        "Calendar with custom modifiers for styling specific dates (weekends and today).",
    },
  },
};

export const DropdownCaption = Template.bind({});
DropdownCaption.args = {
  captionLayout: "dropdown",
  showOutsideDays: true,
};
DropdownCaption.parameters = {
  docs: {
    description: {
      story:
        "Calendar with dropdown controls for month and year selection instead of labels.",
    },
  },
};

export const HideOutsideDays = Template.bind({});
HideOutsideDays.args = {
  showOutsideDays: false,
  captionLayout: "label",
};
HideOutsideDays.parameters = {
  docs: {
    description: {
      story:
        "Calendar with outside days hidden. Only days from the current month are shown.",
    },
  },
};

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  className: "border-2 border-blue-500 rounded-lg shadow-lg",
  showOutsideDays: true,
  classNames: {
    root: "bg-white",
    month_caption: "text-blue-600 font-bold",
    day: "hover:bg-blue-100",
    today: "bg-blue-200 font-bold",
    selected: "bg-blue-600 text-white",
  },
};
WithCustomStyling.parameters = {
  docs: {
    description: {
      story:
        "Calendar with custom styling applied through className and classNames props.",
    },
  },
};

export const Playground = Template.bind({});
Playground.args = {
  showOutsideDays: true,
  captionLayout: "label",
  mode: "single",
  className: "",
};
Playground.parameters = {
  docs: {
    description: {
      story:
        "Interactive playground to test different calendar configurations.",
    },
  },
};

export const WithFormatters = Template.bind({});
WithFormatters.args = {
  showOutsideDays: true,
  formatters: {
    formatCaption: (date, options) => {
      return `📅 ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
    },
    formatWeekdayName: (date, options) => {
      return date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();
    },
  },
};
WithFormatters.parameters = {
  docs: {
    description: {
      story: "Calendar with custom formatters for captions and weekday names.",
    },
  },
};

export const AccessibilityDemo = Template.bind({});
AccessibilityDemo.args = {
  showOutsideDays: true,
  mode: "single",
  "aria-label": "Date selection calendar",
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story:
        "Calendar demonstrating accessibility features including proper ARIA labels and keyboard navigation.",
    },
  },
};

export const LocalizedCalendar = Template.bind({});
LocalizedCalendar.args = {
  showOutsideDays: true,
  locale: "id-ID",
  formatters: {
    formatCaption: (date, options) => {
      return date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    },
    formatWeekdayName: (date, options) => {
      return date.toLocaleDateString("id-ID", { weekday: "short" });
    },
  },
};
LocalizedCalendar.parameters = {
  docs: {
    description: {
      story:
        "Calendar with Indonesian localization, demonstrating the component's internationalization capabilities.",
    },
  },
};
