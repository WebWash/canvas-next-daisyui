import { cva } from 'class-variance-authority';
import { cn, Image } from 'drupal-canvas';

const chatVariants = cva('chat', {
  variants: {
    placement: {
      start: 'chat-start',
      end: 'chat-end',
    },
  },
});

const bubbleVariants = cva('chat-bubble', {
  variants: {
    color: {
      default: '',
      neutral: 'chat-bubble-neutral',
      primary: 'chat-bubble-primary',
      secondary: 'chat-bubble-secondary',
      accent: 'chat-bubble-accent',
      info: 'chat-bubble-info',
      success: 'chat-bubble-success',
      warning: 'chat-bubble-warning',
      error: 'chat-bubble-error',
    },
  },
});

/** One bubble. Stack several in a section for a conversation. */
const Chat = ({
  placement,
  message,
  author,
  time,
  footerText,
  image,
  color,
  className,
}) => {
  return (
    <div className={cn(chatVariants({ placement }), className)}>
      {image?.src && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        </div>
      )}
      {(author || time) && (
        <div className="chat-header">
          {author} {time && <time className="text-xs opacity-50">{time}</time>}
        </div>
      )}
      <div className={bubbleVariants({ color })}>{message}</div>
      {footerText && <div className="chat-footer opacity-50">{footerText}</div>}
    </div>
  );
};

export default Chat;
