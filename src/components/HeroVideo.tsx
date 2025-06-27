import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  position: relative;
  overflow: hidden;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    transform: translate(-50%, -50%);
    object-fit: cover;
    object-position: center center;
  }

  @media (max-width: 768px) {
    font-size: 1.5em;

    video {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      object-position: center center;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 480px) {
    font-size: 1.2em;

    video {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      object-position: center center;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const HeroVideo: React.FC = () => {
  return (
    <VideoContainer>
      <video autoPlay loop muted playsInline>
        <source src="/coaching-web/hero_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};

export default HeroVideo;
