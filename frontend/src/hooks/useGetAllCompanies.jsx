/* eslint-disable no-unused-vars */
import { setCompanies, setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true })
                console.log('Response:', res.data) // Log the entire response
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies))
                } else {
                    console.log('API Response Error:', res.data.message) // Log any API error messages
                }
            } catch (error) {
                console.log('Fetch Error:', error) // Log any network or request errors
            }
        }
        
        fetchCompanies()
    }, [dispatch]) // Add dispatch to the dependency array

}

export default useGetAllCompanies

