const React = require('react')
const Layout = require('./Layout')
const Menu = require('./components/Menu')
const Welcome = require('./components/Welcome')

const Home = ({ namePage, projects, pendingTasks }) => {
  return (
    <Layout namePage={namePage}>
      <Menu projects={projects} />
      <Welcome projects={projects} pendingTasks={pendingTasks} />
    </Layout>
  )
}

module.exports = Home
