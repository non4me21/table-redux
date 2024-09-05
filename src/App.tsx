import './App.css'
import Table from './components/Table/Table'
import Section from './containers/Section/Section'
import tableConfig from './configs/UsersTableConfig.json'
import { TableConfig } from './interfaces'

function App() {


  return (
    <>
      <Section centered padding>
        <Table title='Tabela użytkowników' tableConfig={tableConfig as TableConfig}/>
      </Section>
    </>
  )
}

export default App
