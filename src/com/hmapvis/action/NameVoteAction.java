package com.hmapvis.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hmapvis.bean.NameVote;
import com.hmapvis.bean.VoteRecord;

@Controller
@Scope("prototype")
public class NameVoteAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	public NameVote namevote;
	public int namevote_id;
	public String message;
	public String new_name;
	
	public String getNew_name() {
		return new_name;
	}

	public void setNew_name(String new_name) {
		this.new_name = new_name;
	}

	public NameVote getNamevote() {
		return namevote;
	}

	public void setNamevote(NameVote namevote) {
		this.namevote = namevote;
	}

	public int getNamevote_id() {
		return namevote_id;
	}

	public void setNamevote_id(int namevote_id) {
		this.namevote_id = namevote_id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
/*
	public String getVote(){
		NameVote namevote2 = nameVoteService.findByFeild("new_name", namevote.getNew_name());
		if(namevote2 != null){
			ActionContext.getContext().put("vote", namevote2.getVote());
			message = "success";
		}else{
			message = "fail";
		}
		return "";
	}
	*/
	
	public String addNewName(){
		try{
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String stuname =(String)session.getAttribute("stuname");
			String stuid =(String)session.getAttribute("stuid");
			namevote.setVote(0);
			namevote.setStuname(stuname);
			namevote.setStuid(stuid);
			
			//if(nameVoteService.datasExistsByInt("user_id", user_id, "building_id", namevote.getBuilding_id())){
			NameVote namevote2 = nameVoteService.findOneByTwoFeild("building_id", namevote.getBuilding_id(),"new_name", namevote.getNew_name());

			List<NameVote> userNames = nameVoteService.findByTwoFeild("building_id", namevote.getBuilding_id(), "stuid", stuid);
			
			if(namevote2 != null){
				message = "exist";
			}else if(userNames.size() > 5){
				message = "overflow";
			}else{
				nameVoteService.add(namevote);
				message = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	/**
	 * vote
	 * @return
	 */
	public String addVote(){
		try{
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String stuid =(String)session.getAttribute("stuid");
			
			//对这个名称进行投片
			NameVote nv = nameVoteService.findById(namevote_id);
			int building_id = nv.getBuilding_id();
			
			VoteRecord voterecord = new VoteRecord();
			if(voterecordService.datasExists("stuid", stuid, "building_id", building_id)){
				message = "voted";
			}else{
				voterecord.setNamevote_id(namevote_id);
				voterecord.setStuid(stuid);
				voterecord.setBuilding_id(building_id);
				voterecordService.add(voterecord);
				message = "success";
				
				nv.setVote(nv.getVote() + 1);
				nameVoteService.update(nv);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
}
