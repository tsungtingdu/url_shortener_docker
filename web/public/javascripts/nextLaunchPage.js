let missionPatch = document.querySelector('#mission-patch')
let details = document.querySelector('#details')
let missionName = document.querySelector('#mission-name')

axios.get('https://api.spacexdata.com/v3/launches/upcoming')
  .then(res => {

    if (res.data[0]) {
      // image
      missionPatch.src = res.data[0].links['mission_patch']
      // details
      details.innerText = res.data[0].details
      // mission name
      missionName.innerHTML = `<h3>${res.data[0].mission_name.toUpperCase()}</h3>`
      // launch time
      let launch_date_utc = res.data[0].launch_date_utc
      let launchDateOffset = moment.utc(res.data[0].launch_date_utc)
      launchDateOffset = launchDateOffset.local().format('YYYY-MM-DD HH:mm:ss')
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