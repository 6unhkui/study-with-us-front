import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "components/Avatar";
import loadFile from "utils/loadFile";

const { Paragraph } = Typography;

const RoomCard = ({ roomId, category, coverImage, name, description, manager, joinCount, maxCount }) => (
    <Link to={`/room/${roomId}`}>
        <CardWrap>
            <Badge>{category}</Badge>
            <Card
                className="light-primary-border"
                cover={
                    <div className="cover">
                        <img alt="cover" src={loadFile(coverImage, "cover")} />
                    </div>
                }
            >
                <CardMetaWrap>
                    <div className="main">
                        <div className="name">
                            <Paragraph ellipsis>{name}</Paragraph>
                        </div>
                        <div className="description">
                            <Paragraph ellipsis>{description}</Paragraph>
                        </div>
                    </div>

                    <div className="meta-data">
                        <Divider />
                        <ManagerWrap>
                            {manager && <Avatar user={manager} size={22} style={{ fontSize: "11px" }} showName />}
                        </ManagerWrap>

                        <JoinCountWrap>
                            <UserOutlined />
                            <span className="join-count">{joinCount + (maxCount === 0 ? "" : `${`/${maxCount}`}`)}</span>
                        </JoinCountWrap>
                    </div>
                </CardMetaWrap>
            </Card>
        </CardWrap>
    </Link>
);

export default RoomCard;

RoomCard.propTypes = {
    roomId: PropTypes.number,
    category: PropTypes.string,
    coverImage: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    manager: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profileImg: PropTypes.string
    }),
    joinCount: PropTypes.number,
    maxCount: PropTypes.number
};

RoomCard.defaultProps = {
    roomId: 0,
    category: "",
    coverImage: "",
    name: "",
    description: "",
    manager: {
        name: "",
        profileImg: ""
    },
    joinCount: 0,
    maxCount: 0
};

const Badge = styled.span`
    position: absolute;
    z-index: 1;
    margin-left: 12px;
    margin-top: 12px;
    background-color: var(--primary-color);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 500;
`;

const CardWrap = styled.div`
    .ant-card {
        cursor: pointer;
    }

    .ant-card-bordered {
        border: 1px solid var(--border-gray);
    }

    .cover {
        height: 180px;
        object-fit: cover;
        width: calc(100% - 2px);
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px 6px 0 0;
            border-bottom: 1px solid var(--border-gray);
        }
    }

    .ant-card-body {
        padding: 1rem 1.2rem;
    }

    .main .name {
        font-size: 1rem;
        font-weight: 600;
    }
`;

const CardMetaWrap = styled.div`
    .main {
        height: 52px;
    }

    .description {
        div.ant-typography {
            color: var(--font-color-gray);
        }
    }

    .ant-typography-ellipsis-single-line {
        margin-bottom: 0;
    }

    .meta-data {
        font-size: 0.8rem;

        .ant-divider {
            margin: 10px 0;
        }
    }
`;

const ManagerWrap = styled.span``;

const JoinCountWrap = styled.span`
    float: right;
    position: relative;
    top: 8px;

    .join-count {
        margin-left: 0.2rem;
    }
`;
