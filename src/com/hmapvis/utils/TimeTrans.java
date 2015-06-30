package com.hmapvis.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class TimeTrans {
	
	public static long transDateToMillis(String date){
		 Calendar calendar = new GregorianCalendar();
		 int index = date.lastIndexOf("-");
		 int year = Integer.parseInt(date.substring(0, index-3));
         int month = Integer.parseInt(date.substring(index-2, index));
         int day = Integer.parseInt(date.substring(index+1,index+3));
         
         //对事件时间
         int index2 = date.indexOf(":");
         int hour = 0;
         int minute = 0;
         int second = 0;
         if(index2 != -1){
        	 hour = Integer.parseInt(date.substring(index2-2, index2));
        	 minute = Integer.parseInt(date.substring(index2+1));
        	 second=0;
         }
        
         if(year>0){
        	calendar.set(year,month-1,day,hour,minute,second);
         }else{
        	calendar.set(year+1,month-1,day,hour,minute,second);
         }
		
		return calendar.getTimeInMillis();
	}
	/**
	 * 
	 * @param timeinmillis
	 * @return
	 */
	public static String transMillisToDate(long timeinmillis){
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTimeInMillis(timeinmillis);
         DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
         String returnString = "";
         String year = formatter.format(calendar.getTime()).substring(0,4);
         String other = formatter.format(calendar.getTime()).substring(4);
         int su = Integer.parseInt(year);
         
         if(calendar.get(Calendar.ERA) == 0){
        	 returnString += "-";
        	 su = su-1;
         }
         
		return returnString +su + other;
	}
	
	public static void main(String[] args) {
		DateFormat formatter = new SimpleDateFormat("G yyyy-MM-dd hh:mm:ss");
		Calendar calendar = new GregorianCalendar();
		calendar.set(-5701,0,1,0,0,0);
//		calendar = new GregorianCalendar();
//		calendar.set(-2900,0,1,0,0,0);
//		calendar = new GregorianCalendar();
//		calendar.set(-2800,0,1,0,0,0);
		
		//Calendar calendar = transDateToMillis("2011-11-22");
		
		calendar.setTimeInMillis(-242016810535916L);
        //calendar.setTimeInMillis(-242016810535916L);
	}
	
}
