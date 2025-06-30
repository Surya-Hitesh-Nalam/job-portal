/* eslint-disable no-unused-vars */
import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs= () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true })
                console.log('Response:', res.data) // Log the entire response
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                } else {
                    console.log('API Response Error:', res.data.message) // Log any API error messages
                }
            } catch (error) {
                console.log('Fetch Error:', error) // Log any network or request errors
            }
        }
        
        fetchAllAdminJobs()
    }, [dispatch]) // Add dispatch to the dependency array

}

export default useGetAllAdminJobs

