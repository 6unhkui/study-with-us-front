import { fetcher } from "@/utils/axiosUtils";
import { CategoryDTO } from "@/api/dto/category.dto";

export class CategoryAPI {
    public static getAll(): Promise<CategoryDTO[]> {
        return fetcher<CategoryDTO[]>({ url: "/api/v1/categories" });
    }
}
