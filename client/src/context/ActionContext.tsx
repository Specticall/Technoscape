import { ReactNode, createContext, useContext, useState } from "react";

export const actions = [
  {
    title: "Respond",
    description:
      "Create a response based on the text with the specified style of speech",
  },
  {
    title: "Translate",
    description: "Translate the message from to the specified language",
    dialog: {
      name: "action-language",
      display: "Change language",
    },
  },
  {
    title: "Summarize",
    description: "Summarize the message into short bullet points",
  },
] as const;

export type Actions = (typeof actions)[number]["title"];

type TActionContextValues = {
  selectedAction: string;
  handleChangeAction: (newAction: Actions) => void;
  handleChangeLanguage: (newLanguage: string) => void;
  language: string;
};

const ActionContext = createContext<TActionContextValues | null>(null);

export function ActionProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("Indonesian");

  const processAction = (newAction: Actions, newValues?: string) => {
    switch (newAction) {
      case "Translate":
        return `${newAction} ${newValues || language}`;
    }

    return newAction;
  };

  const [selectedAction, setSelectedAction] = useState<string>(
    processAction("Respond")
  );

  const handleChangeAction = (newAction: Actions) => {
    setSelectedAction(processAction(newAction));
  };

  const handleChangeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setSelectedAction(processAction("Translate", newLanguage));
  };

  return (
    <ActionContext.Provider
      value={{
        selectedAction,
        language,
        handleChangeLanguage,
        handleChangeAction,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
}

export function useAction() {
  const context = useContext(ActionContext);
  if (!context)
    throw new Error("useAction must be used inside of it's Provider's scope");
  return context;
}
