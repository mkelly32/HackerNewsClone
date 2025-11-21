import { FC } from "react";
import { styled } from "styled-components";

const Banner = styled.header`
  display: flex;
  align-items: center;

  height: 1.5rem;
`;
const Icon = styled.div`
  height: 100%;

  img {
    object-fit: cover;
    height: 100%;
    width: auto;
  }
`;
const Title = styled.h1`
  font-size: 1rem;
  margin: 0 20px;
`;
const SpecialText = styled.span`
  style: italic;
`;

const iconSrc = "https://news.ycombinator.com/y18.svg";

type Props = {};

export const Header: FC<Props> = ({}) => {
  return (
    <Banner>
      <Icon>
        <img src={iconSrc} />
      </Icon>
      <Title>Hacker News {<SpecialText>Clone</SpecialText>}</Title>
      Hello
    </Banner>
  );
};
