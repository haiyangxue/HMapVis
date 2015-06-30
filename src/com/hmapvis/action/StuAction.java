package com.hmapvis.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hmapvis.bean.User;

/**
 * student login action
 * @author Huayong
 *
 */
@Controller
@Scope("prototype")
public class StuAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public String message;
	public String stuid;
	public String pwd;
	public String stuname;

	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStuid() {
		return stuid;
	}

	public void setStuid(String stuid) {
		this.stuid = stuid;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getStuname() {
		return stuname;
	}

	public void setStuname(String stuname) {
		this.stuname = stuname;
	}

	//用户登录
	public String login() {	
		try {
			String login_fail = "你输入了错误的学号或密码，不能登录！";
			String login_success = "登录成功!";
			HttpClient client = new HttpClient(); 
			// 使用 GET 方法 ，如果服务器需要通过 HTTPS 连接，那只需要将下面 URL 中的 http 换成 https 
			HttpMethod method=new GetMethod("http://jwxt.sdu.edu.cn:7890/pls/wwwbks/bks_login2.login?stuid="+stuid+"&pwd="+pwd); 
			//使用POST方法 
			//HttpMethod method = new PostMethod("http://java.sun.com"); 
			client.executeMethod(method); 

			int statusCode = method.getStatusLine().getStatusCode();
			if(statusCode == 200 ){
				String returnStr = method.getResponseBodyAsString();
				if(returnStr.indexOf(login_fail) >= 0){
					message = "fail";
					return "fail";
				}else if(returnStr.indexOf(login_success) >= 0){
					int index1 = returnStr.indexOf("专业")+3;
					int index2 = returnStr.indexOf("(");
					stuname = returnStr.substring(index1,index2);
				}
			}else{
				message = "fail";
				return "fail";
			}
			//打印服务器返回的状态 
			//System.out.println(method.getStatusLine().getStatusCode()); 
			//打印返回的信息 
			//System.out.println(method.getResponseBodyAsString()); 
			//释放连接 
			method.releaseConnection(); 
			
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session =request.getSession();
			session.setAttribute("stuname", stuname);
			session.setAttribute("stuid", stuid);
		} catch (Exception e) {
			e.printStackTrace();
			message = "fail";
			return "fail";
		}
		return "success";	
	}

}
