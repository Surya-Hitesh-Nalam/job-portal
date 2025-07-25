/* eslint-disable no-unused-vars */
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const {applicants} = useSelector(store=>store.application)
  const statusHandler = async (status,id) =>{
    try {
      axios.defaults.withCredentials=true
      const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            {
              applicants && applicants?.applications?.map((item)=>(
                <tr key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phonenumber}</TableCell>
              <TableCell className="text-blue-600 cursor-pointer"> 
                {
                  item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer"> {item?.applicant?.profile?.resumeOrginalName} </a> : <span>NA</span>
                }
                </TableCell>
              <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, index) => {
                      return (
                        <div onClick={()=>statusHandler(status,item?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
              ))
            }
            
          </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
