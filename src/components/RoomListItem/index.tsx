import React from "react";
import { Link } from "react-router-dom";
import Divider from "@/components/Divider";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "@/components/Avatar";
import makeFileUrl from "@/utils/makeFileUrl";
import { RoomDTO } from "@/api/dto/room.dto";
import Badge from "@/components/Badge";
import styles from "./RoomListItem.module.less";

export interface RoomListItemProps extends RoomDTO {}

const RoomListItem: React.FC<RoomListItemProps> = ({
    roomId,
    category,
    coverImage,
    name,
    description,
    manager: { name: managerName, profileImg: manangerProfileImage },
    joinCount,
    maxCount
}) => {
    return (
        <article className={styles.container}>
            <Link to={`room/${roomId}`}>
                <div className={styles.categoryBadge}>
                    <Badge>{category}</Badge>
                </div>
                <div className={styles.coverImage}>
                    <img src={makeFileUrl(coverImage, "COVER")} alt={`${name} cover`} width={585} height={180} />
                </div>

                <div className={styles.content}>
                    <div>
                        <h3 className={styles.name}>{name}</h3>
                        {description && <p className={styles.description}>{description}</p>}
                    </div>

                    <Divider />

                    <div className={styles.memberArea}>
                        <span>
                            <Avatar name={managerName} profileImage={manangerProfileImage} size={22} />
                            <span className={styles.managerName}>{managerName}</span>
                        </span>
                        <span className={styles.memberCountWrapper}>
                            <UserOutlined />
                            <span className={styles.memberCount}>
                                {joinCount}
                                {maxCount !== 0 ? `/${maxCount}` : null}
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default React.memo(RoomListItem);
