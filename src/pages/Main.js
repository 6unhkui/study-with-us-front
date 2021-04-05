import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POPULAR_ROOMS_REQUEST, LOAD_RECENTLY_CREATED_ROOMS_REQUEST } from "store/modules/room";
import CategorySlide from "containers/CategorySlide";
import Card from "components/RoomCard";
import { Divider, List, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BannerSlide, StartNowBanner } from "containers/Main";
import Pagination from "utils/pagination";
import SEO from "components/SEO";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const initPagination = new Pagination(1, 3, "ASC");
Object.freeze(initPagination);

const Main = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { popularRooms, recentlyCreatedRooms } = useSelector(state => state.room);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch({
            type: LOAD_POPULAR_ROOMS_REQUEST,
            pagination: initPagination,
            orderType: "JOIN_COUNT"
        });

        dispatch({
            type: LOAD_RECENTLY_CREATED_ROOMS_REQUEST,
            pagination: initPagination,
            orderType: "CREATED_DATE"
        });
    }, [dispatch]);

    const recommendRooms = [
        { title: t("main.popularRooms"), data: popularRooms },
        { title: t("main.recentlyCreatedRooms"), data: recentlyCreatedRooms }
    ];

    const handleChangeSearchValue = useCallback(e => {
        setSearchValue(e.target.value);
    }, []);

    const handleSearch = () => {
        if (searchValue.trim().length === 0) return;
        history.push({
            pathname: "/search",
            search: `?keyword=${searchValue}`
        });
    };

    return (
        <>
            <SEO />
            <BannerSlide />
            <div className="container" style={{ marginTop: "3rem" }}>
                <SearchWrap>
                    <input
                        type="text"
                        placeholder={t("main.searchInput")}
                        onChange={handleChangeSearchValue}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <SearchOutlined className="ico-search" onClick={handleSearch} />
                </SearchWrap>

                <CategorySlide />

                <Divider />
                {recommendRooms.map((section, i) => (
                    <div style={{ marginTop: "4rem" }} key={i}>
                        <Title level={3} style={{ marginBottom: "1rem" }}>
                            {section.title}
                        </Title>
                        <List
                            grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, column: 3 }}
                            dataSource={section.data}
                            renderItem={item => (
                                <List.Item key={item.roomId}>
                                    <Card {...item} />
                                </List.Item>
                            )}
                        />
                    </div>
                ))}
            </div>

            <StartNowBanner />
        </>
    );
};

export default Main;

const SearchWrap = styled.div`
    margin-top: 3rem;
    border: 1px solid var(--border-gray);
    overflow: hidden;
    height: 3.4rem;
    margin: 0 auto 1rem auto;
    padding: 0.4rem 0.6rem;
    border-radius: 30px;
    display: flex;

    ${breakpoint("mobile")`
        width: 100%;
    `}

    ${breakpoint("tablet")`
        width: 40%;
    `}

    input {
        font-size: 1.4rem;
        border: 0 none;
        background-color: transparent;
        width: calc(100% - 3rem);
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        position: relative;
        flex: none;
        margin-left: 0.4rem;

        &::placeholder {
            color: var(--font-color-gray);
            opacity: 0.3;
        }
    }

    .ico-search {
        margin-left: auto;
        color: #fff;
        width: 35px;
        height: 35px;
        font-size: 1rem;
        background: var(--primary-color);
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 5px 10px 0 rgba(78, 78, 78, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.06);
        cursor: pointer;

        &:hover {
            transition: all 0.5s;
            box-shadow: none;
            opacity: 0.6;
        }
    }
`;
