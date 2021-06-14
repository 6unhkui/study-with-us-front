import { CategoryDTO } from "@/api/dto/category.dto";
import { ActionType } from "typesafe-actions";
import { getCategoryListAsync } from "./actions";

export type CategoryAction = ActionType<typeof getCategoryListAsync>;

export interface CategoryState {
    categoryList: {
        loading: boolean;
        error: Error | null;
        data: CategoryDTO[] | null;
    };
}
