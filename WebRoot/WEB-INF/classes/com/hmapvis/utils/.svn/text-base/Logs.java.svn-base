package com.hmapvis.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;


public class Logs {
	private static final File dir=new File("..\\webapps\\sswy\\WEB-INF\\logs");
	private static final Format format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final Format df=new SimpleDateFormat("yyyy-MM-dd");
	
	static{
		if (!dir.exists()){
			dir.mkdirs();
		}
	}
	/**写系统日志
	 * @param str
	 */
	
	public static void WriteLog(String str){
		Date date=new Date();
		File file=new File(dir,df.format(date));
		String sw=format.format(date)+":\t"+str+"\n";
		synchronized (Logs.class) {
			try {
				FileWriter fw=new FileWriter(file,true);
				PrintWriter pw=new PrintWriter(fw);
				pw.println(sw);
				pw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}