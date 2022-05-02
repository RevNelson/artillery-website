import useStore from "@lib/hooks/useStore"

export default function About() {
  const { loggedIn } = useStore(state => state.auth)
  const { setLoggedIn } = useStore(state => state.auth)

  return (
    <div>
      <h1>About Page</h1>
      <div>
        <button onClick={() => setLoggedIn(!loggedIn)}>LOG INSIDE</button>
      </div>
      {/* <div>
        <button onClick={() => goOutside(!outside)}>LOG OUTSIDE</button>
      </div> */}
    </div>
  )
}
