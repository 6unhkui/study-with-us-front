import { AxiosError } from "axios";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { CategoryDTO } from "@/api/dto/category.dto";

// ---
// Action Type
const prefix = "category" as const;
export const GET_CATEGORY_LIST = createAsyncActionType(`${prefix}/GET_CATEGORY_LIST`);

// ---
// Action Creator
export const getCategoryListAsync = createActionEntity<any, CategoryDTO[], AxiosError>(GET_CATEGORY_LIST);
