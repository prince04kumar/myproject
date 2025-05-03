import React, { createContext, useState, useContext ,ReactNode } from "react";

export const AssistantContext = createContext<any>(null);


export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [assistant, setAssistant] = useState(null);

  

  return (
    <AssistantContext.Provider value={{ assistant, setAssistant }}>
      {children}
    </AssistantContext.Provider>
  );
};