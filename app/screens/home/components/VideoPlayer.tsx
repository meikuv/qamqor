import React, { useState, useCallback } from 'react'
import { View, Alert } from 'react-native'
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
    <View style={{ width: '100%', height: 'auto', borderRadius: 12, overflow: 'hidden' }}>
      <YoutubePlayer
        height={200}
        play={playing}
        webViewStyle={{ borderRadius: 12 }}
        videoId={'Jmj9aRKp66I'}
        onChangeState={onStateChange}
      />
    </View>
  )
}

export default VideoPlayer
