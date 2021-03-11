import React from "react";

import { Result } from "antd";
import { MehOutlined } from "@ant-design/icons";

export default function AccessMemberOnly() {
    return (
        <Result
            icon={<MehOutlined />}
            title="가입한 메이트만 확인 할 수 있는 페이지입니다."
            subTitle={
                <>
                    [스터디방 가입하기] 버튼을 클릭하면,
                    <br />
                    스터디 메이트가 될 수 있습니다.
                </>
            }
        />
    );
}
