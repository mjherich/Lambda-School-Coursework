export const addFeature = feature => {
  console.log('addFeature action creator triggered', feature)
  return {
    type: 'ADD_FEATURE',
    payload: feature
  }
}

export const removeFeature = featureName => {
  console.log('removeFeature action creator triggered')
  return {
    type: 'REMOVE_FEATURE',
    payload: featureName
  }
}