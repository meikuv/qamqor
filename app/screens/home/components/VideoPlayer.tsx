import React, { useRef } from 'react'
import { View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import IconButton from '../../../components/ui/IconButton'

const VideoPlayer = () => {
  const videoRef = useRef(null)
  const [status, setStatus] = React.useState({})
  return (
    <View className="w-full h-80 flex items-center justify-center">
      <Video
        ref={videoRef}
        className="w-3/4 h-72 rounded-xl"
        source={{
          uri: 'https://social-assistance-bucket.s3.eu-central-1.amazonaws.com/document_5283040405233879322.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {status.isPlaying ? (
        <IconButton
          name="pause"
          size={20}
          color="#3b82f6"
          onPress={() => videoRef.current.pauseAsync()}
        />
      ) : (
        <IconButton
          name="play"
          size={20}
          color="#3b82f6"
          onPress={() => videoRef.current.playAsync()}
        />
      )}
    </View>
  )
}

export default VideoPlayer
