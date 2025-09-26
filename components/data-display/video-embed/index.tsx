import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  // The video object
  video: {
    // The video title
    title: string;
    // The video ID
    id: string;
  };
}

/**
 * The VideoEmbed component displays a video embed with a title and body text.
 * At the moment, only YouTube embeds are supported.
 */
export const VideoEmbed: React.FC<Props> = ({ className, video }: Props) => {
  return (
    <div className={cx(styles['video-embed'], className)}>
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; controls; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoEmbed;
