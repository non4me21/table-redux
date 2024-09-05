import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './Table.module.scss'
import { setData, setFilter, removeFilter, clearFilters } from '../../store/tableSlice';
import { useEffect, useMemo, useState } from 'react';
import { TableConfig } from '../../interfaces';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual';
import { CircularProgress, Switch } from '@mui/material';

const Table = ({title, tableConfig}: {title?: string, tableConfig: TableConfig}) => {

  const [debouncedFilters, setDebouncedFilters] = useState<{[key: string]: string}>()
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDelayed, setDelayed] = useState<boolean>(false);

  const data = useAppSelector((state) => state.table.data)
  const filters = useAppSelector((state) => state.table.filters)
  const dispatch = useAppDispatch()

  const debouncedSave = debounce((nextFilters: {[key: string]: string}) => {
    setDebouncedFilters(nextFilters);
  }, 300);

  useEffect(() => {
    if (!isEqual(filters, debouncedFilters)) {
      debouncedSave(filters)
    }
    return () => {debouncedSave.cancel()}
  }, [filters])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const queryParams = new URLSearchParams(debouncedFilters).toString()
      const data = await fetch(`https://jsonplaceholder.typicode.com/users?${queryParams}`)
      const jsonData = await data.json()
      if (isDelayed) {
        setTimeout(() => {
          dispatch(setData(jsonData));
          setLoading(false);
        }, 3000)
      } else {
        dispatch(setData(jsonData))
        setLoading(false);
      }
    }
      getData();
  }, [debouncedFilters])

  const handleFilterChange = (key: string, value: string) => {
    if (value.length > 0) {
      dispatch(setFilter({ key, value }))
    } else {
      dispatch(removeFilter(key))
    }
  };
    
  const headers = useMemo(() => tableConfig.headers.map(header => {
    return (
  <th key={header.key}>
    <div className={styles.HeaderContent}>
      {header.name}
      <div className={styles.HeaderInput}>
        {filters[header.key] && filters[header.key]?.length > 0 ? <ClearIcon className={styles.ClearIcon} onClick={() => dispatch(removeFilter(header.key))}/> : <FilterAltIcon className={styles.FilterIcon}/>}
        <input placeholder={`Search by ${header.name}`} onChange={(event) => handleFilterChange(header.key, event.target.value)} value={filters[header.key] ?? ''}/>
      </div>
    </div>
  </th>
    )
}), [filters])

  const body = useMemo(() => {
      const rows = data.map((dataRow, index) => {
        const tableRow = tableConfig.body.map(cell => {
          let content = dataRow[cell.key];
          if (cell.type === 'email') {
            content = <a href={`mailto:${dataRow.email}`}>{dataRow.email}</a>
          } else if (cell.type === 'phone') {
            content = <a href={`tel:${dataRow.phone}`}>{dataRow.phone}</a>
          }
        return <td key={cell.key}>{content}</td>
      })
        return <tr key={index}>{tableRow}</tr>
      })
      return rows
  }, [data])
  console.log(isLoading)


  return (
    <div className={styles.TableComponent}>
      {title && <h1 className={styles.Title}>{title}</h1>}
      <div className={styles.Buttons}>
        <div className={styles.Switch}>
          <span>API Delay</span>
          <Switch  onChange={() => setDelayed(!isDelayed)}/>
        </div>
        <div className={styles.Button} onClick={() => dispatch(clearFilters())}>Clear filters</div>
      </div>
      <div className={styles.TableWrapper}>
        <table className={styles.Title}>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {isLoading ? 
            <tr>
              <td className={styles.LoadingCell} colSpan={tableConfig.headers.length}>
                <CircularProgress className={styles.Loading}/>
              </td>
            </tr>
            : 
            body}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table;

