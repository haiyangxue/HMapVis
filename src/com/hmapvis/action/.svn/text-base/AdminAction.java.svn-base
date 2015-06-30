package com.hmapvis.action;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hmapvis.bean.Admin;

@Controller
@Scope("prototype")
public class AdminAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	public String message;
	public int lang;
	public Admin admin;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	
	public String register() {
		adminService.add(admin);
		return "success";
	}
	
	public int getLang() {
		return lang;
	}
	public void setLang(int lang) {
		this.lang = lang;
	}
	public String login(String name,String pass) {
		Admin admin=adminService.findByFeild("admin_name", name);
		if(admin.getAdmin_pass()==pass){
			message = "login_success";
		}else{
			message = "login_fail";
		}
		return "login_success";
	}
	
	public String changelanguage(){
		HttpServletRequest request=ServletActionContext.getRequest();
		HttpSession session =request.getSession();
		if((Integer)session.getAttribute("language") == null || (Integer)session.getAttribute("language") == 0)
			session.setAttribute("language", 1);
		else
			session.setAttribute("language", 0);
		
		return "success";	
	}
}
