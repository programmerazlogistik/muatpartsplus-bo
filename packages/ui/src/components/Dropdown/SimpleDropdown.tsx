/**
 * SimpleDropdown Component
 * A simplified dropdown component built on SimpleDropdownMenu
 */

import React from 'react';
import {
  SimpleDropdownTrigger,
  SimpleDropdownContent,
  SimpleDropdownItem,
} from './SimpleDropdownMenu';

export interface SimpleDropdownProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Dropdown items */
  items: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  /** Additional classes */
  className?: string;
}

const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  trigger,
  items,
  className,
}) => {
  return (
    <div className={className}>
      <SimpleDropdownTrigger asChild>
        {trigger}
      </SimpleDropdownTrigger>
      <SimpleDropdownContent>
        {items.map((item) => (
          <SimpleDropdownItem
            key={item.id}
            onClick={item.onClick}
          >
            {item.label}
          </SimpleDropdownItem>
        ))}
      </SimpleDropdownContent>
    </div>
  );
};

export default SimpleDropdown;