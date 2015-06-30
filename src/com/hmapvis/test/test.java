package com.hmapvis.test;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;

import com.hmapvis.utils.HQLHelper;



public class test {

	public static void main(String[] args) throws ClassNotFoundException, SQLException, HttpException, IOException {
		
		/*
		 Class.forName("org.postgresql.Driver");  
	     String url = "jdbc:postgresql://211.87.224.138:5432/AIDA";  
	     Connection conn = DriverManager.getConnection(url, "aidauser", "123456");  
	     
	     Statement st = conn.createStatement();  
         String sql = "SELECT * FROM entity_ids where id=4923321;";  
         ResultSet rs = st.executeQuery(sql);  
         rs.next();
         String name1 = rs.getString("entity");         
         System.out.println(name1);
         */
	     //PGpoint circle = new PGpoint("5.4,5.6");  
	     //PreparedStatement ps = conn.prepareStatement("INSERT INTO test(point) VALUES (?)");  
	     //ps.setObject(1, circle);  
	     //ps.executeUpdate();  
	     //ps.close();  
		/*
		Calendar calendar = new GregorianCalendar();
		calendar.set(2,0,1);
		 // 公元前还是公元后  
        System.out.println("ERA: "+calendar.get(Calendar.ERA));  
        //指那一年  
        System.out.println("YEAR: "+calendar.get(Calendar.YEAR)); 
        System.out.println(calendar.getTimeInMillis());
        
        
        Date date = new Date(-62198915740218L);
        System.out.println(date);
        Date date2 = new Date(-62104221289847L);
        System.out.println(date2);
        // 创建一个日期格式表达式   
        String pattern = "年代:GGGGG;年份:y;月份:M;日:d;时(1~12):h;时(0~23):H;分:m;秒:s;毫秒:S;星期:E;上/下午:a;时区:z";   
        // 使用日期格式表达式创建一个SimpleDateFormat对象   
        SimpleDateFormat df = new SimpleDateFormat(pattern);   
        // 调用SimpleDateFormat类的format(Date date)方法对Date对象进行格式化，并返回格式化后的字符串。   
        // 该方法继承自java.text.DateFormat类   
        System.out.println(df.format(date));   
        System.out.println(df.format(date2)); 
        */
//         Timestamp dd = new Timestamp(-62198915740218L);
//         System.out.println(dd);
//         String str1 = "-2224/00/00";
//         int i = str1.charAt(0);
//         System.out.println(i);
		
//		String login_fail = "你输入了错误的学号或密码，不能登录！";
//		String login_success = "登录成功!";
//		String user_name = ""; //正确登录后得到
//		String stuid = "201200301046";
//		String pwd = "371102";
//		
//		HttpClient client = new HttpClient(); 
//		// 设置代理服务器地址和端口      
//
//		//client.getHostConfiguration().setProxy("proxy_host_addr",proxy_port); 
//		// 使用 GET 方法 ，如果服务器需要通过 HTTPS 连接，那只需要将下面 URL 中的 http 换成 https 
//		HttpMethod method=new GetMethod("http://jwxt.sdu.edu.cn:7890/pls/wwwbks/bks_login2.login?stuid="+stuid+"&pwd="+pwd); 
//		//使用POST方法 
//		//HttpMethod method = new PostMethod("http://java.sun.com"); 
//		client.executeMethod(method); 
//
//		int statusCode = method.getStatusLine().getStatusCode();
//		if(statusCode == 200 ){
//			System.out.println("访问服务器成功");
//			String returnStr = method.getResponseBodyAsString();
//			if(returnStr.indexOf(login_fail) >= 0)
//				System.out.println(login_fail);
//			else if(returnStr.indexOf(login_success) >= 0){
//				System.out.println(login_success);
//				int index1 = returnStr.indexOf("专业")+3;
//				int index2 = returnStr.indexOf("(");
//				user_name = returnStr.substring(index1,index2);
//				System.out.println(user_name);
//			}
//				
//		}else{
//			System.out.println("访问服务器成失败");
//		}
		//打印服务器返回的状态 
		//System.out.println(method.getStatusLine().getStatusCode()); 
		//打印返回的信息 
		//System.out.println(method.getResponseBodyAsString()); 
		//释放连接 
//		method.releaseConnection();
		List<String> wheres = new ArrayList<String>();
		wheres.add("event_id");
		wheres.add("event_name");
		
		String hql = new HQLHelper().getHql("event".getClass(), wheres, null, true);
		
		System.out.println(hql);
	}

}
