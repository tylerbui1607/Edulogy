import MainView from "./child/MainView"
import SubView from "./child/SubView"
function ForumPage() {
  return (
    <div className="container forum">
      <h3>Diễn đàn Edulogy</h3>
      <div className="show_flex">
        <MainView />
        <SubView />
      </div>
    </div>
  )
}
export { ForumPage }