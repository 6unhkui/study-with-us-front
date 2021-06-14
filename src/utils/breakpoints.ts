import { createBreakpoint } from "styled-components-breakpoint";

export const breakpointMap = {
    mobile: 480,
    tablet: 768,
    desktop: 1200
};

const bp = createBreakpoint(breakpointMap);

export default bp;
