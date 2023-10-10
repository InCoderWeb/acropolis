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

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"  

import { useFormik } from "formik"
import * as Y from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
  
const initialValues = {
    nameOfFaculty: "",
    stream: "",
    topic: "",
    rEvent: "",
    issnNo: "",
    linkD: "",
}

const newDataSchema = Y.object({
    nameOfFaculty: Y.string().min(2).max(50).required("Please select the name of faculty."),
    stream: Y.string().min(2).max(50).required("Please select stream."),
    topic: Y.string().min(2).max(50).required("Please enter topic."),
    rEvent: Y.string().min(2).max(50).required("Please select event."),
    issnNo: Y.number("You cannot enter text, please provide a valid ISSN no.").required("Please enter ISSN number."),
    linkD: Y.string().required("Please enter link."),
})

function search(source, name) {
    var results;

    name = name.toUpperCase();
    results = source.filter(function(entry) {
        return entry.nameOfFaculty.toUpperCase().indexOf(name) !== -1;
    });
    return results;
}

const Page = () => {
    const [facultyData, setFacultyData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [paperPublicationsData, setPaperPublicationsData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const fcaData = facultyData.filter((d) => {
        return d.faculty.department == "fca"
    })

    const csData = facultyData.filter((d) => {
        return d.faculty.department == "cs"
    })

    const itData = facultyData.filter((d) => {
        return d.faculty.department == "it"
    })

    const options = [
        { value: 'journal', label: 'Journal' },
        { value: 'conference', label: 'Conference' },
        { value: 'seminar', label: 'Seminar' },
        { value: 'work shop', label: 'Work Shop' },
        { value: 'certification', label: 'Certification' },
        { value: 'book published', label: 'Book Published' },
    ]

    useEffect(() => {
        axios.get('/api/faculties').then(function (response) {
            setFacultyData(response.data.facultyData);
        }).catch(function (error) {
            console.log(error);
        });

        axios.get('/api/paperpublications').then(function (response) {
            console.log(response.data.paperPublicationsData);
            setPaperPublicationsData(response.data.paperPublicationsData);
            setFilteredData(response.data.paperPublicationsData);
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
                window.location.reload();
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

            <div className="bg-white/50 backdrop-blur-[3px] overflow-auto rounded-lg w-[95vw] mt-6 md:mt-3 h-[80vh]">
                <div className="toolbar flex flex-col sm:flex-row justify-between mx-4 h-[4rem] items-center">
                    <div className="left w-full sm:w-auto mt-2 sm:mt-0">
                        <Input placeholder="Search here..." className="w-full" value={searchData} onChange={(e) => {
                            setSearchData(e.target.value)
                        }} 
                        onKeyUp={(e) => {
                            const res = paperPublicationsData.filter(function(entry) {
                                return entry.nameOfFaculty.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1;
                            });
                            console.log(res);
                            setFilteredData(res)
                        }}/>
                    </div>
                    <div className="right w-full sm:w-auto my-2 sm:my-0">
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
                                                    <Select value={values.stream} onValueChange={selectedOption => {
                                                        let event = {target: {name: 'stream', value: selectedOption}}
                                                        handleChange(event)
                                                    }}
                                                    onBlur={() => {
                                                        handleBlur({target: {name: 'stream'}});
                                                    }} name='stream'>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Faculty Stream" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Stream</SelectLabel>
                                                                <SelectItem value="fca">FCA</SelectItem>
                                                                <SelectItem value="cs">CS</SelectItem>
                                                                <SelectItem value="it">IT</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
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
                                                <Label htmlFor="rEvent">Research Event</Label>
                                                <div className="rounded-xl border-2">
                                                    <Select id="rEvent" value={values.rEvent} onValueChange={selectedOption => {
                                                        let event = {target: {name: 'rEvent', value: selectedOption}}
                                                        handleChange(event)
                                                    }}
                                                    onBlur={() => {
                                                        handleBlur({target: {name: 'rEvent'}});
                                                    }} name='rEvent'>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Research Event" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    options.map((data, i) => {
                                                                        return (
                                                                            <SelectItem key={i} value={data.value}>{data.label}</SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <p className="aitr_error">{errors.rEvent}</p>
                                            </div>

                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="issnNo">ISSN No.</Label>
                                                <div className="rounded-xl border-2">
                                                    <Input placeholder="Enter ISSN No." type="number" values={values.issnNo} onChange={handleChange} onBlur={handleBlur}  name="issnNo" id="issnNo" className="!border border-gray-600" />
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

                <Table className="overflow-auto max-h-[80vh]">
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Stream</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Research Event</TableHead>
                            <TableHead>ISSN No.</TableHead>
                            <TableHead>Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {
                                filteredData.length ? (
                                    filteredData.map((paperD, i) => {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{paperD.nameOfFaculty}</TableCell>
                                                    <TableCell className="uppercase">{paperD.stream}</TableCell>
                                                    <TableCell>{paperD.topic}</TableCell>
                                                    <TableCell className="capitalize">{paperD.researchEvent}</TableCell>
                                                    <TableCell>{paperD.issnNo}</TableCell>
                                                    <TableCell>{paperD.linkD}</TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                            <TableCell>loading...</TableCell>
                                        </TableRow>
                                    </>
                                )
                            }
                    </TableBody>
                </Table>

            </div>
        </div>
    </>
  )
}

export default Page