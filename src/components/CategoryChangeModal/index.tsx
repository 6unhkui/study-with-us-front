import React, { useCallback, useEffect } from "react";
import Modal, { ModalProps } from "@/components/Modal";
import useRadio from "@/hooks/useRadio";
import { useCategoryListAsync } from "@/hooks/useRedux";
import { List, Radio } from "antd";
import EmptyList from "@/components/EmptyList";
import { CategoryDTO } from "@/api/dto/category.dto";
import { useDispatch } from "react-redux";
import { changeCategoryAsync } from "@/store/room";
import styles from "./CategoryChangeModal.module.less";

interface CategoryChangeModalProps extends ModalProps {
    roomId: number;
    defaultCategoryId: number;
}

const CategoryChangeModal: React.FC<CategoryChangeModalProps> = ({ roomId, defaultCategoryId, onClose, ...props }) => {
    const { data: categoryList, loading: loadingCategoryList, fetch: fetchCategoryList } = useCategoryListAsync();
    const { selected: selectedCategory, onChange: changeSelectedCategory } = useRadio(defaultCategoryId.toString());
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategoryList();
    }, [fetchCategoryList]);

    const onSubmit = useCallback(() => {
        const category = categoryList?.find(c => c.categoryId === +selectedCategory) as CategoryDTO;
        if (category) {
            dispatch(changeCategoryAsync.request({ roomId, categoryId: category.categoryId }));
            onClose();
        }
    }, [dispatch, categoryList, selectedCategory, roomId, onClose]);

    return (
        <Modal type="confirm" header="카테고리 변경" onClose={onClose} onOk={onSubmit} {...props}>
            <Radio.Group onChange={changeSelectedCategory} className={styles.container} defaultValue={+selectedCategory}>
                <List
                    dataSource={categoryList || []}
                    locale={{ emptyText: <EmptyList /> }}
                    loading={loadingCategoryList}
                    renderItem={item => (
                        <List.Item key={item.categoryId}>
                            <Radio value={item.categoryId}>
                                <div>{item.name}</div>
                            </Radio>
                        </List.Item>
                    )}
                />
            </Radio.Group>
        </Modal>
    );
};

export default CategoryChangeModal;
