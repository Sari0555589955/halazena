// here i'm gonna create report of the inventory reports 
// first lets get array of object in the .json file

import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'
import { AuthenticatedRequest } from '../middleWares/authentication.middleWare'
import Inventory from '../model/inventory.model'
import { Response } from 'express';
import upload from '../helper/upload.helper'

// get all The history of the order records
// route : get /unStore/api/v1/inventory/getHistory/:invId

// function to convert from json to .xlsx

const convertFromJSONToXLSX = (json: Array<Object> | any) => {
    const date = new Date();
    // i need a way of checking how many files are there 

    // create work sheet
    const workSheet = xlsx.utils.json_to_sheet(json)
    // create work book
    const workBook = xlsx.utils.book_new()
    // not lets combine both
    xlsx.utils.book_append_sheet(workBook, workSheet, 'reports')
    // now lets creating the buffer
    xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    // now lets creating binary string 
    xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' })
    // now lets download that file 
    xlsx.writeFile(workBook, `./uploads/${date.getSeconds()}_reports.xlsx`)


}
export const getHistoryInv = async (req: AuthenticatedRequest, res: Response) => {
    const inv = await Inventory.findById(req.params.invId)
    const records: Array<Object> | any = inv?.reports;
    // store it in file
    const filePath = path.join(__dirname, '../../inv.json')
    fs.writeFileSync(filePath, JSON.stringify(records))
    convertFromJSONToXLSX(records)
}


//DESC: get the most selling products
// Route: /GET /unStore/api/v1/inventory/mostSelling
