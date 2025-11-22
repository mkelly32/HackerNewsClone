import { FC } from "react";
import { styled } from "styled-components";
import { usePageContext } from "../../providers/page-context";

const Banner = styled.header`
  display: flex;
  align-items: center;

  height: 1.5rem;
`;
const Left = styled.div`
  display: flex;
  min-width: 220px;
`;
const Center = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  height: 100%:

  margin: auto;
  font-size: 1rem;
`;
const Right = styled.div`
  display: flex;
  height: 100%:
  flex-basis: 1;
  min-width: 220px;
  justify-content: flex-end;
`;
const Title = styled.h1`
  font-size: 1rem;
  margin: auto 20px;
`;
const SpecialText = styled.span`
  margin-left: 10px;
  style: italic;
`;
const Icon = styled.button`
  height: 1.5rem;
  background: none;
  margin: 0;
  padding: 0;
  border: none;

  img {
    object-fit: cover;
    height: 100%;
    width: auto;
  }
`;

const Login = styled.button`
  height: 100%;

  padding: 0px 10px;
  margin: 0;

  background: none;
  border: none;

  font-size: 1rem;
`;
const Filter = styled.button`
  padding: 0px;
  margin: auto 20px;

  background: none;
  border: none;

  font-size: 1rem;
`;

const iconSrc = "https://news.ycombinator.com/y18.svg";

type Props = {};

export const Header: FC<Props> = ({}) => {
  const { selectFilter } = usePageContext();

  const selectTop = () => selectFilter("top");
  const selectBest = () => selectFilter("best");
  const selectNew = () => selectFilter("new");
  const selectPast = () => selectFilter("past");
  const selectAsk = () => selectFilter("ask");
  const selectShow = () => selectFilter("show");
  const selectJobs = () => selectFilter("jobs");

  return (
    <Banner>
      <Left>
        <Icon onClick={selectTop}>
          <img src={iconSrc} />
        </Icon>
        <Title>Hacker News {<SpecialText>(Clone)</SpecialText>}</Title>
      </Left>
      <Center>
        <Filter onClick={selectTop}>Top</Filter>
        <Filter onClick={selectNew}>New</Filter>
        <Filter onClick={selectPast}>Past</Filter>
        <Filter onClick={selectBest}>Best</Filter>
        <Filter onClick={selectAsk}>Ask</Filter>
        <Filter onClick={selectShow}>Show</Filter>
        <Filter onClick={selectJobs}>Jobs</Filter>
      </Center>
      <Right>
        <Login>Login</Login>
      </Right>
    </Banner>
  );
};
