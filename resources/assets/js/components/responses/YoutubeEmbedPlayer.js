import React from 'react';

class YoutubeEmberPlayer extends React.Component {
  render() {
    const srcVideo = `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&origin=http://iheartreading.co`;
    return (
        <div className='youtube-ember-player-container'>
          <iframe
            className='youtube-video'
            type='text/html'
            src={srcVideo}
            frameBorder='0'
            allowFullScreen
          />
        </div>
    );
  }
}

export default YoutubeEmberPlayer;
