const React = require('react')
const Layout = require('./Layout')
const Menu = require('./components/Menu')
const Form = require('./components/Form')

const NewProject = ({ namePage, projects, currentProject, errors }) => {
  return (
    <Layout namePage={namePage}>
      <Menu projects={projects} />
      <Form currentProject={currentProject} errors={errors} />
    </Layout>
  )
}

module.exports = NewProject
