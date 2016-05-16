export default config = {
  PARSE_ID: 'htqpp4xRds01PrnaGs6IuNpp5LnEdmyQ3iTVglvX',
  PARSE_API_KEY: 'M6D4OV9Dd12hfOnaknCh3BNSnUk0AXBA6nk57OnH',
  URL: 'https://api.parse.com/1/',
  PARSE_CLOUD_GCD_SENDER_ID: '395124388701',
  STORAGE_KEY_PROFILE: 'PROFILE_ID',
  STORAGE_KEY_TOKEN: 'TOKEN_ID',
  PUSH_TYPE: 'gcm'
}

export const userGroupListData = [
      { value: 0, label: 'Police station', groupId: 'policeStation' },
      { value: 1, label: 'Fire station', groupId: 'fireStation' },
      { value: 2, label: 'Ambulance', groupId: 'ambulance' },
      { value: 3, label: 'Medical User', groupId: 'medicalUser' },
      { value: 4, label: 'Militarian User', groupId: 'militarianUser' },
      { value: 5, label: 'Volunteer', groupId: 'volunteer' },
      { value: 6, label: 'Normal', groupId: 'normal' },
]

export const homeInfoListData = [
  { icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen' }, 
  { icon: 'fire', text: 'Show Location', func: 'showUserLocation' }, 
  { icon: 'fire', text: 'Location Info', func: 'JSONLocation' }, 
  { icon: 'fire', text: 'UploadImage', func: 'UploadImage' }, 
]

export const drawerItems = [
  ["home", 'home'], 
  ["person", "profile"], 
  ["local-hospital", "emergency"], 
  ["email", "recommend"], 
  ["share", "feedback"], 
  ["settings", "about"]
]