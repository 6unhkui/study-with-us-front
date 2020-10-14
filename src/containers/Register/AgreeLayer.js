import React from 'react';
import styled from 'styled-components';
import LayerPopup from 'components/LayerPopup';

export default function AgreeLayer(props) {
    return (
        <LayerPopup title="이용 약관" setLayerOpen={props.setLayerOpen}>
             <Section>
                <h2>제1조 (목 적)</h2>
                <span>
                    이 약관은 [study with us]에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어
                    study with us와 이용자의 권리/의무 및 책임사항을 규정함을 목적으로 합니다.
                </span>
            </Section>
            <Section>
                <h2>제2조 (용어정의)</h2>
                <span>
                    ① "study with us" : 비대면 스터디 모임 플랫폼입니다. <br/>

                    ② '메이트'란 "study with us"에 개인정보를 제공하여 회원등록을 한 자로서, 스터디방에 참여할 권한을 가진 사용자를 의미합니다.<br/>

                    ③ "매니저'란 스터디 방을 만들고, 해당 스터디 방 및 참여한 메이드를 관리할 수 있는 권한을 의미합니다.
                </span>
            </Section>
        </LayerPopup>
    )
}

const Section = styled.div`
    &:not(:first-child){
        margin-top: 2rem;
    }
` 