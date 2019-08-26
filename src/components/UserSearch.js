import React, { useState } from 'react';
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = {
  value: '',
  results: [],
  isLoading: false
}

export default function UserSearch() {
  const [state, setState] = useState(initialState)

  const handleResultSelect = (e, { result }) => setState({ value: result.title })

  const handleSearchChange = (e, { value }) => {
    setState({ isLoading: true, value })

    setTimeout(() => {
      if (state.value.length < 1) return setState(initialState)

      const re = new RegExp(_.escapeRegExp(state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      setState({
        isLoading: false,
        results: _.filter(mockData, isMatch),
      })
    }, 300)
  }

  return (
    <>
      <h2>User Search</h2>
      <Search
        loading={state.isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}
        results={state.results}
        value={state.value}
      />
    </>
  )
}

const mockData = [{ "username": "eyurivtsev0", "saltyScore": 17.78 }, { "username": "cgingle1", "saltyScore": 39.78 }, { "username": "hbengall2", "saltyScore": 12.39 }, { "username": "froughey3", "saltyScore": 38.66 }, { "username": "sscartifield4", "saltyScore": 71.97 }, { "username": "rdyche5", "saltyScore": 38.05 }, { "username": "nbroe6", "saltyScore": 53.36 }, { "username": "mbaradel7", "saltyScore": 76.42 }, { "username": "jcarthew8", "saltyScore": 92.49 }, { "username": "ablance9", "saltyScore": 43.18 }, { "username": "vtunniclissea", "saltyScore": 86.41 }, { "username": "fsalzburgb", "saltyScore": 71.88 }, { "username": "bterrellc", "saltyScore": 50.17 }, { "username": "igallyond", "saltyScore": 52.64 }, { "username": "pjoulese", "saltyScore": 12.92 }, { "username": "igladwishf", "saltyScore": 82.83 }, { "username": "msentg", "saltyScore": 67.64 }, { "username": "wbimh", "saltyScore": 24.68 }, { "username": "mslaymakeri", "saltyScore": 33.74 }, { "username": "kharwickj", "saltyScore": 84.9 }, { "username": "jflahivek", "saltyScore": 66.09 }, { "username": "jdrewesl", "saltyScore": 29.43 }, { "username": "kaldredm", "saltyScore": 70.44 }, { "username": "bferrarinin", "saltyScore": 21.59 }, { "username": "pvandenveldeno", "saltyScore": 56.92 }, { "username": "nthorringtonp", "saltyScore": 44.22 }, { "username": "cfarndaleq", "saltyScore": 1.07 }, { "username": "mquinbyr", "saltyScore": 96.5 }, { "username": "shadentons", "saltyScore": 93.42 }, { "username": "gszymanskit", "saltyScore": 8.4 }, { "username": "rmillichapu", "saltyScore": 66.26 }, { "username": "cpashbav", "saltyScore": 98.09 }, { "username": "tholleyw", "saltyScore": 26.5 }, { "username": "mdymidowiczx", "saltyScore": 68.95 }, { "username": "fpullery", "saltyScore": 92.74 }, { "username": "ggracewoodz", "saltyScore": 44.63 }, { "username": "iprazor10", "saltyScore": 32.06 }, { "username": "kmaleney11", "saltyScore": 55.96 }, { "username": "hmcilwraith12", "saltyScore": 70.79 }, { "username": "bghelerdini13", "saltyScore": 1.65 }, { "username": "hjakubovits14", "saltyScore": 5.89 }, { "username": "aemma15", "saltyScore": 48.92 }, { "username": "swiskar16", "saltyScore": 51.2 }, { "username": "ofurley17", "saltyScore": 37.17 }, { "username": "abertomier18", "saltyScore": 16.51 }, { "username": "ncase19", "saltyScore": 93.29 }, { "username": "bhadny1a", "saltyScore": 74.26 }, { "username": "acultcheth1b", "saltyScore": 41.34 }, { "username": "ukingwell1c", "saltyScore": 17.97 }, { "username": "ustein1d", "saltyScore": 88.69 }, { "username": "mmacgarrity1e", "saltyScore": 65.27 }, { "username": "fschoffel1f", "saltyScore": 25.78 }, { "username": "aferrand1g", "saltyScore": 47.96 }, { "username": "mlintin1h", "saltyScore": 78.72 }, { "username": "ndregan1i", "saltyScore": 43.93 }, { "username": "gbeddo1j", "saltyScore": 5.64 }, { "username": "boakeshott1k", "saltyScore": 88.85 }, { "username": "cwitson1l", "saltyScore": 11.94 }, { "username": "cswannick1m", "saltyScore": 19.14 }, { "username": "rreeds1n", "saltyScore": 36.29 }, { "username": "wklamp1o", "saltyScore": 11.7 }, { "username": "rtett1p", "saltyScore": 8.04 }, { "username": "cwarbrick1q", "saltyScore": 74.69 }, { "username": "evarne1r", "saltyScore": 18.08 }, { "username": "jburnep1s", "saltyScore": 13.7 }, { "username": "dgaucher1t", "saltyScore": 5.1 }, { "username": "tolufsen1u", "saltyScore": 9.44 }, { "username": "aparrett1v", "saltyScore": 15.21 }, { "username": "rortiga1w", "saltyScore": 47.16 }, { "username": "dbartelsellis1x", "saltyScore": 55.61 }, { "username": "foneal1y", "saltyScore": 22.9 }, { "username": "dhumpatch1z", "saltyScore": 69.5 }, { "username": "bdryden20", "saltyScore": 80.34 }, { "username": "adiaper21", "saltyScore": 69.93 }, { "username": "jboles22", "saltyScore": 69.53 }, { "username": "ifitchell23", "saltyScore": 81.33 }, { "username": "sbowman24", "saltyScore": 11.86 }, { "username": "csykora25", "saltyScore": 7.84 }, { "username": "dockland26", "saltyScore": 64.96 }, { "username": "geasterling27", "saltyScore": 60.05 }, { "username": "acrocetti28", "saltyScore": 63.97 }, { "username": "swetwood29", "saltyScore": 61.71 }, { "username": "rhopkyns2a", "saltyScore": 55.73 }, { "username": "tbarthelet2b", "saltyScore": 93.88 }, { "username": "bwindebank2c", "saltyScore": 13.71 }, { "username": "kmounsey2d", "saltyScore": 84.86 }, { "username": "prubartelli2e", "saltyScore": 30.87 }, { "username": "ffairpool2f", "saltyScore": 97.51 }, { "username": "ybogie2g", "saltyScore": 63.91 }, { "username": "mveeler2h", "saltyScore": 36.44 }, { "username": "pmacgilfoyle2i", "saltyScore": 34.06 }, { "username": "fchesterman2j", "saltyScore": 62.54 }, { "username": "jmcclinton2k", "saltyScore": 39.06 }, { "username": "dffrench2l", "saltyScore": 94.15 }, { "username": "ablanque2m", "saltyScore": 7.05 }, { "username": "vmellem2n", "saltyScore": 86.38 }, { "username": "bdyster2o", "saltyScore": 96.35 }, { "username": "dlefleming2p", "saltyScore": 38.09 }, { "username": "akilshaw2q", "saltyScore": 9.69 }, { "username": "bclinnick2r", "saltyScore": 15.99 }]