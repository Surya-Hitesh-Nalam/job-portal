/* eslint-disable no-unused-vars */
import React from 'react'

const filterData=[
    {
        FilterType : 'Location',
        array:['delhi','ncr','hyderabad','bagaloore','pune','chennai','mumbai']
    },
    {
        FilterType : 'industry',
        array:['frontend developer','backend developer','full stack developer']
    },
    {
        FilterType : 'salary',
        array:['0-40k','40k-1lakh','1lakh-4lakh']
    },
]

const FilterCard = () => {
  return (
    <div>
        <h1>Filter Jobs</h1>
        <hr className='mt-3'/>
    </div>
  )
}

export default FilterCard