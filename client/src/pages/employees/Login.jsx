import { Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { useDispatch } from "react-redux";



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) =>{
        try{
            dispatch(ShowLoading());
            const response = await axios.post("/api/employee/login", values);
            dispatch(HideLoading());
            if(response.data.success)
            {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/employee");
            }
            else{
                toast.error(response.data.message);
            }
        }catch(error){
          dispatch(HideLoading());
            toast.error(error.message);
        }
    }

  return (
    <>
      <Toaster />
      <div
        className="primary d-flex align-items-center justify-content-end"
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent), url('https://www.shutterstock.com/image-vector/school-building-front-view-green-260nw-2340208405.jpg')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          textAlign: "right",
        }}
      >
        <div className="d-flex align-items-center">
          <div className="position-absolute top-0 start-0 p-4 text-white">
            <h1 className="text-medium">Little Champs School</h1>
          </div>
          <Form layout="vertical w-400 white p-4 mx-5" className="" style={{ border: "1px solid #0000FF", background: "rgba(0, 0, 0, 0.6)", height: "450px", width: "270px"}} onFinish={onFinish}>
            <hr style={{color: "#46c1dc"}}/>
            <h1 className="text-medium fs-3 text-white text-center">Admin - Login</h1>
            <hr style={{color: "#46c1dc"}}/>
            <Form.Item name="employeeId" label={<label style={{ color: "white" }}>Employee ID</label>}>
              <Input placeholder="Username"/>
            </Form.Item>
            <Form.Item name="password" label={<label style={{ color: "white" }}>Password</label>}>
              <Input type="password" placeholder="Password"/>
            </Form.Item>

            <button className="primary fw-normal text-light px-5 my-4 w-100 btn btn-sm" style={{backgroundColor: "#46c1dc"}}>Login</button>
          </Form>
        </div>
      </div>
      </>
  );
}

export default Login;