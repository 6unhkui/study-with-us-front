import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import RoomSortModal, { sortItems } from "@/components/RoomSortModal";
import { useTypedSelector } from "@/store";
import { useDispatch } from "react-redux";
import { getCategoryListAsync } from "@/store/category";
import { SearchRoomDTO, RoomSortBy } from "@/api/dto/room.dto";
import useModal from "@/hooks/useModal";
import styles from "./RoomFilters.module.less";

interface RoomFiltersProps {
    onSubmit: (v: SearchRoomDTO) => void;
    defaultValues?: SearchRoomDTO;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({ onSubmit, defaultValues }) => {
    const [condition, setCondition] = useState<SearchRoomDTO>({ sortBy: "NAME", categoryIds: [], keyword: "", ...defaultValues });
    const { visible, onClose, onOpen } = useModal();
    const { data: categoryList, loading: categoryListLoading } = useTypedSelector(state => state.category.categoryList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!categoryList) {
            dispatch(getCategoryListAsync.request(""));
        }
    }, [categoryList, dispatch]);

    const onFilterSubmit = useCallback(
        (key: keyof SearchRoomDTO, value: SearchRoomDTO[keyof SearchRoomDTO]) => {
            setCondition(state => ({ ...state, [key]: value }));
            onSubmit({ ...condition, [key]: value });
        },
        [condition, onSubmit]
    );

    const onSortChange = useCallback(
        (sortBy: RoomSortBy) => {
            onFilterSubmit("sortBy", sortBy);
        },
        [onFilterSubmit]
    );

    const onCategoryChange = useCallback(
        (categoryIds: Array<number>) => {
            onFilterSubmit("categoryIds", categoryIds);
        },
        [onFilterSubmit]
    );

    const onKeywordSubmit = useCallback(
        (input: string) => {
            onFilterSubmit("keyword", input);
        },
        [onFilterSubmit]
    );

    return (
        <div className={styles.container}>
            <RoomSortModal visible={visible} onClose={onClose} selected={condition.sortBy} onSubmit={onSortChange} />
            <Button onClick={onOpen}>
                {sortItems.find(item => item.key === condition.sortBy)?.name} <DownOutlined />
            </Button>

            <Select
                mode="multiple"
                allowClear
                placeholder="카테고리를 선택해주세요."
                showSearch={false}
                loading={categoryListLoading}
                onChange={onCategoryChange}
                className={styles.categorySelectBox}
                defaultValue={condition.categoryIds}
            >
                {categoryList?.map(category => (
                    <Select.Option key={category.categoryId.toString()} value={category.categoryId}>
                        {category.name}
                    </Select.Option>
                ))}
            </Select>

            <Input.Search
                enterButton="검색"
                placeholder="검색어를 입력하세요."
                onSearch={onKeywordSubmit}
                className={styles.searchInput}
                defaultValue={condition.keyword}
            />
        </div>
    );
};

export default React.memo(RoomFilters);
