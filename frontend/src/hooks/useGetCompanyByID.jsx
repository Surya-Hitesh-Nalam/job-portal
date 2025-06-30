/* eslint-disable no-unused-vars */
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyByID = (companyId) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true })
                console.log('Response:', res.data) // Log the entire response
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                } else {
                    console.log('API Response Error:', res.data.message) // Log any API error messages
                }
            } catch (error) {
                console.log('Fetch Error:', error) // Log any network or request errors
            }
        }
        
        fetchSingleCompany()
    }, [companyId,dispatch]) // Add dispatch to the dependency array

}

export default useGetCompanyByID

