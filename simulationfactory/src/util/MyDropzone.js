import React, { useCallback }from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx';

export default function MyDropzone() {
    const onDrop = useCallback((importingFile) => {
    importingFile.forEach((fileName) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = (event) => {
        // The event variable above is when you select the file
        // parse file
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, {type:'binary'});
        // get the ith worksheet... in this case the first one. 
        // TODO: Change later for multiple sheets
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        // convert to readable data
        const data = XLSX.utils.sheet_to_csv(worksheet, {header:1});
        // give the data to the console log to read it 
        // TODO: change so that we can put it into the json and import it.
        console.log("File Data: "+data);
        }
        reader.readAsBinaryString(fileName);
    })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>In the future you may drag and drop, instead click to import the file.</p>
    </div>
    )
}