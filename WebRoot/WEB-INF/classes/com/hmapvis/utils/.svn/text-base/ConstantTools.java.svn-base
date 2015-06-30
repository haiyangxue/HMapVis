package com.hmapvis.utils;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ConstantTools {
	//获取当前系统时间，yyyy-MM-dd
	 public static String getCurrentTime(){
			Date date = new Date();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time = formatter.format(date);
			time = time.substring(0, 10);
			return time;
	 }
	 //检验是否是jpg的图片
	 public static boolean validateImageType(String name) {
			String fileExt = name.substring(name.lastIndexOf(".") + 1);
			if (fileExt.equalsIgnoreCase("jpg")) {
				return true;
			}
			return false;
	 }
	 //保存图片
	 public static void saveImage(File imageFile,String imagePath){
			File newImage = new File(imagePath);
			if(newImage.exists()){
				newImage.delete();
			}
			imageFile.renameTo(new File(imagePath));
	}
	 
}
