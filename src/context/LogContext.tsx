import React, { createContext, useContext, useState } from 'react';
import { LogEntry } from '../types';

type LogContextType = {
  logs: LogEntry[];
  addLog: (entry: LogEntry) => void;
  clearLogs: () => void;
};

const LogContext = createContext<LogContextType>({
  logs: [],
  addLog: () => {},
  clearLogs: () => {},
});

export function LogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (entry: LogEntry) => {
    setLogs((prev) => [entry, ...prev]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogs() {
  return useContext(LogContext);
}
