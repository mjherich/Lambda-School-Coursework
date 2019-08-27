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

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

export default function WordCloud() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://my.api.mockaroo.com/wordcloud.json?key=917e1550')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      {data.length > 0 && (<WC data={data} fontSizeMapper={fontSizeMapper} rotate={rotate} />)}
    </>
  )
}