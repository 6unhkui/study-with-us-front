import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import bp, { breakpointMap } from "@/utils/breakpoints";
import BannerImage01 from "@/images/banner01.png";
import BannerImage02 from "@/images/banner02.png";
import BannerImage01mo from "@/images/banner01mo.png";
import BannerImage02mo from "@/images/banner02mo.png";
import { useTranslation } from "react-i18next";

interface ImageItem {
    name: string;
    src: Array<string>;
    bgColor: string;
    text: {
        label: string;
        title: string;
        subTitle: string;
    };
}

const imageItems: ImageItem[] = [
    {
        name: "Main Banner01",
        src: [BannerImage01, BannerImage01mo],
        bgColor: "#fffcf2",
        text: {
            label: "main.mainBanner.1.label",
            title: "main.mainBanner.1.title",
            subTitle: "main.mainBanner.1.subTitle"
        }
    },
    {
        name: "Main Banner02",
        src: [BannerImage02, BannerImage02mo],
        bgColor: "#fffaf5",
        text: {
            label: "main.mainBanner.2.label",
            title: "main.mainBanner.2.title",
            subTitle: "main.mainBanner.2.subTitle"
        }
    }
];

interface MainBannerProps {}

const MainBanner: React.FC<MainBannerProps> = () => {
    const { t } = useTranslation();
    return (
        <Carousel autoplay autoplaySpeed={5000}>
            {imageItems.map(({ name, src, bgColor, text: { label, title, subTitle } }) => (
                <BannerImage key={name} bgcolor={bgColor} images={src}>
                    <TextWrapper>
                        <div className="textContainer">
                            <span className="label">{t(label)}</span>
                            <h1 className="title">{t(title)}</h1>
                            <span className="subTitle">{t(subTitle)}</span>
                        </div>
                    </TextWrapper>
                    <img src={src[0]} alt={name} />
                </BannerImage>
            ))}
        </Carousel>
    );
};

export default React.memo(MainBanner);

const BannerImage = styled.div<{ bgcolor: string; images: string[] }>`
    background: ${({ bgcolor }) => bgcolor};

    img {
        margin: 0 auto;
        object-fit: cover;
        width: auto;
        max-width: 100%;

        content: url(${({ images }) => images[1]});

        ${({ images }) => {
            return bp("tablet")`
                content: url(${images[0]})
            `;
        }}
    }
`;

const TextWrapper = styled.div`
    width: ${breakpointMap.desktop}px;
    margin: 0 auto;
    height: 100%;
    white-space: pre-line;

    .textContainer {
        position: absolute;
        height: 50%;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        ${bp("tablet")`
            text-align: left;
            height: 100%;
            margin-left: 40px;
        `}

        ${bp("desktop")`
            margin-left: 100px;
        `}
    }

    .label {
        font-size: 3vw;

        ${bp("tablet")`
            font-size: 1.8vw;
        `}

        ${bp("desktop")`
            font-size: 1rem;
        `}
    }

    .title {
        font-weight: 500;
        font-size: 5vw;
        line-height: 7vw;
        margin-top: 6px;

        ${bp("tablet")`
            font-size: 3.8vw;
            line-height: 4.8vw;
            margin-top: 10px;
        `}

        ${bp("desktop")`
            font-size: 2.4rem;
            line-height: 3.4rem;
            margin-top: 10px;
        `}
    }

    .subTitle {
        display: none;

        ${bp("tablet")`
            display: block;
            ont-size: 2vw;
            margin-top: 4px;
            opacity: 0.5;
        `}

        ${bp("desktop")`
            font-size: 1rem;
        `}
    }
`;
