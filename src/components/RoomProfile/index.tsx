import React from "react";
import Badge from "@/components/Badge";
import { RoomDetailDTO } from "@/api/dto/room.dto";
import Divider from "@/components/Divider";
import { EditOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import RoomJoinOrSettingsButton from "@/components/RoomJoinOrSettingsButton";
import styles from "./RoomProfile.module.less";
import Emoji from "../Emoji";

interface RoomProfileProps extends RoomDetailDTO {}

const RoomProfile: React.FC<RoomProfileProps> = ({
    roomId,
    category,
    name,
    description,
    manager,
    maxCount,
    joinCount,
    createDate,
    isMember
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.infoContainer}>
                <div className={styles.mainInfo}>
                    <div>
                        <span className={styles.category}>
                            <Badge>{category}</Badge>
                        </span>
                        <h1 className={styles.name}>{name}</h1>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <RoomJoinOrSettingsButton
                        isMember={isMember}
                        roomId={roomId}
                        name={name}
                        disabledToJoin={joinCount === maxCount}
                    />
                </div>

                <Divider />

                <dl className={styles.metadata}>
                    <span>
                        <dt>manager</dt>
                        <dd>
                            <Avatar name={manager.name} profileImage={manager.profileImg} />
                            <span className={styles.text}>{manager.name}</span>
                        </dd>
                    </span>
                    <span>
                        <dt>member</dt>
                        <dd>
                            <Emoji>🧑‍🎓</Emoji>
                            <span className={styles.text}>
                                {`${joinCount} `}
                                {maxCount !== 0 ? `/${maxCount} ` : null}
                                Member{joinCount > 1 ? "s" : null}
                            </span>
                        </dd>
                    </span>
                    <span>
                        <dt>created at</dt>
                        <dd>
                            <Emoji>🗓️</Emoji>
                            <span className={styles.text}>{createDate}</span>
                        </dd>
                    </span>
                </dl>
            </div>

            {isMember && (
                <nav role="navigation">
                    <Divider />
                    <div className={styles.navConatiner}>
                        <Link to={`/room/${roomId}/post/create`}>
                            <Emoji mr={8}>
                                <EditOutlined />
                            </Emoji>
                            게시글 작성
                        </Link>
                        <Divider type="vertical" />
                        <Link to={`/room/${roomId}/chatting`}>
                            <Emoji mr={8}>
                                <MessageOutlined />
                            </Emoji>
                            채팅
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default RoomProfile;
