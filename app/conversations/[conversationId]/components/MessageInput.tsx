"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        className="
                text-black
                font-light
                py-2
                px-2
                bg-neutral-100
                w-full
                rounded-full
                focus:outline-none
              "
      />
    </div>
  );
};

export default MessageInput;
