import { useCategoryListFetch } from "@/hooks/useRedux";
import { Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useEffect } from "react";
import Loading from "@/components/Loading";

interface CategorySelectorProps {
    value?: number;
    onChange?: (value: number) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
    const { data: categoryList, fetch: fetchCategory } = useCategoryListFetch();

    useEffect(() => {
        if (!categoryList) {
            fetchCategory();
        }
    }, [categoryList, fetchCategory]);

    const onChangeCategory = useCallback(
        ({ target: { value: newValue } }: RadioChangeEvent) => {
            onChange?.(newValue);
        },
        [onChange]
    );

    if (!categoryList) return <Loading type="component" />;

    return (
        <Radio.Group buttonStyle="solid" value={value || categoryList[0].categoryId}>
            {categoryList.map(({ categoryId, name }) => (
                <Radio.Button key={categoryId} value={categoryId} onChange={onChangeCategory}>
                    {name}
                </Radio.Button>
            ))}
            ;
        </Radio.Group>
    );
};

export default CategorySelector;
