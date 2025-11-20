import { useEffect, useState } from "react";

export const useResponsiveViewMode = () => {
  const getViewMode = () => {
    if (typeof window === "undefined") return "table";
    return window.innerWidth < 768 ? "grid" : "table";
  };

  const [viewMode, setViewMode] = useState<"table" | "grid">(getViewMode);

  useEffect(() => {
    const handleResize = () => {
      const newMode = getViewMode();
      setViewMode((current) => (current === newMode ? current : newMode));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [viewMode, setViewMode] as const;
};
