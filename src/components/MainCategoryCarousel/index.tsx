import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import { useTypedSelector } from "@/store";
import { getCategoryListAsync } from "@/store/category";
import { breakpointMap } from "@/utils/breakpoints";
import { useHistory } from "react-router";
import styles from "./MainCategoryCarousel.module.less";

const responsive: ResponsiveType = {
    desktop: {
        breakpoint: { max: 3000, min: breakpointMap.desktop },
        items: 6
    },
    tablet: {
        breakpoint: { max: breakpointMap.desktop, min: breakpointMap.mobile },
        items: 3
    },
    mobile: {
        breakpoint: { max: breakpointMap.mobile, min: 0 },
        items: 1
    }
};

interface MainCategoryCarouselProps {}

const MainCategoryCarousel: React.FC<MainCategoryCarouselProps> = () => {
    const { data: categoryList } = useTypedSelector(state => state.category.categoryList);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!categoryList) dispatch(getCategoryListAsync.request(""));
    }, [categoryList, dispatch]);

    const onClick = useCallback(
        (id: number, name: string) => {
            history.push(`/search?id=${id}&name=${name}`);
        },
        [history]
    );

    return (
        <>
            {categoryList && categoryList?.length > 0 ? (
                <Carousel infinite autoPlay autoPlaySpeed={5000} responsive={responsive} arrows={false}>
                    {categoryList?.map(category => (
                        <span
                            className={styles.item}
                            key={category.name}
                            onClick={() => onClick(category.categoryId, category.name)}
                        >
                            {category.name}
                        </span>
                    ))}
                </Carousel>
            ) : null}
        </>
    );
};

export default React.memo(MainCategoryCarousel);
