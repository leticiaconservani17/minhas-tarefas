import AddButton from '../../components/AddButton'
import SideBar from '../../containers/sidebar'
import TaskList from '../../containers/tasksLisk'

const Home = () => (
  <>
    <SideBar showFilters />
    <TaskList />
    <AddButton />
  </>
)

export default Home
