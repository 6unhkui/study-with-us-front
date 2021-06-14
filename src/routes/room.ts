import PostsByRoom from "@/pages/PostsByRoom";
import MembersByRoom from "@/pages/MembersByRoom";
import AttendanceGraphByRoom from "@/pages/AttendanceGraphByRoom";
import AttendanceByRoom from "@/pages/AttendanceByRoom";
import { Route } from "./app";

const roomRoutes: Route[] = [
    { path: "/", component: AttendanceByRoom, exact: true },
    { path: "/attendanc/graph", component: AttendanceGraphByRoom },
    { path: "/posts", component: PostsByRoom },
    { path: "/members", component: MembersByRoom, exact: true }
];

export default roomRoutes;
