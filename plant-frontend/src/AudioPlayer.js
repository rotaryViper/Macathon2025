import ReactPlayer from 'react-player/lazy';

const AudioPlayer = ({ url }) => {
  return (
    <div style={{width:"256px", margin: "0 auto"}}>
      <ReactPlayer
        url={url}
        playing={true}
        volume={1}
        width='256px'
        height='144px'
        controls={false}
      />
    </div>
  );
};

export default AudioPlayer;
