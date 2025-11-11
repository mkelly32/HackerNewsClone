import { FC } from "react";
import { styled } from "styled-components";

const Hostname = styled.div`
  height: 1.2rem;
  font-size: 1rem;
  font-color: var(--secondary-light);
`;

type Props = { url: string };

export const Domain: FC<Props> = ({ url }) => {
  let domain = "";
  try {
    const hostName = new URL(url).hostname;
    domain = hostName;
  } catch (error) {
    domain = "";
  }
  return <Hostname>{domain}</Hostname>;
};
