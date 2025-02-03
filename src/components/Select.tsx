import { useEffect, useRef, useState } from 'react';

import { Language } from '@/store/language';
import styles from '@/styles/components/select.module.scss';

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
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 获取当前选中的选项标签
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div ref={selectRef} className={`${styles.select} ${className} `}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <svg className={`${styles.arrow} ${isOpen ? styles.open : ''}`} viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox" tabIndex={-1}>
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
