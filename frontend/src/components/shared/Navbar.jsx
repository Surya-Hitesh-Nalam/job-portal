/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {  LogOut, User2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async()=>{
    try {
      const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Dekho</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === 'recruiter' ? (
                <>
              <li><Link to='/admin/companies'>Companies</Link></li>
              <li><Link to='/admin/jobs'>Jobs</Link></li>
              </>
              ):(
                <>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/jobs'>Jobs</Link></li>
              <li><Link to='/browse'>Browse</Link></li>
            </>
              )
            }
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#4d05ca]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || "data:image/png;base64,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"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4  space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.fullname}</h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {
                    user && user.role==='student' &&(
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link"><Link to='/profile'>view profile</Link></Button>
                  </div>
                    )
                  }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
