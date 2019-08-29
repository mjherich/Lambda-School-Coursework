import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WC from 'react-d3-cloud'

// Shape of data for word cloud
// const mockData = [
//   { text: 'word', value: 12 },
//   { text: 'salty', value: 10 },
//   { text: 'lambda', value: 3 },
//   { text: 'hacker', value: 10 },
//   { text: 'news', value: 100 }
// ]

const fontSizeMapper = word => Math.log2(word.value) * 50;

export default function WordCloud({ username }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post('https://cors-anywhere.herokuapp.com/hackernews-serving.herokuapp.com/cloud', {"username": username})
      .then(res => setData(JSON.parse(res.data.texts)))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      {data.length > 0 && (<WC data={data} fontSizeMapper={fontSizeMapper} />)}
    </>
  )
}