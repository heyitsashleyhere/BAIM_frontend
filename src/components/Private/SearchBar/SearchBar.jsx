import { useState } from 'react'
import { Select, MenuItem, TextField, InputAdornment, IconButton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function SearchBar() {
  const [searchCat, setSearchCat] = useState("")
  const [searchOpt, setSearchOpt] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const filterCat = ["user", "beauty", "artsCraft", "garden", "recipe", "event"]
  const filterOpt = ["authorProfileName", "title", "description", "category", "tags"]

  function handleSearch() {
    if(searchCat === 'user') {
      fetch(`http://localhost:7000/user/search/${searchInput}`)
      .then(response => response.json())
      .then(result => {
        if(!result.errors) { 
          setSearchResult(result)
        } else {
          console.log('errors :>> ', errors);
        }
      })
      .catch(error => console.log(error.message))
    } else {
      fetch(`http://localhost:7000/${searchCat}/${searchOpt}/${searchInput}`)
      .then(response => response.json())
      .then(result => {
        if(!result.errors) { 
          setSearchResult(result)
        } else {
          console.log('errors :>> ', errors);
        }
      })
      .catch(error => console.log(error.message))
    }
  }
  return (
     <Stack direction="row" className='SearchBar'>
        <Select variant='standard' displayEmpty
                value={searchCat} className="select-input"
                onChange={(e) => setSearchCat(e.target.value) }>
            <MenuItem disabled value=""><em>category</em></MenuItem>
            {filterCat.map(cat => (
                <MenuItem value={cat} key={`searchCat-` + cat}>{cat === 'user' ? 'profile name' : cat }</MenuItem>
             ))}
         </Select>
         { searchCat !== 'user' &&
            <Select variant='standard' displayEmpty
                    value={searchOpt} className="select-input"
                    onChange={(e) => setSearchOpt(e.target.value) }>
              <MenuItem disabled value=""><em>filter</em></MenuItem>
              {filterOpt.map(cat => (
                  <MenuItem value={cat} key={`searchOpt-` + cat}>{cat === 'authorProfileName' ? 'profile name' : cat }</MenuItem>
              ))}
            </Select>
         }
        <TextField placeholder="Search" variant="standard" className='search-input'
                   onChange={(e) => setSearchInput(e.target.value)}
                  InputProps={{
                      endAdornment: (
                            <InputAdornment>
                              <IconButton onClick={handleSearch}>
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                      }} />
      </Stack>
  )
}

export function MobileSearchBar() {
  const [searchCat, setSearchCat] = useState("")
  const [searchOpt, setSearchOpt] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const filterCat = ["user", "beauty", "artsCraft", "garden", "recipe", "event"]
  const filterOpt = ["authorProfileName", "title", "description", "category", "tags"]

  function handleSearch() {
    if(searchCat === 'user') {
      fetch(`http://localhost:7000/user/search/${searchInput}`)
      .then(response => response.json())
      .then(result => {
        if(!result.errors) { 
          setSearchResult(result)
        } else {
          console.log('errors :>> ', errors);
        }
      })
      .catch(error => console.log(error.message))
    } else {
      fetch(`http://localhost:7000/${searchCat}/${searchOpt}/${searchInput}`)
      .then(response => response.json())
      .then(result => {
        if(!result.errors) { 
          setSearchResult(result)
        } else {
          console.log('errors :>> ', errors);
        }
      })
      .catch(error => console.log(error.message))
    }
  }
  return (
     <Stack direction="row" className='SearchBar' sx={{ color: 'white' }}>
        <Select variant='standard' displayEmpty color='secondary'
                value={searchCat} className="select-input" sx={{ color: 'white', borderColor: 'white', zIndex: 999999 }}
                onChange={(e) => setSearchCat(e.target.value) }>
            <MenuItem disabled value="" sx={{ zIndex: 999999 }}><em>category</em></MenuItem>
            {filterCat.map(cat => (
                <MenuItem value={cat} sx={{ zIndex: 999999 }} key={`searchCat-` + cat}>{cat === 'user' ? 'profile name' : cat }</MenuItem>
             ))}
         </Select>
         { searchCat !== 'user' &&
            <Select variant='standard' displayEmpty sx={{ color: 'white' }}
                    value={searchOpt} className="select-input"
                    onChange={(e) => setSearchOpt(e.target.value) }>
              <MenuItem disabled value=""><em>filter</em></MenuItem>
              {filterOpt.map(cat => (
                  <MenuItem value={cat} key={`searchOpt-` + cat}>{cat === 'authorProfileName' ? 'profile name' : cat }</MenuItem>
              ))}
            </Select>
         }
        <TextField placeholder="Search" variant="standard" className='search-input' sx={{ color: 'white' }}
                   onChange={(e) => setSearchInput(e.target.value)} color='secondary'
                   InputProps={{
                      endAdornment: (
                            <InputAdornment>
                              <IconButton onClick={handleSearch} size='large'>
                                <SearchIcon color='secondary' size='large'/>
                              </IconButton>
                            </InputAdornment>
                          )
                      }} />
      </Stack>
  )
}



