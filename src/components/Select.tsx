'use client';

import { SelectContent, SelectItem, SelectTrigger, Select as SelectUI, SelectValue } from '@/components/ui/select';

import { Language } from '@/store/language';

interface SelectProps {
  value: Language;
  options: {
    value: Language;
    label: string;
  }[];
  onChange: (value: Language) => void;
  className?: string;
}

const Select = ({ value, options, onChange, className }: SelectProps) => {
  return (
    <SelectUI value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
};

export default Select;
