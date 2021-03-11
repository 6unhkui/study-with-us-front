import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Badge = ({ text, type = "primary" }) => <BadgeWrap type={type}>{text}</BadgeWrap>;

Badge.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default Badge;

const BadgeWrap = styled.span`
    margin-left: 6px;
    background-color: ${props => (props.type === "primary" ? "var(--primary-color)" : "var(--bg-gray)")};
    color: ${props => (props.type === "primary" ? "#fff" : "var(--font-color-gray)")};
    font-size: 0.6rem;
    padding: 2px 4px;
    border-radius: 3px;
    position: relative;
    bottom: 1px;
`;
