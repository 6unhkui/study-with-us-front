import roomRoutes from "@/routes/room";
import React from "react";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@/components/Header";
import Divider from "@/components/Divider";
import styles from "./RoomContentNavBar.module.less";

const menuItems: MenuItem[] = [
    { path: "", name: "출석", key: "room.nav.attendance", exact: true },
    { path: "/attendanc/graph", name: "출석 그래프", key: "room.nav.attendancegraph" },
    { path: "/posts", name: "게시글", key: "room.nav.posts" },
    { path: "/members", name: "멤버", key: "room.nav.members" }
];

interface RoomContentNavBarProps {
    url: string;
}

const RoomContentNavBar: React.FC<RoomContentNavBarProps> = ({ url }) => {
    return (
        <div className={styles.wrapper}>
            <nav>
                <ul className={styles.menuContainer}>
                    {menuItems.map(({ path, name, key, exact }) => (
                        <li key={key} className={styles.menuItem}>
                            <NavLink to={`${url}${path}`} activeClassName={styles.active} exact={exact}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <Divider />
        </div>
    );
};

export default RoomContentNavBar;
