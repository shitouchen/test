import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { Project } from "./list";
import React, { useEffect } from "react";
import { cleanObject } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
