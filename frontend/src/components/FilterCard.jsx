
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        FilterType: 'Location',
        array: ['delhi', 'ncr', 'hyderabad', 'bangalore', 'pune', 'chennai', 'mumbai']
    },
    {
        FilterType: 'Industry',
        array: ['frontend developer', 'backend developer', 'full stack developer']
    },
    {
        FilterType: 'Salary',
        array: ['0-40k', '40k-1lakh', '1lakh-4lakh']
    },
];

const FilterCard = () => {
    const [selectedValue,setSelectedValue] = useState('')
    const dispatch = useDispatch()
    const changeHandler=(value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[dispatch,selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3'/>
            {filterData.map((data, index) => (
                <div key={index}>
                    <h2 className='font-bold text-lg'>{data.FilterType}</h2>
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {data.array.map((item, idx) =>{ 
                        const itemId = `r${index}-${idx}`
                        return(
                            <div key={idx} className='flex items-center space-x-2 my-1'>
                                <RadioGroupItem value={item} id={itemId}/>
                                <Label htmlFor={itemId}>{item}</Label>
                            </div>
                        )})}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
}

export default FilterCard;