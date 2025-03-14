import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// Theme Store
const useThemeStore = create(
    devtools(
        persist(
            (set) => ({
                theme: "light",
                setTheme: (mode) => set({ theme: mode }, false, "setTheme"),
            }),
            {
                name: "theme",
                storage: createJSONStorage(() => localStorage),
            }
        ),
        { name: "userTheme" }
    )
);

// Sheet Store
const useSheetStore = create(
    devtools(
        persist(
            (set) => ({
                sheet: null,
                setSheet: (sheetData) => set({ sheet: sheetData }, false, "setSheet"),
            }),
            {
                name: "sheet",
                storage: createJSONStorage(() => localStorage),
            }
        ),
        { name: "sheetStore" }
    )
);

export { useThemeStore, useSheetStore };
