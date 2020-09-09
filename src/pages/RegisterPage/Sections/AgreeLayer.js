import React from 'react';
import styled from 'styled-components';
import LayerPopup from 'components/LayerPopup';

export default function AgreeLayer(props) {
    return (
        <LayerPopup title="이용 약관" setLayerOpen={props.setAgreeLayerOpen}>
             <Section>
                <h2>제1조 (목 적)</h2>
                <span>
                    이 약관은 (주)예스폼이 운영하는 http://www.yesform.com(이하 "예스폼"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어
                    예스폼과 이용자의 권리/의무 및 책임사항을 규정함을 목적으로 합니다.
                </span>
            </Section>
            <Section>
                <h2>제2조 (용어정의)</h2>
                <span>
                    ① "예스폼" : 문서/서식 및 관련 컨텐츠를 서비스를 목록으로 하는 서식/양식 전문 포탈 사이트입니다. <br/>

                    ② "이용자"란 "예스폼"에 접속하여 이 약관에 따라 "예스폼"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. <br/>

                    ③ "회원"이라 함은 "예스폼"에 개인정보를 제공하여 회원등록을 한 자로서, "예스폼"의 정보를 지속적으로 제공받으며, <br/>
                        "예스폼"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

                    ④ "비회원"이라 함은 회원에 가입하지 않고 "예스폼"이 제공하는 서비스를 이용하는 자를 말합니다.
                </span>
            </Section>

            <Section>
                <h2>제3조 (약관 등의 명시와 설명 및 개정)</h2>
                <span>
                    ① "예스폼"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 
                    전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 예스폼의 
                    초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.<br/>

                    ② "이용자"란 "예스폼"에 접속하여 이 약관에 따라 "예스폼"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. <br/>

                    ③ "회원"이라 함은 "예스폼"에 개인정보를 제공하여 회원등록을 한 자로서, "예스폼"의 정보를 지속적으로 제공받으며, <br/>
                        "예스폼"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

                    ④ "비회원"이라 함은 회원에 가입하지 않고 "예스폼"이 제공하는 서비스를 이용하는 자를 말합니다.
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