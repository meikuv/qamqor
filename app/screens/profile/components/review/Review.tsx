import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { useTranslation } from 'react-i18next'
import { useAssistance } from '../../../../hooks/useAssistance'
import { IReview } from '../../../../services/assistance.service'
import { useUser } from '../../../../hooks/useUser'
import { showToast } from '../../../../components/toast'
import Field from '../../../../components/ui/Field'
import DefaultLayout from '../../../../components/layout/DefaultLayout'
import TextButton from '../../../../components/ui/TextButton'

const Review = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const { createReview, isLoading } = useAssistance()
  const [rating, setRating] = useState<any>({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    rating: 0,
    comment: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!rating.comment || !rating.comment.trim()) {
      errors.comment = t('leaveReview.commentError')
    }

    if (!rating.rating || rating.rating === 0) {
      showToast('error', t('leaveReview.title'), t('leaveReview.ratingError'))
      errors.rating = t('leaveReview.ratingError')
    }

    return errors
  }

  const createRatingHandler = async () => {
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    await createReview(rating)
    setRating({
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      rating: 0,
      comment: '',
    })
  }

  console.log(rating.rating)

  return (
    <DefaultLayout isScrollView={true}>
      <View className="mx-2">
        <AirbnbRating
          count={5}
          reviews={[
            t('leaveReview.terrible'),
            t('leaveReview.bad'),
            t('leaveReview.meh'),
            t('leaveReview.good'),
            t('leaveReview.veryGood'),
          ]}
          defaultRating={0}
          onFinishRating={(value) => setRating({ ...rating, rating: value })}
          starContainerStyle={{ marginBottom: 30 }}
          size={35}
        />
        <Field
          value={rating.comment}
          label={t('leaveReview.comment')}
          onChange={(val) => {
            setRating({ ...rating, comment: val })
            setErrors({ ...errors, comment: '' })
          }}
          error={errors.comment}
          isTextArea={true}
          shadow={true}
        />
        <TextButton
          onPress={createRatingHandler}
          title={t('leaveReview.send')}
          isLoading={isLoading}
        />
      </View>
    </DefaultLayout>
  )
}

export default Review
