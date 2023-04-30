export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    if(window.location.pathname == "/explorer") {
      document.body.style.backgroundImage = "url(../assets/mountains-universe-3.png)"
    } else if(window.location.pathname == "universe") {
      document.body.style.backgroundImage = "url(../assets/mountains-universe-2.png)"
    } else {
      document.body.style.backgroundImage = "url(../assets/mountains-universe-1.png)"
    }

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname]

    fetch(route)
    .then((data) => {
      return data.text()
    })
    .then((html) => {
      return document.querySelector(".content").innerHTML = html
    })
  }
}
