import { cn } from 'drupal-canvas';

const Video = ({ video, className }) => {
  if (!video?.src) {
    return null;
  }

  return (
    <video
      className={cn('w-full rounded-box', className)}
      controls
      poster={video.poster}
    >
      <source src={video.src} />
      <track kind="captions" />
    </video>
  );
};

export default Video;
