// import { Button, Title } from "@mantine/core";
// import { Link } from "@tanstack/react-router";
import styled from 'styled-components';
// import { MdChevronRight } from "react-icons/md";
// import { JSONCrackLogo } from "src/layout/JsonCrackLogo";

const StyledPremiumView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.BACKGROUND_TERTIARY};
  overflow: hidden;

  img {
    filter: drop-shadow(2px 2px 1px black);
  }

  .glowing {
    position: relative;
    min-width: 700px;
    height: 550px;
    margin: -150px;
    transform-origin: right;
    animation: colorChange 5s linear infinite;
  }

  .glowing:nth-child(even) {
    transform-origin: left;
  }

  @keyframes colorChange {
    0% {
      filter: hue-rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .glowing span {
    --i: 1;
    position: absolute;
    top: calc(80px * var(--i));
    left: calc(80px * var(--i));
    bottom: calc(80px * var(--i));
    right: calc(80px * var(--i));
  }

  .glowing span::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -8px;
    width: 15px;
    height: 15px;
    background: #f00;
    border-radius: 50%;
  }

  .glowing span:nth-child(3n + 1)::before {
    background: rgba(134, 255, 0, 1);
    box-shadow: 0 0 20px rgba(134, 255, 0, 1), 0 0 40px rgba(134, 255, 0, 1),
      0 0 60px rgba(134, 255, 0, 1), 0 0 80px rgba(134, 255, 0, 1),
      0 0 0 8px rgba(134, 255, 0, 0.1);
  }

  .glowing span:nth-child(3n + 2)::before {
    background: rgba(255, 214, 0, 1);
    box-shadow: 0 0 20px rgba(255, 214, 0, 1), 0 0 40px rgba(255, 214, 0, 1),
      0 0 60px rgba(255, 214, 0, 1), 0 0 80px rgba(255, 214, 0, 1),
      0 0 0 8px rgba(255, 214, 0, 0.1);
  }

  .glowing span:nth-child(3n + 3)::before {
    background: rgba(0, 226, 255, 1);
    box-shadow: 0 0 20px rgba(0, 226, 255, 1), 0 0 40px rgba(0, 226, 255, 1),
      0 0 60px rgba(0, 226, 255, 1), 0 0 80px rgba(0, 226, 255, 1),
      0 0 0 8px rgba(0, 226, 255, 0.1);
  }

  .glowing span:nth-child(3n + 1) {
    animation: animate 10s alternate infinite;
  }

  .glowing span:nth-child(3n + 2) {
    animation: animate-reverse 3s alternate infinite;
  }

  .glowing span:nth-child(3n + 3) {
    animation: animate 8s alternate infinite;
  }

  @keyframes animate {
    0% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate-reverse {
    0% {
      transform: rotate(360deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
`;

const StyledInfo = styled.p`
  width: 60%;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
`;

const StyledContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const PremiumView = () => (
  <StyledPremiumView>
    <StyledContent>
      {/* <Title mb="lg" style={{ pointerEvents: "none" }}>
        <JSONCrackLogo fontSize="4rem" />
      </Title> */}
      <StyledInfo>
        Free version is not optimized to handle data of this size. Try the
        premium version for more features and capabilities.
      </StyledInfo>

      {/* <Button
        component={Link}
        prefetch={false}
        href="/pricing"
        mt="lg"
        size="lg"
        fw="bolder"
        color="green"
        radius="xl"
        target="_blank"
        rightSection={<MdChevronRight size="24" />}
      >
        Start 3 Days Free Trial
      </Button> */}
    </StyledContent>

    <div className="glowing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </StyledPremiumView>
);