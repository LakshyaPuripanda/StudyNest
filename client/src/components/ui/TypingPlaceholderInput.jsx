import React from "react";
import { Input } from "@/components/ui/input";

function useTypingPlaceholder(
  text = "Search Courses",
  typingSpeed = 100
) {
  const [placeholder, setPlaceholder] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval); // stop when done
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed]);

  return placeholder;
}

export function TypingPlaceholderInput({
  text = "Search Courses",
  typingSpeed = 100,
  className = "",
  ...props
}) {
  const placeholder = useTypingPlaceholder(text, typingSpeed);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      className={
        className ||
        "flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      }
      {...props}
    />
  );
}
