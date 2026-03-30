import {
  DataProvider,
  GetListParams,
  BaseRecord,
  GetListResponse,
} from "@refinedev/core";
import type { Subject } from "../types";

const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description:
      "Foundational concepts in computing including algorithms, data structures, and problem-solving techniques.",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "MATH",
    description:
      "Continuation of Calculus I covering integral calculus, sequences, series, and applications.",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    code: "ENG110",
    name: "Academic Writing",
    department: "ENGLISH",
    description:
      "Develops students' ability to construct clear, well-argued essays and research papers for an academic audience.",
    createdAt: "2024-01-15",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }

    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },
  getOne: async () => {
    throw new Error("This function is no present in mock data");
  },
  create: async () => {
    throw new Error("This function is no present in mock data");
  },
  update: async () => {
    throw new Error("This function is no present in mock data");
  },
  deleteOne: async () => {
    throw new Error("This function is no present in mock data");
  },
  getApiUrl: () => "",
};
