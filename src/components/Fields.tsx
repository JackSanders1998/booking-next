import clsx from "clsx";
import type { ReactNode } from "react";

interface TextFieldProps {
  id: string;
  children?: ReactNode;
  label: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}

const formClasses =
  "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";

function Label({ id, children }: Pick<TextFieldProps, "id" | "children">) {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

export function TextField({
  id,
  label,
  type = "text",
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  name,
  autoComplete,
  className = "",
  required = false,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        {...props}
        className={clsx(formClasses, "pr-8")}
      />
    </div>
  );
}
