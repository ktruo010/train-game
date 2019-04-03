// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCCkpkE09Fzosn2LlEqxvaDdzKfbSrC4ao',
  authDomain: 'ucibootcamptrainproject.firebaseapp.com',
  databaseURL: 'https://ucibootcamptrainproject.firebaseio.com',
  projectId: 'ucibootcamptrainproject',
  storageBucket: 'ucibootcamptrainproject.appspot.com',
  messagingSenderId: '157548710624'
}
firebase.initializeApp(config)

let db = firebase.firestore()
let trainName, destination, fristTrain, frequency, newRow, now, firstTrainInt, frequencyInt, nextArrival, minAway, nextArrivalUnix, naValue
db.collection('train').onSnapshot(snap => {
  document.querySelector('#table thead').innerHTML = `<tr>
    <td>Train Name</td>
    <td>Destination</td>
    <td>Frequency</td>
    <td>Next Arrival</td>
    <td>Minutes Away</td>
    <tr>
`
  document.querySelector('#table tbody').innerHTML = ''
  snap.docs.forEach(doc => {
    let { trainName, destination, frequency, minAway, nextArrival } = doc.data()
    let rows = document.createElement('tr')
    rows.innerHTML = `
      <td>${trainName}</td>
      <td>${destination}</td>
      <td>${frequency}</td>
      <td>${nextArrival}</td>
      <td>${minAway}</td>
  `
    document.querySelector('#table tbody').appendChild(rows)
  })
})

document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()
  let id = db.collection('train').doc().id
  trainName = document.querySelector('#trainName').value
  destination = document.querySelector('#destination').value
  fristTrain = document.querySelector('#firstTrain').value
  frequency = document.querySelector('#frequency').value
  firstTrainInt = moment(parseInt(firstTrain), 'hh:mm a').format('YYYY-MM-DD HH:mm:ss')
  frequencyInt = moment(parseInt(frequency), 'mm').format('mm')
  nextArrival = moment(fristTrain, 'hh:mm a').format('YYYY-MM-DD HH:mm:ss')
  now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  minAway = moment(nextArrival, 'YYYY-MM-DD HH:mm:ss').fromNow()
  db.collection('train')
    .doc()
    .set({
      trainName: document.querySelector('#trainName').value,
      destination: document.querySelector('#destination').value,
      time: document.querySelector('#firstTrain').value,
      frequency: document.querySelector('#frequency').value,
      minAway: minAway,
      nextArrival: nextArrival
    })
  trainName = document.querySelector('#trainName').value = ''
  destination = document.querySelector('#destination').value = ''
  nextArrival = document.querySelector('#firstTrain').value = ''
  frequency = document.querySelector('#frequency').value = ''
})
