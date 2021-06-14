import React from "react";
import { Route } from "react-router";
import roomRoutes from "@/routes/room";

interface RoomRouterProps {
    path: string;
}

const RoomRouter: React.FC<RoomRouterProps> = ({ path: prefixPath }) => {
    return (
        <>
            {roomRoutes.map(({ path, ...props }) => (
                <Route key={path?.toString()} path={`${prefixPath}${path}`} {...props} />
            ))}
        </>
    );
};

export default RoomRouter;
