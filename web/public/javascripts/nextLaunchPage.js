let missionPatch = document.querySelector('#mission-patch')
let details = document.querySelector('#details')
let missionName = document.querySelector('#mission-name')

axios.get('https://api.spacexdata.com/v3/launches/upcoming')
  .then(res => {

    // ensure always getting upcoming launch if API doesn't update in time
    let data
    let nowTime = moment()
    nowTime = moment.unix(nowTime) / (1000 * 1000)
    data = (res.data[0].launch_date_unix - nowTime) > 0 ? res.data[0] : res.data[1]

    if (data) {
      // image
      missionPatch.src = data.links['mission_patch']
      // details
      details.innerText = data.details
      // mission name
      missionName.innerHTML = `<h3>${data.mission_name.toUpperCase()}</h3>`
      // launch time
      let launch_date_utc = data.launch_date_utc
      let launchTime = moment(launch_date_utc).format('YYYY/MM/DD HH:mm:ss')

      // countdown
      $(function () {
        $('#countdownclock').countdown(launchTime).on('update.countdown', function (event) {
          var $this = $(this).html(event.strftime(
            '' + '<div class="holder m-2"><span class="h1 font-weight-bold">%D</span> Day%!d</div>'
            + '<div class="holder m-2"><span class="h1 font-weight-bold">%H</span> Hr</div>'
            + '<div class="holder m-2"><span class="h1 font-weight-bold">%M</span> Min</div>'
            + '<div class="holder m-2"><span class="h1 font-weight-bold">%S</span> Sec</div>'))
        })
      })
    } else {
      missionPatch.src = 'https://www.spacex.com/static/images/share.jpg'
      missionName.innerHTML = `<h4> no data for the next launch ...</h4>`
    }
  })