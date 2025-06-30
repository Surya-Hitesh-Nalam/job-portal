/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const ComapnyCreate = () => {
    const navigate = useNavigate()
    const [companyname,setCompanyName] = useState('')
    const dispatch = useDispatch()
    const registerNewCompany = async()=>{
      try {

        if (!companyname.trim()) {
          toast.error('Company name is required.');
          return;
        }

        console.log(companyname)
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyname}, {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
        }
    } catch (error) {
        console.error('Error creating company:', error.response?.data || error.message);
      toast.error('An error occurred while creating the company.');
    }
}
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
      <div className='my-10'>
        <h1 className='font-bold text-2xl'>Your Company Name</h1>
        <p>what would you like to give your company name? you can change it later</p>
      </div>
        <Label>Comapny Name</Label>
        <Input type="text" 
        className="my-2"
        placeholder="JobHunt, MIcrosoft etc"
        onChange={(e)=>setCompanyName(e.target.value)}/>
        <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={()=> navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default ComapnyCreate
