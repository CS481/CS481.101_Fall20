import React, { useCallback }from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

export default function FrameDropzone(props) {
    const onDrop = useCallback((importingFile) => {
        props.frame.effects = [];
        // TODO: This is only going to work with one file
        importingFile.forEach((fileName) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = (event) => {
                // The event variable above is when you select the file
                // parse file
                const binaryString = event.target.result;
                const workbook = XLSX.read(binaryString, {type:'binary'});
                // get the ith worksheet... in this case the first one. 
                // TODO: Change later for multiple sheets
                workbook.SheetNames.forEach((sheetName) => {
                    const worksheet = workbook.Sheets[sheetName];
                    
                    const data = XLSX.utils.sheet_to_json(worksheet, { header:1, blankrows:false });

                    props.frame.effects.push({
                        effects: data,
                        operation: "*", // Unimplemented
                        resource: sheetName
                    });
                    // convert to readable data
                    // give the data to the console log to read it
                    console.log("File Data for workesheet " + sheetName + ": " + JSON.stringify(data));
                });
                props.commit(props.frame);
            }
            reader.readAsBinaryString(fileName);
        });
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>You may drag and drop a file here, or instead click to import the file.</p>
    </div>
    )
}