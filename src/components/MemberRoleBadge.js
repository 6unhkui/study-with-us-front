import React from "react";
import styled from "styled-components";

const MemberRoleBadge = ({role}) => {
    return (
        <RoleBadge role={role}>{role}</RoleBadge>
    )
}

export default MemberRoleBadge;

const RoleBadge = styled.span`
  margin-left: 6px;
  background-color: ${(props) => props.role === 'MANAGER'? "var(--primary-color)" : "var(--bg-gray)"};
  color: ${(props) => props.role === 'MANAGER' ? "#fff" : "var(--font-color-gray)"};
  font-size: .6rem;
  padding: 2px 4px;
  border-radius: 3px;
  position: relative;
  bottom: 1px;
`

