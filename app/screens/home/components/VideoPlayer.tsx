import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false)

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false)
    }
  }, [])

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev)
  }, [])

  return (
    <View
      style={{
        width: 'auto',
        height: 'auto',
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 8,
      }}
    >
      <YoutubePlayer
        height={210}
        play={playing}
        videoId={'Jmj9aRKp66I'}
        onChangeState={onStateChange}
      />
    </View>
  )
}

export default VideoPlayer
