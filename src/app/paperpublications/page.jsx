"use client";
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormik } from "formik"
import * as Y from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
  
const initialValues = {
    nameOfFaculty: "",
    stream: "",
    topic: "",
    issnNo: "",
    linkD: "",
}

const newDataSchema = Y.object({
    nameOfFaculty: Y.string().min(2).max(50).required("Please select the name of faculty."),
    stream: Y.string().min(2).max(50).required("Please enter stream."),
    topic: Y.string().min(2).max(50).required("Please enter topic."),
    issnNo: Y.string().min(2).max(50).required("Please enter ISSN number."),
    linkD: Y.string().required("Please enter link."),
})

const Page = () => {
    const [facultyData, setFacultyData] = useState([])
    const fcaData = facultyData.filter((d) => {
        return d.faculty.department == "fca"
    })
    const csData = facultyData.filter((d) => {
        return d.faculty.department == "cs"
    })
    const itData = facultyData.filter((d) => {
        return d.faculty.department == "cs"
    })
    console.log(fcaData, csData, itData);

    useEffect(() => {
        axios.get('/api/faculties').then(function (response) {
            console.log(response.data.facultyData);
            setFacultyData(response.data.facultyData);
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: newDataSchema,
        onSubmit: (values) => {
            axios.post('/api/paperpublications', values).then(function (response) {
                console.log(response);
                toast.success(response.data.message)
            }).catch(function (error) {
                console.log(error);
                toast.error(error.response.data.message)
            });
        }
    })
  return (
    <>
        <div className="h-screen w-screen flex justify-start items-center flex-col" style={{ backgroundImage: "url(/Images/acropolis.jpg)", backgroundPosition: "center", objectFit: "cover", backgroundSize: "cover" }}>
            <Navbar/>

            <div className="bg-white/50 backdrop-blur-[3px] rounded-lg w-[95vw] mt-6 md:mt-3 h-[80vh]">
                <div className="toolbar flex flex-col sm:flex-row justify-between mx-4 h-[4rem] items-center">
                    <div className="left w-full sm:w-auto mt-2 sm:mt-0">
                        <Input placeholder="Search here..." className="w-full" />
                    </div>
                    <div className="right w-full sm:w-auto mt-2 sm:mt-0">
                            <Dialog>
                                <DialogTrigger><Button className="w-full">Add New Data</Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle className="text-[1.5rem]">Add New Data</DialogTitle>
                                    </DialogHeader>
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid w-full items-center gap-4 h-[20rem] overflow-y-auto">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="nameOfFaculty">Name of Faculty</Label>
                                                    <div className="rounded-xl border-2">
                                                        <Select value={values.nameOfFaculty} onValueChange={selectedOption => {
                                                            let event = {target: {name: 'nameOfFaculty', value: selectedOption}}
                                                            handleChange(event)
                                                        }}
                                                        onBlur={() => {
                                                            handleBlur({target: {name: 'nameOfFaculty'}});
                                                        }} name='nameOfFaculty'>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Faculty Name" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>FCA</SelectLabel>
                                                                    {
                                                                        fcaData.map((d,i) => {
                                                                            return (
                                                                                <SelectItem key={i} value=
                                                                                {d.faculty.name}>{d.faculty.name}</SelectItem>
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectGroup>
                                                                <SelectGroup>
                                                                    <SelectLabel>CS</SelectLabel>
                                                                    {
                                                                        csData.map((d,i) => {
                                                                            return (
                                                                                <SelectItem key={i} value=
                                                                                {d.faculty.name}>{d.faculty.name}</SelectItem>
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectGroup>
                                                                <SelectGroup>
                                                                    <SelectLabel>IT</SelectLabel>
                                                                    {
                                                                        itData.map((d,i) => {
                                                                            return (
                                                                                <SelectItem key={i} value=
                                                                                {d.faculty.name}>{d.faculty.name}</SelectItem>
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <p className="aitr_error">{errors.nameOfFaculty}</p>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="stream">Stream</Label>
                                                    <div className="rounded-xl border-2">
                                                        <Input placeholder="B.Tech/M.Tech" values={values.stream} onChange={handleChange} onBlur={handleBlur} 
                                                        name="stream" id="stream" className="!border border-gray-600" />
                                                    </div>
                                                    <p className="aitr_error">{errors.stream}</p>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="topic">Topic</Label>
                                                    <div className="rounded-xl border-2">
                                                        <Input placeholder="Enter Topic" values={values.topic} onChange={handleChange} onBlur={handleBlur} name="topic" id="topic" className="!border border-gray-600" />
                                                    </div>
                                                    <p className="aitr_error">{errors.topic}</p>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="issnNo">ISSN No.</Label>
                                                    <div className="rounded-xl border-2">
                                                        <Input placeholder="Enter ISSN No." values={values.issnNo} onChange={handleChange} onBlur={handleBlur}  name="issnNo" id="issnNo" className="!border border-gray-600" />
                                                    </div>
                                                    <p className="aitr_error">{errors.issnNo}</p>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="linkD">Link</Label>
                                                    <div className="rounded-xl border-2">
                                                        <Input placeholder="Enter Link" values={values.linkD} onChange={handleChange} onBlur={handleBlur} name="linkD" id="linkD" className="!border border-gray-600" />
                                                    </div>
                                                    <p className="aitr_error">{errors.linkD}</p>
                                                </div>
                                            </div>
                                            <Button type="submit" className="w-full">
                                                Submit
                                            </Button>
                                        </form>
                                </DialogContent>
                            </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page