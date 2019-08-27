import React, { Component } from 'react';
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const mockData = [{ "username": "matt1", "saltyscore": 17.78 }, { "username": "matt2", "saltyscore": 39.78 }, { "username": "hbengall2", "saltyscore": 12.39 }, { "username": "froughey3", "saltyscore": 38.66 }, { "username": "sscartifield4", "saltyscore": 71.97 }, { "username": "rdyche5", "saltyscore": 38.05 }, { "username": "nbroe6", "saltyscore": 53.36 }, { "username": "mbaradel7", "saltyscore": 76.42 }, { "username": "jcarthew8", "saltyscore": 92.49 }, { "username": "ablance9", "saltyscore": 43.18 }, { "username": "vtunniclissea", "saltyscore": 86.41 }, { "username": "fsalzburgb", "saltyscore": 71.88 }, { "username": "bterrellc", "saltyscore": 50.17 }, { "username": "igallyond", "saltyscore": 52.64 }, { "username": "pjoulese", "saltyscore": 12.92 }, { "username": "igladwishf", "saltyscore": 82.83 }, { "username": "msentg", "saltyscore": 67.64 }, { "username": "wbimh", "saltyscore": 24.68 }, { "username": "mslaymakeri", "saltyscore": 33.74 }, { "username": "kharwickj", "saltyscore": 84.9 }, { "username": "jflahivek", "saltyscore": 66.09 }, { "username": "jdrewesl", "saltyscore": 29.43 }, { "username": "kaldredm", "saltyscore": 70.44 }, { "username": "bferrarinin", "saltyscore": 21.59 }, { "username": "pvandenveldeno", "saltyscore": 56.92 }, { "username": "nthorringtonp", "saltyscore": 44.22 }, { "username": "cfarndaleq", "saltyscore": 1.07 }, { "username": "mquinbyr", "saltyscore": 96.5 }, { "username": "shadentons", "saltyscore": 93.42 }, { "username": "gszymanskit", "saltyscore": 8.4 }, { "username": "rmillichapu", "saltyscore": 66.26 }, { "username": "cpashbav", "saltyscore": 98.09 }, { "username": "tholleyw", "saltyscore": 26.5 }, { "username": "mdymidowiczx", "saltyscore": 68.95 }, { "username": "fpullery", "saltyscore": 92.74 }, { "username": "ggracewoodz", "saltyscore": 44.63 }, { "username": "iprazor10", "saltyscore": 32.06 }, { "username": "kmaleney11", "saltyscore": 55.96 }, { "username": "hmcilwraith12", "saltyscore": 70.79 }, { "username": "bghelerdini13", "saltyscore": 1.65 }, { "username": "hjakubovits14", "saltyscore": 5.89 }, { "username": "aemma15", "saltyscore": 48.92 }, { "username": "swiskar16", "saltyscore": 51.2 }, { "username": "ofurley17", "saltyscore": 37.17 }, { "username": "abertomier18", "saltyscore": 16.51 }, { "username": "ncase19", "saltyscore": 93.29 }, { "username": "bhadny1a", "saltyscore": 74.26 }, { "username": "acultcheth1b", "saltyscore": 41.34 }, { "username": "ukingwell1c", "saltyscore": 17.97 }, { "username": "ustein1d", "saltyscore": 88.69 }, { "username": "mmacgarrity1e", "saltyscore": 65.27 }, { "username": "fschoffel1f", "saltyscore": 25.78 }, { "username": "aferrand1g", "saltyscore": 47.96 }, { "username": "mlintin1h", "saltyscore": 78.72 }, { "username": "ndregan1i", "saltyscore": 43.93 }, { "username": "gbeddo1j", "saltyscore": 5.64 }, { "username": "boakeshott1k", "saltyscore": 88.85 }, { "username": "cwitson1l", "saltyscore": 11.94 }, { "username": "cswannick1m", "saltyscore": 19.14 }, { "username": "rreeds1n", "saltyscore": 36.29 }, { "username": "wklamp1o", "saltyscore": 11.7 }, { "username": "rtett1p", "saltyscore": 8.04 }, { "username": "cwarbrick1q", "saltyscore": 74.69 }, { "username": "evarne1r", "saltyscore": 18.08 }, { "username": "jburnep1s", "saltyscore": 13.7 }, { "username": "dgaucher1t", "saltyscore": 5.1 }, { "username": "tolufsen1u", "saltyscore": 9.44 }, { "username": "aparrett1v", "saltyscore": 15.21 }, { "username": "rortiga1w", "saltyscore": 47.16 }, { "username": "dbartelsellis1x", "saltyscore": 55.61 }, { "username": "foneal1y", "saltyscore": 22.9 }, { "username": "dhumpatch1z", "saltyscore": 69.5 }, { "username": "bdryden20", "saltyscore": 80.34 }, { "username": "adiaper21", "saltyscore": 69.93 }, { "username": "jboles22", "saltyscore": 69.53 }, { "username": "ifitchell23", "saltyscore": 81.33 }, { "username": "sbowman24", "saltyscore": 11.86 }, { "username": "csykora25", "saltyscore": 7.84 }, { "username": "dockland26", "saltyscore": 64.96 }, { "username": "geasterling27", "saltyscore": 60.05 }, { "username": "acrocetti28", "saltyscore": 63.97 }, { "username": "swetwood29", "saltyscore": 61.71 }, { "username": "rhopkyns2a", "saltyscore": 55.73 }, { "username": "tbarthelet2b", "saltyscore": 93.88 }, { "username": "bwindebank2c", "saltyscore": 13.71 }, { "username": "kmounsey2d", "saltyscore": 84.86 }, { "username": "prubartelli2e", "saltyscore": 30.87 }, { "username": "ffairpool2f", "saltyscore": 97.51 }, { "username": "ybogie2g", "saltyscore": 63.91 }, { "username": "mveeler2h", "saltyscore": 36.44 }, { "username": "pmacgilfoyle2i", "saltyscore": 34.06 }, { "username": "fchesterman2j", "saltyscore": 62.54 }, { "username": "jmcclinton2k", "saltyscore": 39.06 }, { "username": "dffrench2l", "saltyscore": 94.15 }, { "username": "ablanque2m", "saltyscore": 7.05 }, { "username": "vmellem2n", "saltyscore": 86.38 }, { "username": "bdyster2o", "saltyscore": 96.35 }, { "username": "dlefleming2p", "saltyscore": 38.09 }, { "username": "akilshaw2q", "saltyscore": 9.69 }, { "username": "bclinnick2r", "saltyscore": 15.99 }]

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ username, saltyscore }) => (
  
  <div key={username}>
  <span>{username} <strong style={{color:(saltyscore > 50) ? "red":"green"}}>score: {saltyscore}</strong></span>
  </div>
)

export default class UserSearch extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    window.location.href = `/users/${result.username}`
  }

  handleSearchChange = (e, {value}) => {
    
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.username)

      /*SLOW!!! IT WILL BE BETTER TO ALREADY HAVE A TITLE PORPERTY 
      IN THE OBJECT WITH ALL LOWER CASE saltyscore prop as well 
      it does not like camelCase idk why */ 
      mockData.forEach(function addTitle(data, index){
        this[index].title = data.username;
      }, mockData )

      this.setState({
        isLoading: false,
        results: _.filter(mockData, isMatch),
        
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <>
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        resultRenderer={resultRenderer}
        value={value}
        placeholder="Search HN Users..."
        {...this.props}
      />
      
      </>
    )
  }
}