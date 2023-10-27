import React from "react";

export const DateFormatter=(timestamp: number): string=>{
    const date = new Date(timestamp)
    const year = date.getFullYear() //me ddevuelce el año YYY 
    const month=('0'+ (date.getMonth() + 1)).slice(-2);    //MM
    const day=('0'+ (date.getDate())).slice(-2);    //MM
    const hours=('0'+ (date.getHours())).slice(-2);    //MM
    const minutes=('0'+ (date.getMinutes())).slice(-2);    //MM

    return day + '/' + month + '/' + year + '  ' + hours + ':' + minutes;
}