import { Meta } from "@storybook/react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

import {
  SimpleHover,
  SimpleHoverContent,
  SimpleHoverItem,
  SimpleHoverTrigger,
} from "./SimpleHoverMenu";

const meta = {
  title: "Components/HoverMenu",
  component: SimpleHover,
  subcomponents: { SimpleHoverContent, SimpleHoverItem, SimpleHoverTrigger },
  parameters: {
    docs: {
      description: {
        component:
          "A hover-triggered dropdown menu component built on Radix UI primitives. Perfect for user menus, navigation items, and contextual actions.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    openDelay: {
      description: "Delay before opening the hover card (in milliseconds)",
      control: { type: "number" },
      defaultValue: 200,
    },
    closeDelay: {
      description: "Delay before closing the hover card (in milliseconds)",
      control: { type: "number" },
      defaultValue: 100,
    },
  },
};

export default meta;

// Interactive Storybook story with comprehensive controls
export const Playground = {
  args: {
    openDelay: 200,
    closeDelay: 100,
  },
  render: (args) => (
    <SimpleHover {...args}>
      <SimpleHoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-white transition-colors hover:bg-primary-800">
          <User size={16} />
          <span>Hover me</span>
          <ChevronDown size={16} />
        </button>
      </SimpleHoverTrigger>
      <SimpleHoverContent>
        <SimpleHoverItem onClick={() => console.log("Profile clicked")}>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Settings clicked")}>
          <div className="flex items-center gap-2">
            <Settings size={16} />
            <span>Settings</span>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Notifications clicked")}>
          <div className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notifications</span>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Messages clicked")}>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span>Messages</span>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Logout clicked")}>
          <div className="flex items-center gap-2 text-red-600">
            <LogOut size={16} />
            <span>Logout</span>
          </div>
        </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  ),
};

// User menu example
export const UserMenu = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-sm font-medium text-white">
              JD
            </div>
            <span className="text-sm font-medium">John Doe</span>
            <ChevronDown size={16} />
          </div>
        </SimpleHoverTrigger>
        <SimpleHoverContent>
          <SimpleHoverItem onClick={() => console.log("View profile")}>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>View Profile</span>
            </div>
          </SimpleHoverItem>
          <SimpleHoverItem onClick={() => console.log("Account settings")}>
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span>Account Settings</span>
            </div>
          </SimpleHoverItem>
          <SimpleHoverItem onClick={() => console.log("Switch account")}>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Switch Account</span>
            </div>
          </SimpleHoverItem>
          <hr className="my-1 border-neutral-300" />
          <SimpleHoverItem onClick={() => console.log("Sign out")}>
            <div className="flex items-center gap-2 text-red-600">
              <LogOut size={16} />
              <span>Sign Out</span>
            </div>
          </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>
    </div>
  ),
};

// Notification menu example
export const NotificationMenu = {
  render: () => (
    <SimpleHover>
      <SimpleHoverTrigger asChild>
        <button className="relative p-2 text-neutral-700 transition-colors hover:text-primary-700">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>
      </SimpleHoverTrigger>
      <SimpleHoverContent>
        <div className="border-b border-neutral-300 p-3">
          <p className="text-sm font-medium">Notifications</p>
        </div>
        <SimpleHoverItem onClick={() => console.log("New message")}>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium">New message from Sarah</p>
            <p className="text-xs text-neutral-600">2 minutes ago</p>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("Task completed")}>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium">Task completed</p>
            <p className="text-xs text-neutral-600">1 hour ago</p>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem onClick={() => console.log("System update")}>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium">System update available</p>
            <p className="text-xs text-neutral-600">3 hours ago</p>
          </div>
        </SimpleHoverItem>
        <hr className="my-1 border-neutral-300" />
        <SimpleHoverItem onClick={() => console.log("View all")}>
          <p className="text-xs font-medium text-primary-700">
            View all notifications
          </p>
        </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  ),
};

// Different positions and alignments
export const Positions = {
  render: () => (
    <div className="flex gap-8">
      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
            Bottom (default)
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent>
          <SimpleHoverItem>Item 1</SimpleHoverItem>
          <SimpleHoverItem>Item 2</SimpleHoverItem>
          <SimpleHoverItem>Item 3</SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-green-600 px-4 py-2 text-white">
            Top aligned
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent side="top">
          <SimpleHoverItem>Item 1</SimpleHoverItem>
          <SimpleHoverItem>Item 2</SimpleHoverItem>
          <SimpleHoverItem>Item 3</SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
            Right side
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent side="right">
          <SimpleHoverItem>Item 1</SimpleHoverItem>
          <SimpleHoverItem>Item 2</SimpleHoverItem>
          <SimpleHoverItem>Item 3</SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-orange-600 px-4 py-2 text-white">
            Center aligned
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent align="center">
          <SimpleHoverItem>Item 1</SimpleHoverItem>
          <SimpleHoverItem>Item 2</SimpleHoverItem>
          <SimpleHoverItem>Item 3</SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>
    </div>
  ),
};

// With custom styling
export const CustomStyling = {
  render: () => (
    <SimpleHover>
      <SimpleHoverTrigger asChild>
        <button className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl">
          Custom Styled Menu
        </button>
      </SimpleHoverTrigger>
      <SimpleHoverContent className="w-64 border-purple-200 bg-gradient-to-b from-purple-50 to-white shadow-lg">
        <div className="border-b border-purple-200 p-4">
          <p className="text-sm font-bold text-purple-800">Custom Header</p>
        </div>
        <SimpleHoverItem className="text-purple-700 hover:bg-purple-50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <User size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Profile</p>
              <p className="text-xs text-purple-500">Manage your account</p>
            </div>
          </div>
        </SimpleHoverItem>
        <SimpleHoverItem className="text-purple-700 hover:bg-purple-50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <Settings size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Settings</p>
              <p className="text-xs text-purple-500">Customize preferences</p>
            </div>
          </div>
        </SimpleHoverItem>
      </SimpleHoverContent>
    </SimpleHover>
  ),
};

// With delay customization
export const CustomDelays = {
  args: {
    openDelay: 500,
    closeDelay: 300,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-neutral-600">
        This menu has custom delays: 500ms to open, 300ms to close
      </p>
      <SimpleHover {...args}>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-white">
            Hover me (slow)
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent>
          <SimpleHoverItem>Item with delayed appearance</SimpleHoverItem>
          <SimpleHoverItem>Item 2</SimpleHoverItem>
          <SimpleHoverItem>Item 3</SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>
    </div>
  ),
};

// Action menu example
export const ActionMenu = {
  render: () => (
    <div className="flex gap-4">
      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-700">
            <Mail size={18} />
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent>
          <SimpleHoverItem onClick={() => console.log("Compose new")}>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>Compose New</span>
            </div>
          </SimpleHoverItem>
          <SimpleHoverItem onClick={() => console.log("Inbox")}>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>Inbox</span>
            </div>
          </SimpleHoverItem>
          <SimpleHoverItem onClick={() => console.log("Sent items")}>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>Sent Items</span>
            </div>
          </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>

      <SimpleHover>
        <SimpleHoverTrigger asChild>
          <button className="rounded-md p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-700">
            <MessageSquare size={18} />
          </button>
        </SimpleHoverTrigger>
        <SimpleHoverContent>
          <SimpleHoverItem onClick={() => console.log("New chat")}>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>New Chat</span>
            </div>
          </SimpleHoverItem>
          <SimpleHoverItem onClick={() => console.log("Recent chats")}>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Recent Chats</span>
            </div>
          </SimpleHoverItem>
        </SimpleHoverContent>
      </SimpleHover>
    </div>
  ),
};
