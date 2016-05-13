export default config = {
  PARSE_ID: 'htqpp4xRds01PrnaGs6IuNpp5LnEdmyQ3iTVglvX',
  PARSE_API_KEY: 'M6D4OV9Dd12hfOnaknCh3BNSnUk0AXBA6nk57OnH',
  URL: 'https://api.parse.com/1/',
  PARSE_CLOUD_GCD_SENDER_ID: '395124388701',
  STORAGE_KEY_PROFILE: 'PROFILE_ID',
  STORAGE_KEY_TOKEN: 'TOKEN_ID',
  PUSH_TYPE: 'gcm',
  DROP_BOX_TOKEN: 'ZuhvfDLen_wAAAAAAAAEBGQKLhPOnJywCUisR9zXhlIH-WgvOWvr977cmuHVRnPn'
}

export const userGroupListData = [
      { label: 'Police station', groupId: 'policeStation' },
      { label: 'Fire station', groupId: 'fireStation' },
      { label: 'Ambulance', groupId: 'ambulance' },
      { label: 'Medical User', groupId: 'medicalUser' },
      { label: 'Militarian User', groupId: 'militarianUser' },
      { label: 'Volunteer', groupId: 'volunteer' },
      { label: 'Normal', groupId: 'normal' },
]

export const homeInfoListData = [
  { icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen' }, 
  { icon: 'fire', text: 'Show Location', func: 'showUserLocation' }, 
  { icon: 'fire', text: 'Location Info', func: 'JSONLocation' }, 
  { icon: 'fire', text: 'UploadImage', func: 'uploadImage' }, 

]

export const drawerItems = [
  ["home", 'home'], 
  ["person", "profile"], 
  ["local-hospital", "emergency"], 
  ["email", "recommend"], 
  ["share", "feedback"], 
  ["settings", "about"]
]

export const imageUploadOptions = {
  title: 'Select Image', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'medium', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 512, // photos only
  maxHeight: 512, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.5, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }

}